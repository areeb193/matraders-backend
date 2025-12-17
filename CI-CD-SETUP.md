# 🚀 CI/CD Pipeline Setup Guide

## MA Traders System - GitHub Actions + Kubernetes Deployment

This guide explains how to set up and use the CI/CD pipeline for automated build, test, and deployment.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [GitHub Secrets Setup](#github-secrets-setup)
4. [Pipeline Stages](#pipeline-stages)
5. [Kubernetes Setup](#kubernetes-setup)
6. [Deployment Process](#deployment-process)
7. [Monitoring & Troubleshooting](#monitoring--troubleshooting)

---

## 🎯 Overview

The CI/CD pipeline automates:
- ✅ **Build** - Compiles Next.js application
- ✅ **Test** - Runs automated tests with MongoDB
- ✅ **Docker Build** - Creates and pushes Docker images
- ✅ **Deploy** - Deploys to Kubernetes cluster

### Pipeline Triggers
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

---

## ✅ Prerequisites

### 1. GitHub Repository
- Repository with your code
- Admin access to repository settings

### 2. Docker Hub Account
- Docker Hub username
- Docker Hub password or access token

### 3. Kubernetes Cluster
- Running Kubernetes cluster (GKE, EKS, AKS, or local)
- `kubectl` configured with cluster access
- Kubeconfig file

### 4. Required Tools (for local testing)
```bash
# Docker
docker --version

# kubectl
kubectl version --client

# Node.js
node --version
```

---

## 🔐 GitHub Secrets Setup

Navigate to your GitHub repository: **Settings → Secrets and variables → Actions → New repository secret**

### Required Secrets:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `DOCKER_USERNAME` | Your Docker Hub username | `yourusername` |
| `DOCKER_PASSWORD` | Your Docker Hub password/token | `dckr_pat_xxxxx` |
| `KUBE_CONFIG` | Base64 encoded kubeconfig file | See below |

### How to Create KUBE_CONFIG Secret

```bash
# Option 1: Encode your entire kubeconfig
cat ~/.kube/config | base64 -w 0

# Option 2: Create service account (recommended for production)
kubectl create serviceaccount github-actions -n matraders
kubectl create clusterrolebinding github-actions \
  --clusterrole=cluster-admin \
  --serviceaccount=matraders:github-actions

# Get the token
kubectl create token github-actions -n matraders --duration=87600h

# Create kubeconfig and encode
# Then copy the base64 output and add as KUBE_CONFIG secret
```

---

## 🔄 Pipeline Stages

### Stage 1: Build and Test (8-10 minutes)

```yaml
Jobs:
- Checkout code
- Setup Node.js 18
- Install dependencies
- Build Next.js application
- Run automated tests
- Upload build artifacts
```

**Triggers on:** All pushes and pull requests

**Services Used:**
- MongoDB 7.0 (for testing)

### Stage 2: Docker Build & Push (5-7 minutes)

```yaml
Jobs:
- Login to Docker Hub
- Build frontend Docker image
- Build backend Docker image
- Push images to Docker Hub
- Tag with commit SHA and 'latest'
```

**Triggers on:** Push to main/master only

**Images Created:**
- `yourusername/matraders-frontend:latest`
- `yourusername/matraders-frontend:commit-sha`
- `yourusername/matraders-backend:latest`
- `yourusername/matraders-backend:commit-sha`

### Stage 3: Kubernetes Deployment (3-5 minutes)

```yaml
Jobs:
- Configure kubectl
- Create namespace 'matraders'
- Deploy MongoDB (PVC + Deployment + Service)
- Deploy Backend (Deployment + Service)
- Deploy Frontend (Deployment + LoadBalancer)
- Verify deployment
```

**Triggers on:** Push to main/master only (after successful Docker build)

**Kubernetes Resources:**
- Namespace: `matraders`
- 3 Deployments (MongoDB, Backend, Frontend)
- 3 Services
- 1 ConfigMap
- 1 PersistentVolumeClaim

### Stage 4: Notification

```yaml
Jobs:
- Send success/failure notification
- Display deployment status
```

---

## ☸️ Kubernetes Setup

### Architecture

```
┌─────────────────────────────────────────────────┐
│              Kubernetes Cluster                 │
│                                                  │
│  ┌──────────────────────────────────────────┐  │
│  │         Namespace: matraders             │  │
│  │                                           │  │
│  │  ┌─────────────┐  ┌──────────────┐      │  │
│  │  │  Frontend   │  │   Backend    │      │  │
│  │  │  (2 pods)   │  │   (2 pods)   │      │  │
│  │  │  Port 3000  │  │   Port 3000  │      │  │
│  │  └──────┬──────┘  └──────┬───────┘      │  │
│  │         │                 │              │  │
│  │    LoadBalancer      ClusterIP           │  │
│  │         │                 │              │  │
│  │         └─────────┬───────┘              │  │
│  │                   │                      │  │
│  │            ┌──────┴────────┐            │  │
│  │            │   MongoDB     │            │  │
│  │            │   (1 pod)     │            │  │
│  │            │   Port 27017  │            │  │
│  │            │   + PVC 10GB  │            │  │
│  │            └───────────────┘            │  │
│  │                                           │  │
│  └──────────────────────────────────────────┘  │
│                                                  │
└─────────────────────────────────────────────────┘
```

### Resources Created

#### 1. ConfigMap (`configmap.yml`)
- Environment variables for all services
- MongoDB connection strings
- Application configuration

#### 2. MongoDB
- **Deployment:** 1 replica
- **Storage:** 10GB PersistentVolume
- **Service:** ClusterIP on port 27017
- **Health Checks:** Liveness & Readiness probes

#### 3. Backend
- **Deployment:** 2 replicas
- **Service:** ClusterIP on port 3000
- **Resources:** 256Mi-512Mi RAM, 250m-500m CPU
- **Strategy:** Rolling update

#### 4. Frontend
- **Deployment:** 2 replicas
- **Service:** LoadBalancer on port 80 → 3000
- **Resources:** 256Mi-512Mi RAM, 250m-500m CPU
- **Strategy:** Rolling update

---

## 🚀 Deployment Process

### Automatic Deployment

1. **Push code to main branch:**
```bash
git add .
git commit -m "Your changes"
git push origin main
```

2. **Watch the pipeline:**
- Go to GitHub → Actions tab
- Click on the running workflow
- Monitor each job's progress

3. **Check deployment status:**
```bash
# View pods
kubectl get pods -n matraders

# View services
kubectl get services -n matraders

# Get external IP (for frontend)
kubectl get service matraders-frontend -n matraders
```

### Manual Deployment (Local Testing)

```bash
# Apply Kubernetes manifests manually
kubectl apply -f k8s/configmap.yml
kubectl apply -f k8s/mongodb-deployment.yml
kubectl apply -f k8s/mongodb-service.yml
kubectl apply -f k8s/deployment-backend.yml
kubectl apply -f k8s/service-backend.yml
kubectl apply -f k8s/deployment-frontend.yml
kubectl apply -f k8s/service-frontend.yml

# Verify deployment
kubectl get all -n matraders
```

---

## 🔍 Monitoring & Troubleshooting

### Check Deployment Status

```bash
# Get all resources
kubectl get all -n matraders

# Check pod status
kubectl get pods -n matraders -w

# Check pod logs
kubectl logs -f deployment/matraders-frontend -n matraders
kubectl logs -f deployment/matraders-backend -n matraders
kubectl logs -f deployment/mongodb -n matraders

# Describe deployment (detailed info)
kubectl describe deployment matraders-frontend -n matraders

# Check events
kubectl get events -n matraders --sort-by='.lastTimestamp'
```

### Common Issues & Solutions

#### Issue 1: Pods Not Starting

**Symptom:** Pods stuck in `Pending` or `CrashLoopBackOff`

**Solutions:**
```bash
# Check pod details
kubectl describe pod <pod-name> -n matraders

# Check logs
kubectl logs <pod-name> -n matraders

# Common causes:
# - Image pull errors → Check Docker Hub credentials
# - Resource limits → Adjust in deployment.yml
# - ConfigMap missing → Apply configmap.yml first
```

#### Issue 2: MongoDB Connection Failed

**Symptom:** Backend/Frontend can't connect to MongoDB

**Solutions:**
```bash
# Verify MongoDB is running
kubectl get pods -l app=mongodb -n matraders

# Check MongoDB service
kubectl get service mongodb -n matraders

# Test MongoDB connection from a pod
kubectl run -it --rm debug --image=mongo:7.0 --restart=Never -n matraders -- \
  mongosh mongodb://admin:secretpassword123@mongodb:27017/matraders?authSource=admin
```

#### Issue 3: Image Pull Errors

**Symptom:** `ImagePullBackOff` or `ErrImagePull`

**Solutions:**
```bash
# Verify secret exists
kubectl get secret dockerhub-secret -n matraders

# Recreate secret
kubectl delete secret dockerhub-secret -n matraders
kubectl create secret docker-registry dockerhub-secret \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=YOUR_USERNAME \
  --docker-password=YOUR_PASSWORD \
  -n matraders

# Verify image exists on Docker Hub
docker pull yourusername/matraders-frontend:latest
```

#### Issue 4: LoadBalancer Pending

**Symptom:** Frontend service stuck in `<pending>` for EXTERNAL-IP

**Solutions:**
```bash
# For local clusters (minikube, kind), use NodePort instead
kubectl patch service matraders-frontend -n matraders -p '{"spec":{"type":"NodePort"}}'

# For cloud providers, wait 2-3 minutes for IP allocation

# Check service status
kubectl describe service matraders-frontend -n matraders
```

### Access Application

```bash
# Get frontend URL
kubectl get service matraders-frontend -n matraders

# If LoadBalancer:
# Access via EXTERNAL-IP:80

# If NodePort (local):
minikube service matraders-frontend -n matraders
# OR
kubectl port-forward service/matraders-frontend 3000:80 -n matraders
# Then access: http://localhost:3000
```

---

## 📊 Pipeline Workflow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   GitHub Actions                         │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │   Job 1: Build & Test         │
        │   - Checkout code             │
        │   - Setup Node.js             │
        │   - Install dependencies      │
        │   - Build application         │
        │   - Run tests                 │
        └───────────┬───────────────────┘
                    │ (on success)
                    ▼
        ┌───────────────────────────────┐
        │   Job 2: Docker Build & Push  │
        │   - Login to Docker Hub       │
        │   - Build frontend image      │
        │   - Build backend image       │
        │   - Push to registry          │
        └───────────┬───────────────────┘
                    │ (on success)
                    ▼
        ┌───────────────────────────────┐
        │   Job 3: Deploy to K8s        │
        │   - Configure kubectl         │
        │   - Deploy MongoDB            │
        │   - Deploy Backend            │
        │   - Deploy Frontend           │
        │   - Verify deployment         │
        └───────────┬───────────────────┘
                    │
                    ▼
        ┌───────────────────────────────┐
        │   Job 4: Notification         │
        │   - Send status notification  │
        └───────────────────────────────┘
```

---

## 🔒 Security Best Practices

1. **Secrets Management**
   - Never commit secrets to Git
   - Use GitHub Secrets for sensitive data
   - Rotate credentials regularly

2. **Image Security**
   - Use official base images
   - Scan images for vulnerabilities
   - Keep dependencies updated

3. **Kubernetes Security**
   - Use RBAC for access control
   - Limit resource usage
   - Enable network policies
   - Use secrets for sensitive config

4. **MongoDB Security**
   - Use strong passwords
   - Enable authentication
   - Limit network exposure
   - Regular backups

---

## 📈 Scaling

### Scale Deployments

```bash
# Scale frontend
kubectl scale deployment matraders-frontend --replicas=3 -n matraders

# Scale backend
kubectl scale deployment matraders-backend --replicas=3 -n matraders

# Auto-scaling (HPA)
kubectl autoscale deployment matraders-frontend \
  --cpu-percent=70 --min=2 --max=10 -n matraders
```

---

## 🧹 Cleanup

```bash
# Delete all resources
kubectl delete namespace matraders

# Or delete specific resources
kubectl delete -f k8s/ -n matraders

# Delete Docker images from local
docker rmi yourusername/matraders-frontend:latest
docker rmi yourusername/matraders-backend:latest
```

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## ✅ Checklist for First Deployment

- [ ] GitHub repository set up
- [ ] Docker Hub account created
- [ ] Kubernetes cluster running
- [ ] GitHub Secrets configured (`DOCKER_USERNAME`, `DOCKER_PASSWORD`, `KUBE_CONFIG`)
- [ ] Kubeconfig tested locally
- [ ] All files committed to repository
- [ ] Code pushed to main branch
- [ ] GitHub Actions workflow triggered
- [ ] Deployment verified in Kubernetes
- [ ] Application accessible via LoadBalancer IP

---

**Last Updated:** December 17, 2025  
**Version:** 1.0  
**Project:** MA Traders System CI/CD

---

**🎉 Your CI/CD pipeline is ready for production!**

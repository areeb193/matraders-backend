# 🚀 CI/CD Pipeline - Quick Reference

## Files Created

```
.github/
└── workflows/
    └── ci-cd.yml                 # GitHub Actions pipeline

k8s/
├── configmap.yml                 # Environment variables
├── mongodb-deployment.yml        # MongoDB deployment + PVC
├── mongodb-service.yml           # MongoDB service
├── deployment-backend.yml        # Backend deployment
├── deployment-frontend.yml       # Frontend deployment
├── service-backend.yml           # Backend service (ClusterIP)
└── service-frontend.yml          # Frontend service (LoadBalancer)

CI-CD-SETUP.md                    # Complete setup guide
```

---

## ⚡ Quick Setup (3 Steps)

### 1. Configure GitHub Secrets

Go to: **GitHub Repository → Settings → Secrets → Actions**

Add these secrets:
```
DOCKER_USERNAME     = your-dockerhub-username
DOCKER_PASSWORD     = your-dockerhub-password-or-token
KUBE_CONFIG         = base64-encoded-kubeconfig
```

**Get base64 kubeconfig:**
```bash
cat ~/.kube/config | base64 -w 0
```

### 2. Push to GitHub

```bash
git add .
git commit -m "Add CI/CD pipeline"
git push origin main
```

### 3. Monitor Deployment

```bash
# Watch GitHub Actions
# https://github.com/YOUR_USERNAME/YOUR_REPO/actions

# Check Kubernetes
kubectl get all -n matraders
```

---

## 🔄 Pipeline Flow

```
Push Code → Build & Test → Docker Build → K8s Deploy → Notify
  (2-3min)     (8-10min)      (5-7min)      (3-5min)    (1min)
                                                          
Total Time: ~20-30 minutes for first deployment
```

---

## 📋 Essential Commands

### GitHub Actions
```bash
# View workflow runs
gh run list

# View specific run
gh run view <run-id>

# Re-run failed jobs
gh run rerun <run-id>
```

### Docker Hub
```bash
# View your images
docker search yourusername/matraders

# Pull and test locally
docker pull yourusername/matraders-frontend:latest
docker run -p 3000:3000 yourusername/matraders-frontend:latest
```

### Kubernetes
```bash
# Check deployment status
kubectl get pods -n matraders -w

# View logs
kubectl logs -f deployment/matraders-frontend -n matraders

# Get frontend URL
kubectl get service matraders-frontend -n matraders

# Port forward (for testing)
kubectl port-forward service/matraders-frontend 3000:80 -n matraders

# Restart deployment
kubectl rollout restart deployment/matraders-frontend -n matraders

# View rollout history
kubectl rollout history deployment/matraders-frontend -n matraders

# Rollback deployment
kubectl rollout undo deployment/matraders-frontend -n matraders
```

---

## 🎯 What the Pipeline Does

### On Push to Main:

1. ✅ **Builds** your Next.js application
2. ✅ **Tests** with MongoDB
3. ✅ **Creates** Docker images (frontend & backend)
4. ✅ **Pushes** to Docker Hub with SHA tag + latest
5. ✅ **Deploys** to Kubernetes:
   - MongoDB (1 pod + 10GB storage)
   - Backend (2 pods)
   - Frontend (2 pods)
6. ✅ **Verifies** deployment health
7. ✅ **Notifies** success/failure

### On Pull Request:

1. ✅ **Builds** application
2. ✅ **Tests** code
3. ⏭️ Skips deployment (only builds & tests)

---

## 🔧 Customize Your Pipeline

### Change Replica Count

Edit `k8s/deployment-*.yml`:
```yaml
spec:
  replicas: 3  # Change from 2 to 3
```

### Change Resource Limits

Edit deployment files:
```yaml
resources:
  requests:
    memory: "512Mi"  # Increase from 256Mi
    cpu: "500m"      # Increase from 250m
  limits:
    memory: "1Gi"    # Increase from 512Mi
    cpu: "1000m"     # Increase from 500m
```

### Add Environment Variables

Edit `k8s/configmap.yml`:
```yaml
data:
  YOUR_VAR: "your_value"
```

### Change Service Type

For local development (NodePort instead of LoadBalancer):
```yaml
# In k8s/service-frontend.yml
spec:
  type: NodePort  # Change from LoadBalancer
```

---

## 🚨 Troubleshooting Quick Fixes

### Pipeline Fails at Build
```bash
# Check GitHub Actions logs
# Usually: dependency issues or build errors
# Fix locally first:
npm install
npm run build
```

### Docker Push Fails
```bash
# Verify secrets
# Re-create Docker Hub token
# Update DOCKER_USERNAME and DOCKER_PASSWORD in GitHub Secrets
```

### Kubernetes Deploy Fails
```bash
# Check if kubectl can connect
kubectl cluster-info

# Verify KUBE_CONFIG secret
# Re-encode and update:
cat ~/.kube/config | base64 -w 0

# Check namespace exists
kubectl get namespace matraders
```

### Pods Won't Start
```bash
# Check pod status
kubectl describe pod <pod-name> -n matraders

# Common fixes:
# 1. Image pull error → Check dockerhub-secret
kubectl delete secret dockerhub-secret -n matraders
kubectl create secret docker-registry dockerhub-secret \
  --docker-username=YOUR_USER \
  --docker-password=YOUR_PASS \
  -n matraders

# 2. MongoDB not ready → Wait or check MongoDB pod
kubectl get pods -l app=mongodb -n matraders

# 3. Resource limits → Reduce in deployment files
```

### Can't Access Application
```bash
# Get service info
kubectl get service matraders-frontend -n matraders

# If EXTERNAL-IP is <pending> (local cluster):
kubectl port-forward service/matraders-frontend 3000:80 -n matraders
# Access: http://localhost:3000

# If cloud provider, wait 2-3 minutes for IP allocation
```

---

## 📊 Monitoring

### Check Application Health
```bash
# Pod status
kubectl get pods -n matraders

# CPU & Memory usage
kubectl top pods -n matraders

# Recent events
kubectl get events -n matraders --sort-by='.lastTimestamp' | tail -20

# Application logs (last 100 lines)
kubectl logs --tail=100 -l app=matraders-frontend -n matraders
```

### Check Pipeline Status
```bash
# Latest workflow run
gh run list --limit 1

# Watch live
gh run watch

# View logs
gh run view --log
```

---

## 🎓 Testing Locally Before Push

```bash
# 1. Test build
npm run build

# 2. Test Docker build
docker build -t test-image .

# 3. Test Kubernetes manifests
kubectl apply -f k8s/ --dry-run=client

# 4. Validate YAML syntax
yamllint k8s/*.yml
```

---

## 🔄 Update Deployment

### Method 1: Git Push (Automated)
```bash
# Make changes to code
git add .
git commit -m "Update feature"
git push origin main
# Pipeline automatically builds and deploys
```

### Method 2: Manual Image Update
```bash
# Update image in Kubernetes
kubectl set image deployment/matraders-frontend \
  frontend=yourusername/matraders-frontend:new-tag \
  -n matraders

# Rollout status
kubectl rollout status deployment/matraders-frontend -n matraders
```

### Method 3: Apply Manifest Changes
```bash
# Update k8s files locally
kubectl apply -f k8s/deployment-frontend.yml -n matraders
```

---

## 📈 Scale Your Application

```bash
# Manual scaling
kubectl scale deployment matraders-frontend --replicas=5 -n matraders

# Auto-scaling
kubectl autoscale deployment matraders-frontend \
  --cpu-percent=70 --min=2 --max=10 -n matraders

# Check HPA status
kubectl get hpa -n matraders
```

---

## 🧹 Clean Up

```bash
# Delete everything
kubectl delete namespace matraders

# Or specific resources
kubectl delete -f k8s/ -n matraders

# Delete from Docker Hub (manual via website)
# https://hub.docker.com/
```

---

## ✅ Pre-Deployment Checklist

Before pushing to trigger deployment:

- [ ] GitHub Secrets configured
- [ ] Docker Hub account active
- [ ] Kubernetes cluster running and accessible
- [ ] Code builds successfully locally (`npm run build`)
- [ ] Docker image builds locally (`docker build -t test .`)
- [ ] Kubernetes manifests valid (`kubectl apply --dry-run=client -f k8s/`)
- [ ] All tests pass locally
- [ ] No sensitive data in code

---

## 🎯 Success Indicators

✅ Pipeline succeeded when:
- All GitHub Actions jobs are green
- Docker images pushed to Hub with latest tag
- All pods show `Running` status
- Services have external/cluster IPs assigned
- Health checks passing (readiness + liveness)
- Application accessible via frontend service

---

## 📞 Support Resources

- **CI/CD Setup Guide:** See [CI-CD-SETUP.md](CI-CD-SETUP.md)
- **Docker Deployment:** See [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)
- **GitHub Actions Docs:** https://docs.github.com/actions
- **Kubernetes Docs:** https://kubernetes.io/docs/

---

**Quick Links:**
- GitHub Actions: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`
- Docker Hub: `https://hub.docker.com/u/YOUR_USERNAME`
- Kubernetes Dashboard: `kubectl proxy` → http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/

---

**Version:** 1.0  
**Last Updated:** December 17, 2025  
**Project:** MA Traders System

🚀 **Happy Deploying!**

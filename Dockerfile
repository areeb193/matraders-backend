# ==============================================================================
# DOCKERFILE FOR NEXT.JS FULL-STACK APPLICATION
# ==============================================================================
# This Dockerfile serves both Frontend (UI) and Backend (API Routes)
# Next.js is a full-stack framework where both run in the same process
# ==============================================================================

# Stage 1: Dependencies
# Install only production dependencies for a lighter image
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY package-lock.json* ./

# Install dependencies
RUN npm ci --only=production

# Stage 2: Builder
# Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build time
ENV NEXT_TELEMETRY_DISABLED=1
# Set dummy values for build (will be overridden at runtime)
ENV MONGO_URI=mongodb://localhost:27017/matraders
ENV NEXT_PUBLIC_MONGO_URI=mongodb://localhost:27017/matraders
ENV JWT_SECRET=build-time-placeholder-secret-change-at-runtime
ENV NEXT_PHASE=phase-production-build

# Install all dependencies (including devDependencies for build)
RUN npm install

# Build the Next.js application
# This creates optimized production build for both frontend and backend
RUN npm run build

# Stage 3: Runner
# Production image with minimal footprint
FROM node:18-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copy the standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Create uploads directory for file uploads
RUN mkdir -p ./public/uploads && chown -R nextjs:nodejs ./public/uploads

# Switch to non-root user
USER nextjs

# Expose port 3000 for the application
EXPOSE 3000

# Set environment variables that can be overridden
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the Next.js application
# This serves both frontend pages and API routes
CMD ["node", "server.js"]

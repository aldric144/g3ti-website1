#!/bin/bash
# G3TI Quick Restore Script
# Rebuilds the entire production workspace in under 5 minutes

set -e

echo "=========================================="
echo "G3TI QUICK RESTORE - Starting..."
echo "=========================================="

# Configuration
REPO_URL="https://github.com/aldric144/g3ti-website1.git"
BRANCH="full-system-backup-jan2026"
WORK_DIR="${1:-/home/ubuntu/repos/g3ti-website1}"

# Step 1: Clone repository
echo "[1/5] Cloning repository..."
if [ -d "$WORK_DIR" ]; then
    echo "Directory exists, pulling latest changes..."
    cd "$WORK_DIR"
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH
else
    git clone -b $BRANCH "$REPO_URL" "$WORK_DIR"
    cd "$WORK_DIR"
fi

# Step 2: Install backend dependencies
echo "[2/5] Installing backend dependencies..."
cd "$WORK_DIR/out/backend"
if command -v poetry &> /dev/null; then
    poetry install --no-interaction
else
    echo "Poetry not found, skipping backend dependency installation"
fi

# Step 3: Verify frontend files
echo "[3/5] Verifying frontend files..."
cd "$WORK_DIR/out"
if [ -f "index.html" ]; then
    echo "Frontend files verified: index.html exists"
else
    echo "WARNING: index.html not found!"
fi

# Step 4: Create backups directory
echo "[4/5] Setting up backups directory..."
mkdir -p "$WORK_DIR/backups"

# Step 5: Verify deployment endpoints
echo "[5/5] Verifying deployment endpoints..."
FRONTEND_STATUS=$(curl -sL -o /dev/null -w "%{http_code}" https://global3technology.com/ 2>/dev/null || echo "000")
BACKEND_STATUS=$(curl -sL -o /dev/null -w "%{http_code}" https://app-rkwofgbb.fly.dev/healthz 2>/dev/null || echo "000")

echo ""
echo "=========================================="
echo "G3TI QUICK RESTORE - Complete!"
echo "=========================================="
echo "Repository: $WORK_DIR"
echo "Branch: $BRANCH"
echo "Frontend Status: $FRONTEND_STATUS"
echo "Backend Status: $BACKEND_STATUS"
echo ""
echo "Deployment URLs:"
echo "  Frontend: https://global3technology.com"
echo "  Backend: https://app-rkwofgbb.fly.dev"
echo "=========================================="

#!/bin/bash
# G3TI Daily Backup Script
# Creates daily backups and manages retention

set -e

WORK_DIR="/home/ubuntu/repos/g3ti-website1"
BACKUP_DIR="$WORK_DIR/backups"
DATE=$(date +%Y-%m-%d)
BACKUP_FILE="g3ti_full_backup_$DATE.zip"
RETENTION_DAYS=7

echo "=========================================="
echo "G3TI DAILY BACKUP - $(date)"
echo "=========================================="

# Create backups directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create backup
echo "[1/4] Creating backup archive..."
cd "$WORK_DIR"
zip -r "$BACKUP_DIR/$BACKUP_FILE" . \
    -x ".git/*" \
    -x "backups/*" \
    -x "node_modules/*" \
    -x "__pycache__/*" \
    -x "*.pyc" \
    -x ".env"

# Verify backup integrity
echo "[2/4] Verifying backup integrity..."
unzip -t "$BACKUP_DIR/$BACKUP_FILE" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "Backup verified: $BACKUP_FILE"
else
    echo "ERROR: Backup verification failed!"
    exit 1
fi

# Clean up old backups (keep last 7 days)
echo "[3/4] Cleaning up old backups..."
find "$BACKUP_DIR" -name "g3ti_full_backup_*.zip" -mtime +$RETENTION_DAYS -delete 2>/dev/null || true

# List current backups
echo "[4/4] Current backups:"
ls -lh "$BACKUP_DIR"/*.zip 2>/dev/null || echo "No backups found"

echo ""
echo "=========================================="
echo "G3TI DAILY BACKUP - Complete!"
echo "Backup: $BACKUP_DIR/$BACKUP_FILE"
echo "Size: $(ls -lh "$BACKUP_DIR/$BACKUP_FILE" | awk '{print $5}')"
echo "=========================================="

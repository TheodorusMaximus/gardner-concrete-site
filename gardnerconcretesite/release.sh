#!/bin/bash

# Wix Release Script
# This script ensures clean deployment by properly excluding heavy directories

set -e  # Exit on any error

echo "🚀 Starting Wix Release Process..."

# Step 1: Clean build artifacts
echo "📦 Cleaning build artifacts..."
rm -rf dist .wix .astro .vite

# Step 2: Build the project
echo "🔨 Building project..."
npm run build

# Step 3: Verify .wixignore is present
if [ ! -f ".wixignore" ]; then
    echo "❌ .wixignore file not found!"
    exit 1
fi

echo "✅ .wixignore file found"

# Step 4: Check bundle size before release
echo "📊 Checking bundle size..."
BUNDLE_SIZE=$(du -sh . | cut -f1)
echo "📦 Current directory size: $BUNDLE_SIZE"

# Step 5: Release to Wix
echo "🚀 Releasing to Wix..."
wix release

echo "✅ Release completed successfully!" 
#!/bin/bash

# Clean build script for Render deployment
echo "Starting clean build process..."

# Navigate to client directory
cd client

# Remove problematic files and directories
echo "Cleaning existing node_modules and lock files..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Install dependencies without optional packages
echo "Installing dependencies..."
npm install --no-optional --prefer-offline --no-audit --no-fund --production=false

# Run the build
echo "Building the application..."
npm run build

echo "Build completed successfully!"

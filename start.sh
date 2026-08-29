#!/bin/bash
set -e

echo "Building backend..."
cd /root/repo/api
npm install
npm run build

echo "Starting backend..."
node dist/app.js


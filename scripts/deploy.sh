
#!/bin/bash

# Railway Deployment Script for Form 1099 Mapper
# This script helps with Railway CLI deployment

set -e

echo "🚀 Starting Railway deployment for Form 1099 Mapper..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login check
echo "🔐 Checking Railway authentication..."
if ! railway whoami &> /dev/null; then
    echo "Please login to Railway:"
    railway login
fi

# Initialize project if not already done
if [ ! -f "railway.toml" ]; then
    echo "❌ railway.toml not found in current directory"
    exit 1
fi

# Deploy to Railway
echo "📦 Deploying to Railway..."
railway up

echo "✅ Deployment initiated! Check your Railway dashboard for progress."
echo "🌐 Your app will be available at the Railway-provided domain."

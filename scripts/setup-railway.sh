
#!/bin/bash

# Railway Setup Script for Form 1099 Mapper
# This script sets up the Railway project with PostgreSQL

set -e

echo "🛠️  Setting up Railway project for Form 1099 Mapper..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔐 Logging into Railway..."
railway login

# Create new project
echo "🆕 Creating new Railway project..."
railway init

# Add PostgreSQL service
echo "🐘 Adding PostgreSQL database service..."
railway add --service postgresql

# Link the services
echo "🔗 Linking services..."
railway link

# Set up environment variables
echo "⚙️  Setting up environment variables..."
railway variables set NEXTAUTH_SECRET=$(openssl rand -base64 32)
railway variables set NODE_ENV=production

echo "✅ Railway setup complete!"
echo "📝 Next steps:"
echo "   1. Push your code to GitHub"
echo "   2. Connect your GitHub repo to Railway"
echo "   3. Deploy using: railway up"
echo "   4. Your database will be automatically connected"

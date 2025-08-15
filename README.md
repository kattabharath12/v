# 📋 Form 1099 Mapper - Railway Deployment Ready

A comprehensive Form 1099 processing web application built with Next.js, PostgreSQL, and Prisma ORM, optimized for Railway platform deployment.

## 🚀 Quick Deploy to Railway

### Option 1: One-Click Deploy (Recommended)

[![Deploy on Railway](https://i.ytimg.com/vi/kaQqH9GIYh8/sddefault.jpg)

1. Click the "Deploy on Railway" button above
2. Connect your GitHub account
3. Fork this repository
4. Railway will automatically:
   - Create a PostgreSQL database
   - Set up environment variables
   - Deploy your application
   - Provide a public URL

### Option 2: Manual Railway Deployment

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Clone and setup:**
   ```bash
   git clone <your-repo-url>
   cd form-1099-railway
   chmod +x scripts/setup-railway.sh
   ./scripts/setup-railway.sh
   ```

3. **Deploy:**
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

## 🏗️ Application Features

### Core Functionality
- **Complete 1099 Form Support**: NEC, MISC, INT, DIV, B, R, G, K, and more
- **Automatic Form 1040 Mapping**: Smart mapping of 1099 data to Form 1040 lines
- **User Authentication**: Secure login/signup with NextAuth.js
- **Dashboard**: Comprehensive overview of all forms and mappings
- **Export Capabilities**: PDF generation and data export
- **Form Validation**: Real-time validation with Zod schemas

### Technical Stack
- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Railway managed)
- **Authentication**: NextAuth.js with bcrypt
- **Validation**: Zod schemas with React Hook Form
- **UI Components**: Custom components with Tailwind CSS

## 🗄️ Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  forms1099 Form1099[]
}

model Form1099 {
  id        String   @id @default(cuid())
  userId    String
  formType  String   // NEC, MISC, INT, DIV, B, R, G, K, etc.
  taxYear   Int
  data      Json     // Store form-specific data as JSON
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user     User              @relation(fields: [userId], references: [id])
  mappings Form1040Mapping[]
}

model Form1040Mapping {
  id         String @id @default(cuid())
  form1099Id String
  line       String // Form 1040 line number/identifier
  amount     Float
  description String
  form1099 Form1099 @relation(fields: [form1099Id], references: [id])
}
```

## ⚙️ Railway Configuration

### Environment Variables
Railway automatically sets these variables:

| Variable | Description | Source |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Auto-set by Railway |
| `NEXTAUTH_URL` | Application URL | Auto-set by Railway |
| `PORT` | Application port | Auto-set by Railway |
| `RAILWAY_ENVIRONMENT` | Current environment | Auto-set by Railway |

**Required Manual Variables:**
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NODE_ENV`: Set to "production"

### Railway Configuration Files

**railway.toml:**
```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm ci && npx prisma generate"

[deploy]
startCommand = "npx prisma migrate deploy && npm start"
healthcheckPath = "/"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
```

**Package.json Scripts:**
```json
{
  "scripts": {
    "start": "next start -p ${PORT:-3000}",
    "postinstall": "prisma generate",
    "railway:deploy": "npx prisma migrate deploy && npm start",
    "railway:build": "npm ci && npx prisma generate && npm run build"
  }
}
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL (or use Railway for development)
- npm or yarn

### Setup
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd form-1099-railway
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and secrets
   ```

4. **Set up database:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

### Development with Railway Database
```bash
# Link to Railway project
railway link

# Use Railway database for development
railway run npm run dev
```

## 📊 Form Types Supported

### 1099-NEC (Non-Employee Compensation)
- Box 1: Nonemployee compensation
- Box 2: Payer made direct sales
- Box 4: Federal income tax withheld
- Box 5: State tax withheld
- Box 6: State/Payer's state no.
- Box 7: State income

### 1099-MISC (Miscellaneous Information)
- Box 1: Rents
- Box 2: Royalties
- Box 3: Other income
- Box 4: Federal income tax withheld
- Box 5: Fishing boat proceeds
- Box 6: Medical and health care payments
- Box 7: Nonemployee compensation (prior years)
- Box 8: Substitute payments
- Box 9: Payer made direct sales
- Box 10: Crop insurance proceeds
- Box 11: State tax withheld
- Box 12: State/Payer's state no.
- Box 13: State income

### 1099-INT (Interest Income)
- Box 1: Interest income
- Box 2: Early withdrawal penalty
- Box 3: Interest on U.S. Savings Bonds
- Box 4: Federal income tax withheld
- Box 5: Investment expenses
- Box 6: Foreign tax paid
- Box 7: Foreign country
- Box 8: Tax-exempt interest
- Box 9: Specified private activity bond interest

### 1099-DIV (Dividends and Distributions)
- Box 1a: Total ordinary dividends
- Box 1b: Qualified dividends
- Box 2a: Total capital gain distributions
- Box 2b: Unrecaptured Section 1250 gain
- Box 2c: Section 1202 gain
- Box 2d: Collectibles (28%) gain
- Box 3: Nondividend distributions
- Box 4: Federal income tax withheld
- Box 5: Investment expenses
- Box 6: Foreign tax paid
- Box 7: Foreign country

### Additional Forms
- **1099-B**: Proceeds from broker transactions
- **1099-R**: Distributions from retirement plans
- **1099-G**: Government payments
- **1099-K**: Payment card transactions

## 🔄 Form 1040 Mapping

The application automatically maps 1099 data to appropriate Form 1040 lines:

### Income Mapping
- **1099-NEC Box 1** → Form 1040 Schedule C (Business Income)
- **1099-MISC Box 1** → Form 1040 Schedule E (Rental Income)
- **1099-INT Box 1** → Form 1040 Line 2b (Interest Income)
- **1099-DIV Box 1a** → Form 1040 Line 3b (Dividend Income)
- **1099-B** → Form 1040 Schedule D (Capital Gains/Losses)
- **1099-R** → Form 1040 Lines 4a-4d (Retirement Distributions)

### Tax Withholding
- **Federal Tax Withheld** → Form 1040 Line 25d (Federal Income Tax Withheld)
- **State Tax Withheld** → State tax return preparation

## 🔒 Security Features

### Authentication
- Secure password hashing with bcrypt
- Session management with NextAuth.js
- CSRF protection
- Secure cookie handling

### Data Protection
- Input validation with Zod schemas
- SQL injection prevention with Prisma
- XSS protection
- Environment variable security

### Railway Security
- HTTPS enforcement
- Database SSL connections
- Environment variable encryption
- Network isolation

## 📈 Performance Optimizations

### Build Optimizations
- Next.js automatic optimizations
- Prisma client generation during build
- Static asset optimization
- Tree shaking and code splitting

### Runtime Performance
- Database connection pooling
- Efficient queries with Prisma
- Server-side rendering for forms
- Client-side caching

### Railway Optimizations
- Health check configuration
- Automatic restart on failure
- Build caching
- Deployment rollbacks

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Test Database Connection
```bash
railway run npx prisma db push --preview-feature
```

### Validate Forms
```bash
npm run lint
```

## 📦 Deployment Process

### Automatic Deployment
1. **Push to GitHub** → Triggers Railway build
2. **Build Phase** → Install dependencies, generate Prisma client
3. **Deploy Phase** → Run migrations, start application
4. **Health Check** → Verify application is running
5. **Traffic Routing** → Route traffic to new deployment

### Manual Deployment
```bash
# Deploy to Railway
railway up

# Check deployment status
railway status

# View logs
railway logs

# Open application
railway open
```

## 🔧 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Check build logs
railway logs --deployment

# Test build locally
npm run build
```

**Database Issues:**
```bash
# Check database connection
railway connect postgresql

# Reset database
railway run npx prisma migrate reset
```

**Environment Variables:**
```bash
# List all variables
railway variables

# Set missing variables
railway variables set NEXTAUTH_SECRET=$(openssl rand -base64 32)
```

### Debug Commands
```bash
# Run in Railway environment
railway run npm run dev

# Shell access
railway shell

# Database studio
railway run npx prisma studio
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Form Management
- `GET /api/forms` - List user's forms
- `POST /api/forms` - Create new form
- `GET /api/forms/[id]` - Get specific form
- `PUT /api/forms/[id]` - Update form
- `DELETE /api/forms/[id]` - Delete form

### Export
- `GET /api/export` - Export forms data
- `POST /api/export/pdf` - Generate PDF

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Railway Documentation**: [docs.railway.app](https://docs.railway.app)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Documentation**: [prisma.io/docs](https://prisma.io/docs)
- **Issues**: Create an issue in this repository

## 🎉 Acknowledgments

- Railway team for the excellent deployment platform
- Next.js team for the amazing framework
- Prisma team for the powerful ORM
- All contributors and users

---

**Ready to deploy your Form 1099 Mapper to Railway? Click the deploy button above or follow the setup instructions!**

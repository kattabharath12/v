import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create a demo user
  const hashedPassword = await bcrypt.hash('demo123', 12)
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@form1099mapper.com' },
    update: {},
    create: {
      email: 'demo@form1099mapper.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  })

  console.log('👤 Created demo user:', demoUser.email)

  // Create sample 1099-NEC form
  const form1099NEC = await prisma.form1099.create({
    data: {
      userId: demoUser.id,
      formType: 'NEC',
      taxYear: 2024,
      data: {
        payer: {
          name: 'ABC Company LLC',
          address: '123 Business St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          tin: '12-3456789'
        },
        recipient: {
          name: 'Demo User',
          address: '456 Home Ave',
          city: 'New York',
          state: 'NY',
          zipCode: '10002',
          ssn: '123-45-6789'
        },
        amounts: {
          nonemployeeCompensation: 15000.00,
          federalIncomeTaxWithheld: 2250.00,
          stateTaxWithheld: 750.00,
          statePayersStateNo: 'NY123456',
          stateIncome: 15000.00
        }
      }
    }
  })

  // Create Form 1040 mappings for the 1099-NEC
  await prisma.form1040Mapping.createMany({
    data: [
      {
        form1099Id: form1099NEC.id,
        line: 'Schedule C - Line 1',
        amount: 15000.00,
        description: 'Nonemployee compensation from ABC Company LLC'
      },
      {
        form1099Id: form1099NEC.id,
        line: 'Form 1040 - Line 25d',
        amount: 2250.00,
        description: 'Federal income tax withheld'
      }
    ]
  })

  console.log('📋 Created sample 1099-NEC form with mappings')

  // Create sample 1099-INT form
  const form1099INT = await prisma.form1099.create({
    data: {
      userId: demoUser.id,
      formType: 'INT',
      taxYear: 2024,
      data: {
        payer: {
          name: 'First National Bank',
          address: '789 Bank Plaza',
          city: 'New York',
          state: 'NY',
          zipCode: '10003',
          tin: '98-7654321'
        },
        recipient: {
          name: 'Demo User',
          address: '456 Home Ave',
          city: 'New York',
          state: 'NY',
          zipCode: '10002',
          ssn: '123-45-6789'
        },
        amounts: {
          interestIncome: 1250.50,
          earlyWithdrawalPenalty: 0,
          interestOnUSSavingsBonds: 0,
          federalIncomeTaxWithheld: 125.05,
          investmentExpenses: 0,
          foreignTaxPaid: 0,
          taxExemptInterest: 0
        }
      }
    }
  })

  // Create Form 1040 mappings for the 1099-INT
  await prisma.form1040Mapping.createMany({
    data: [
      {
        form1099Id: form1099INT.id,
        line: 'Form 1040 - Line 2b',
        amount: 1250.50,
        description: 'Interest income from First National Bank'
      },
      {
        form1099Id: form1099INT.id,
        line: 'Form 1040 - Line 25d',
        amount: 125.05,
        description: 'Federal income tax withheld on interest'
      }
    ]
  })

  console.log('💰 Created sample 1099-INT form with mappings')

  // Create sample 1099-DIV form
  const form1099DIV = await prisma.form1099.create({
    data: {
      userId: demoUser.id,
      formType: 'DIV',
      taxYear: 2024,
      data: {
        payer: {
          name: 'Investment Brokerage Inc',
          address: '321 Wall Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10005',
          tin: '11-2233445'
        },
        recipient: {
          name: 'Demo User',
          address: '456 Home Ave',
          city: 'New York',
          state: 'NY',
          zipCode: '10002',
          ssn: '123-45-6789'
        },
        amounts: {
          totalOrdinaryDividends: 2500.75,
          qualifiedDividends: 2000.00,
          totalCapitalGainDistributions: 500.25,
          unrecapturedSection1250Gain: 0,
          section1202Gain: 0,
          collectiblesGain: 0,
          nondividendDistributions: 0,
          federalIncomeTaxWithheld: 250.08,
          investmentExpenses: 25.00,
          foreignTaxPaid: 0
        }
      }
    }
  })

  // Create Form 1040 mappings for the 1099-DIV
  await prisma.form1040Mapping.createMany({
    data: [
      {
        form1099Id: form1099DIV.id,
        line: 'Form 1040 - Line 3b',
        amount: 2500.75,
        description: 'Ordinary dividends from Investment Brokerage Inc'
      },
      {
        form1099Id: form1099DIV.id,
        line: 'Form 1040 - Line 3a',
        amount: 2000.00,
        description: 'Qualified dividends'
      },
      {
        form1099Id: form1099DIV.id,
        line: 'Schedule D',
        amount: 500.25,
        description: 'Capital gain distributions'
      },
      {
        form1099Id: form1099DIV.id,
        line: 'Form 1040 - Line 25d',
        amount: 250.08,
        description: 'Federal income tax withheld on dividends'
      }
    ]
  })

  console.log('📈 Created sample 1099-DIV form with mappings')

  console.log('✅ Database seed completed successfully!')
  console.log('🔑 Demo login credentials:')
  console.log('   Email: demo@form1099mapper.com')
  console.log('   Password: demo123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })

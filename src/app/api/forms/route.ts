
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FORM_SCHEMAS } from '@/lib/validations/form-schemas'
import { mapForm1099ToForm1040 } from '@/lib/mappings'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const taxYear = searchParams.get('taxYear')

    const whereClause: any = { userId: session.user.id }
    if (taxYear) {
      whereClause.taxYear = parseInt(taxYear)
    }

    const forms = await prisma.form1099.findMany({
      where: whereClause,
      include: {
        mappings: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ forms })
  } catch (error) {
    console.error('Error fetching forms:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { formType, taxYear, data } = body

    // Validate form data based on type
    const schema = FORM_SCHEMAS[formType as keyof typeof FORM_SCHEMAS]
    if (!schema) {
      return NextResponse.json(
        { error: 'Invalid form type' },
        { status: 400 }
      )
    }

    const validatedData = schema.parse(data)

    // Create form
    const form = await prisma.form1099.create({
      data: {
        userId: session.user.id,
        formType,
        taxYear: parseInt(taxYear),
        data: validatedData,
      }
    })

    // Generate mappings
    const mappings = mapForm1099ToForm1040(formType, validatedData)
    
    // Save mappings
    if (mappings.length > 0) {
      await prisma.form1040Mapping.createMany({
        data: mappings.map(mapping => ({
          form1099Id: form.id,
          line: mapping.line,
          amount: mapping.amount,
          description: mapping.description,
        }))
      })
    }

    // Fetch the complete form with mappings
    const completeForm = await prisma.form1099.findUnique({
      where: { id: form.id },
      include: { mappings: true }
    })

    return NextResponse.json({ form: completeForm })
  } catch (error) {
    console.error('Error creating form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

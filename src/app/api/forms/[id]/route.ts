
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { FORM_SCHEMAS } from '@/lib/validations/form-schemas'
import { mapForm1099ToForm1040 } from '@/lib/mappings'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resolvedParams = await params
    const form = await prisma.form1099.findFirst({
      where: {
        id: resolvedParams.id,
        userId: session.user.id
      },
      include: {
        mappings: true
      }
    })

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    return NextResponse.json({ form })
  } catch (error) {
    console.error('Error fetching form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { data } = body
    const resolvedParams = await params

    // Find the form
    const existingForm = await prisma.form1099.findFirst({
      where: {
        id: resolvedParams.id,
        userId: session.user.id
      }
    })

    if (!existingForm) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    // Validate form data
    const schema = FORM_SCHEMAS[existingForm.formType as keyof typeof FORM_SCHEMAS]
    const validatedData = schema.parse(data)

    // Update form
    const updatedForm = await prisma.form1099.update({
      where: { id: resolvedParams.id },
      data: { data: validatedData }
    })

    // Delete existing mappings
    await prisma.form1040Mapping.deleteMany({
      where: { form1099Id: resolvedParams.id }
    })

    // Generate new mappings
    const mappings = mapForm1099ToForm1040(existingForm.formType, validatedData)
    
    // Save new mappings
    if (mappings.length > 0) {
      await prisma.form1040Mapping.createMany({
        data: mappings.map(mapping => ({
          form1099Id: resolvedParams.id,
          line: mapping.line,
          amount: mapping.amount,
          description: mapping.description,
        }))
      })
    }

    // Fetch the complete updated form
    const completeForm = await prisma.form1099.findUnique({
      where: { id: resolvedParams.id },
      include: { mappings: true }
    })

    return NextResponse.json({ form: completeForm })
  } catch (error) {
    console.error('Error updating form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resolvedParams = await params
    const form = await prisma.form1099.findFirst({
      where: {
        id: resolvedParams.id,
        userId: session.user.id
      }
    })

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    await prisma.form1099.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({ message: 'Form deleted successfully' })
  } catch (error) {
    console.error('Error deleting form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

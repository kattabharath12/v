
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getAllMappingsForUser } from '@/lib/mappings'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const taxYear = searchParams.get('taxYear')
    const format = searchParams.get('format') || 'json'

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

    const allMappings = getAllMappingsForUser(forms)

    // Group mappings by Form 1040 line
    const groupedMappings = allMappings.reduce((acc, mapping) => {
      const key = mapping.line
      if (!acc[key]) {
        acc[key] = {
          line: mapping.line,
          description: mapping.description,
          schedule: mapping.schedule,
          totalAmount: 0,
          sources: []
        }
      }
      acc[key].totalAmount += mapping.amount
      acc[key].sources.push({
        formType: mapping.formType,
        formId: mapping.formId,
        amount: mapping.amount
      })
      return acc
    }, {} as any)

    const summary = {
      taxYear: taxYear ? parseInt(taxYear) : new Date().getFullYear(),
      totalForms: forms.length,
      formsByType: forms.reduce((acc, form) => {
        acc[form.formType] = (acc[form.formType] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      form1040Lines: Object.values(groupedMappings),
      generatedAt: new Date().toISOString()
    }

    if (format === 'csv') {
      // Generate CSV format
      const csvLines = [
        'Form 1040 Line,Description,Schedule,Total Amount,Source Forms'
      ]

      Object.values(groupedMappings).forEach((line: any) => {
        const sources = line.sources.map((s: any) => `${s.formType}:$${s.amount}`).join(';')
        csvLines.push([
          line.line,
          `"${line.description}"`,
          line.schedule || '',
          line.totalAmount.toFixed(2),
          `"${sources}"`
        ].join(','))
      })

      return new NextResponse(csvLines.join('\n'), {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="form-1040-summary-${taxYear || 'current'}.csv"`
        }
      })
    }

    return NextResponse.json(summary)
  } catch (error) {
    console.error('Error generating export:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


// Form 1099 to Form 1040 mapping logic
export interface Form1040Line {
  line: string
  description: string
  schedule?: string
}

export interface MappingRule {
  sourceField: string
  targetLine: Form1040Line
  calculation?: (value: number) => number
}

export const FORM_1099_MAPPINGS: Record<string, MappingRule[]> = {
  'NEC': [
    {
      sourceField: 'nonemployeeCompensation',
      targetLine: {
        line: 'Schedule C',
        description: 'Business Income (Gross receipts or sales)',
        schedule: 'Schedule C'
      }
    }
  ],
  'MISC': [
    {
      sourceField: 'rents',
      targetLine: {
        line: 'Schedule E',
        description: 'Rental real estate, royalties, partnerships, S corporations, trusts, etc.',
        schedule: 'Schedule E'
      }
    },
    {
      sourceField: 'royalties',
      targetLine: {
        line: 'Schedule E',
        description: 'Royalties',
        schedule: 'Schedule E'
      }
    },
    {
      sourceField: 'otherIncome',
      targetLine: {
        line: '8i',
        description: 'Other income'
      }
    },
    {
      sourceField: 'prizesAndAwards',
      targetLine: {
        line: '8i',
        description: 'Other income (Prizes and awards)'
      }
    }
  ],
  'INT': [
    {
      sourceField: 'interestIncome',
      targetLine: {
        line: '2a',
        description: 'Taxable interest'
      }
    },
    {
      sourceField: 'foreignTaxPaid',
      targetLine: {
        line: 'Schedule 3 Line 1',
        description: 'Foreign tax credit',
        schedule: 'Schedule 3'
      }
    }
  ],
  'DIV': [
    {
      sourceField: 'ordinaryDividends',
      targetLine: {
        line: '3a',
        description: 'Ordinary dividends'
      }
    },
    {
      sourceField: 'qualifiedDividends',
      targetLine: {
        line: '3b',
        description: 'Qualified dividends'
      }
    },
    {
      sourceField: 'foreignTaxPaid',
      targetLine: {
        line: 'Schedule 3 Line 1',
        description: 'Foreign tax credit',
        schedule: 'Schedule 3'
      }
    }
  ],
  'B': [
    {
      sourceField: 'proceedsFromBroker',
      targetLine: {
        line: 'Schedule D',
        description: 'Capital gains and losses',
        schedule: 'Schedule D'
      }
    }
  ],
  'R': [
    {
      sourceField: 'grossDistribution',
      targetLine: {
        line: '4a',
        description: 'IRA distributions (gross)'
      }
    },
    {
      sourceField: 'taxableAmount',
      targetLine: {
        line: '4b',
        description: 'IRA distributions (taxable)'
      }
    },
    {
      sourceField: 'pensionAnnuityGross',
      targetLine: {
        line: '5a',
        description: 'Pensions and annuities (gross)'
      }
    },
    {
      sourceField: 'pensionAnnuityTaxable',
      targetLine: {
        line: '5b',
        description: 'Pensions and annuities (taxable)'
      }
    }
  ],
  'G': [
    {
      sourceField: 'unemploymentCompensation',
      targetLine: {
        line: '7',
        description: 'Unemployment compensation'
      }
    },
    {
      sourceField: 'stateIncomeTaxRefund',
      targetLine: {
        line: '8a',
        description: 'State and local income tax refunds'
      }
    }
  ],
  'K': [
    {
      sourceField: 'grossAmount',
      targetLine: {
        line: 'Schedule C',
        description: 'Business Income (Payment card transactions)',
        schedule: 'Schedule C'
      }
    }
  ]
}

export function mapForm1099ToForm1040(formType: string, formData: any): Array<{
  line: string
  description: string
  amount: number
  schedule?: string
}> {
  const mappings = FORM_1099_MAPPINGS[formType] || []
  const results: Array<{
    line: string
    description: string
    amount: number
    schedule?: string
  }> = []

  mappings.forEach(mapping => {
    const value = formData[mapping.sourceField]
    if (value && typeof value === 'number' && value > 0) {
      const amount = mapping.calculation ? mapping.calculation(value) : value
      results.push({
        line: mapping.targetLine.line,
        description: mapping.targetLine.description,
        amount,
        schedule: mapping.targetLine.schedule
      })
    }
  })

  return results
}

export function getAllMappingsForUser(forms1099: any[]): Array<{
  formType: string
  formId: string
  line: string
  description: string
  amount: number
  schedule?: string
}> {
  const allMappings: Array<{
    formType: string
    formId: string
    line: string
    description: string
    amount: number
    schedule?: string
  }> = []

  forms1099.forEach(form => {
    const mappings = mapForm1099ToForm1040(form.formType, form.data)
    mappings.forEach(mapping => {
      allMappings.push({
        formType: form.formType,
        formId: form.id,
        ...mapping
      })
    })
  })

  return allMappings
}

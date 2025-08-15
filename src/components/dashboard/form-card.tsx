
import Link from 'next/link'

interface FormCardProps {
  form: {
    id: string
    formType: string
    taxYear: number
    data: any
    createdAt: string
    mappings: Array<{
      line: string
      amount: number
      description: string
    }>
  }
  onDelete: () => void
}

export function FormCard({ form, onDelete }: FormCardProps) {
  const totalMappedAmount = form.mappings.reduce((sum, mapping) => sum + mapping.amount, 0)
  
  const getFormTitle = (type: string) => {
    const titles = {
      'NEC': 'Nonemployee Compensation',
      'MISC': 'Miscellaneous Information',
      'INT': 'Interest Income',
      'DIV': 'Dividends and Distributions',
      'B': 'Proceeds From Broker',
      'R': 'Distributions From Retirement Plans',
      'G': 'Government Payments',
      'K': 'Payment Card Transactions'
    }
    return titles[type as keyof typeof titles] || type
  }

  const getPayerName = (data: any) => {
    return data?.payer?.name || 'Unknown Payer'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            1099-{form.formType}
          </h3>
          <p className="text-sm text-gray-600">{getFormTitle(form.formType)}</p>
        </div>
        <div className="flex space-x-2">
          <Link
            href={`/forms/${form.id}/edit`}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Edit
          </Link>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Payer:</span>
          <span className="font-medium">{getPayerName(form.data)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax Year:</span>
          <span className="font-medium">{form.taxYear}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">1040 Mappings:</span>
          <span className="font-medium">{form.mappings.length}</span>
        </div>
        {totalMappedAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-medium">${totalMappedAmount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500">
        Created: {new Date(form.createdAt).toLocaleDateString()}
      </div>

      {form.mappings.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Form 1040 Mappings:</h4>
          <div className="space-y-1">
            {form.mappings.slice(0, 3).map((mapping, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span className="text-gray-600">Line {mapping.line}:</span>
                <span className="font-medium">${mapping.amount.toFixed(2)}</span>
              </div>
            ))}
            {form.mappings.length > 3 && (
              <div className="text-xs text-gray-500">
                +{form.mappings.length - 3} more mappings
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


interface FormTypeSelectorProps {
  onSelect: (type: string) => void
}

const FORM_TYPES = [
  {
    type: 'NEC',
    title: '1099-NEC',
    description: 'Nonemployee Compensation',
    icon: '💼'
  },
  {
    type: 'MISC',
    title: '1099-MISC',
    description: 'Miscellaneous Information',
    icon: '📋'
  },
  {
    type: 'INT',
    title: '1099-INT',
    description: 'Interest Income',
    icon: '🏦'
  },
  {
    type: 'DIV',
    title: '1099-DIV',
    description: 'Dividends and Distributions',
    icon: '📈'
  },
  {
    type: 'B',
    title: '1099-B',
    description: 'Proceeds From Broker and Barter Exchange Transactions',
    icon: '📊'
  },
  {
    type: 'R',
    title: '1099-R',
    description: 'Distributions From Pensions, Annuities, Retirement Plans',
    icon: '🏛️'
  },
  {
    type: 'G',
    title: '1099-G',
    description: 'Certain Government Payments',
    icon: '🏛️'
  },
  {
    type: 'K',
    title: '1099-K',
    description: 'Payment Card and Third Party Network Transactions',
    icon: '💳'
  }
]

export function FormTypeSelector({ onSelect }: FormTypeSelectorProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Select Form Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FORM_TYPES.map((formType) => (
          <button
            key={formType.type}
            onClick={() => onSelect(formType.type)}
            className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">{formType.icon}</span>
              <h3 className="text-lg font-semibold">{formType.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{formType.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

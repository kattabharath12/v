
interface SummaryCardProps {
  title: string
  value: string | number
  icon: string
}

export function SummaryCard({ title, value, icon }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className="text-2xl mr-4">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

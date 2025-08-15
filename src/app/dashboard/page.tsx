
'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { FormCard } from '@/components/dashboard/form-card'
import { SummaryCard } from '@/components/dashboard/summary-card'

interface Form1099 {
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

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [forms, setForms] = useState<Form1099[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchForms()
    }
  }, [session, selectedYear])

  const fetchForms = async () => {
    try {
      const response = await fetch(`/api/forms?taxYear=${selectedYear}`)
      if (response.ok) {
        const data = await response.json()
        setForms(data.forms)
      } else {
        toast.error('Failed to fetch forms')
      }
    } catch (error) {
      toast.error('Error fetching forms')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteForm = async (formId: string) => {
    if (!confirm('Are you sure you want to delete this form?')) {
      return
    }

    try {
      const response = await fetch(`/api/forms/${formId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Form deleted successfully')
        fetchForms()
      } else {
        toast.error('Failed to delete form')
      }
    } catch (error) {
      toast.error('Error deleting form')
    }
  }

  const handleExport = async (format: 'json' | 'csv') => {
    try {
      const response = await fetch(`/api/export?taxYear=${selectedYear}&format=${format}`)
      
      if (format === 'csv') {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `form-1040-summary-${selectedYear}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success('CSV exported successfully')
      } else {
        const data = await response.json()
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `form-1040-summary-${selectedYear}.json`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success('JSON exported successfully')
      }
    } catch (error) {
      toast.error('Export failed')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!session) {
    return null
  }

  const currentYearForms = forms.filter(form => form.taxYear === selectedYear)
  const formsByType = currentYearForms.reduce((acc, form) => {
    acc[form.formType] = (acc[form.formType] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const totalMappings = currentYearForms.reduce((acc, form) => acc + form.mappings.length, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {session.user?.name}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="form-input w-auto"
            >
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            
            <Link
              href="/forms/new"
              className="btn-primary whitespace-nowrap"
            >
              Add New 1099
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <SummaryCard
            title="Total Forms"
            value={currentYearForms.length}
            icon="📋"
          />
          <SummaryCard
            title="Form Types"
            value={Object.keys(formsByType).length}
            icon="📝"
          />
          <SummaryCard
            title="1040 Mappings"
            value={totalMappings}
            icon="🔄"
          />
          <SummaryCard
            title="Tax Year"
            value={selectedYear}
            icon="📅"
          />
        </div>

        {/* Export Section */}
        {currentYearForms.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Export Summary</h2>
            <div className="flex gap-3">
              <button
                onClick={() => handleExport('csv')}
                className="btn-secondary"
              >
                Export CSV
              </button>
              <button
                onClick={() => handleExport('json')}
                className="btn-secondary"
              >
                Export JSON
              </button>
            </div>
          </div>
        )}

        {/* Forms List */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Your 1099 Forms ({selectedYear})</h2>
          
          {currentYearForms.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No forms yet</h3>
              <p className="text-gray-600 mb-4">
                Get started by adding your first 1099 form for {selectedYear}
              </p>
              <Link href="/forms/new" className="btn-primary">
                Add Your First Form
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentYearForms.map((form) => (
                <FormCard
                  key={form.id}
                  form={form}
                  onDelete={() => handleDeleteForm(form.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}


'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { FormTypeSelector } from '@/components/forms/form-type-selector'
import { Form1099NEC } from '@/components/forms/form-1099-nec'
import { Form1099MISC } from '@/components/forms/form-1099-misc'
import { Form1099INT } from '@/components/forms/form-1099-int'
import { Form1099DIV } from '@/components/forms/form-1099-div'
import { Form1099B } from '@/components/forms/form-1099-b'
import { Form1099R } from '@/components/forms/form-1099-r'
import { Form1099G } from '@/components/forms/form-1099-g'
import { Form1099K } from '@/components/forms/form-1099-k'

const FORM_COMPONENTS = {
  'NEC': Form1099NEC,
  'MISC': Form1099MISC,
  'INT': Form1099INT,
  'DIV': Form1099DIV,
  'B': Form1099B,
  'R': Form1099R,
  'G': Form1099G,
  'K': Form1099K,
}

export default function NewForm() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string>('')
  const [taxYear, setTaxYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(false)

  if (status === 'loading') {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  const handleFormSubmit = async (formData: any) => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: selectedType,
          taxYear,
          data: formData,
        }),
      })

      if (response.ok) {
        toast.success('Form saved successfully')
        router.push('/dashboard')
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to save form')
      }
    } catch (error) {
      toast.error('An error occurred while saving the form')
    } finally {
      setLoading(false)
    }
  }

  const FormComponent = selectedType ? FORM_COMPONENTS[selectedType as keyof typeof FORM_COMPONENTS] : null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Add New 1099 Form</h1>
          <button
            onClick={() => router.back()}
            className="btn-secondary"
          >
            ← Back
          </button>
        </div>

        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="form-field">
              <label className="form-label">Tax Year</label>
              <select
                value={taxYear}
                onChange={(e) => setTaxYear(parseInt(e.target.value))}
                className="form-input"
              >
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {!selectedType ? (
            <FormTypeSelector onSelect={setSelectedType} />
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  Form 1099-{selectedType} ({taxYear})
                </h2>
                <button
                  onClick={() => setSelectedType('')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Change Form Type
                </button>
              </div>

              {FormComponent && (
                <FormComponent
                  onSubmit={handleFormSubmit}
                  loading={loading}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

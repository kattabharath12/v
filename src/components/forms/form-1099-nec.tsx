
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { form1099NECSchema, Form1099NECData } from '@/lib/validations/form-schemas'
import { FormField } from './form-field'
import { PayerRecipientSection } from './payer-recipient-section'

interface Form1099NECProps {
  onSubmit: (data: Form1099NECData) => void
  loading: boolean
  initialData?: Partial<Form1099NECData>
}

export function Form1099NEC({ onSubmit, loading, initialData }: Form1099NECProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<Form1099NECData>({
    resolver: zodResolver(form1099NECSchema),
    defaultValues: initialData
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <PayerRecipientSection
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Income Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Nonemployee Compensation"
            name="nonemployeeCompensation"
            type="number"
            step="0.01"
            register={register}
            error={errors.nonemployeeCompensation}
            helpText="Enter the total amount of nonemployee compensation paid"
            required
          />

          <FormField
            label="Federal Income Tax Withheld"
            name="federalIncomeTaxWithheld"
            type="number"
            step="0.01"
            register={register}
            error={errors.federalIncomeTaxWithheld}
            helpText="Enter any federal income tax that was withheld"
          />
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">State Tax Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            label="State"
            name="state"
            register={register}
            error={errors.state}
            helpText="Two-letter state code"
            maxLength={2}
          />

          <FormField
            label="State ID Number"
            name="stateIdNumber"
            register={register}
            error={errors.stateIdNumber}
            helpText="Payer's state identification number"
          />

          <FormField
            label="State Income Tax Withheld"
            name="stateIncomeTaxWithheld"
            type="number"
            step="0.01"
            register={register}
            error={errors.stateIncomeTaxWithheld}
            helpText="Enter any state income tax that was withheld"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Form 1040 Mapping</h4>
        <p className="text-blue-800 text-sm">
          Nonemployee compensation will be mapped to <strong>Schedule C (Business Income)</strong> 
          on your Form 1040. This income is subject to self-employment tax.
        </p>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Form'}
        </button>
      </div>
    </form>
  )
}


'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { form1099RSchema, Form1099RData } from '@/lib/validations/form-schemas'
import { FormField } from './form-field'
import { PayerRecipientSection } from './payer-recipient-section'

interface Form1099RProps {
  onSubmit: (data: Form1099RData) => void
  loading: boolean
  initialData?: Partial<Form1099RData>
}

export function Form1099R({ onSubmit, loading, initialData }: Form1099RProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<Form1099RData>({
    resolver: zodResolver(form1099RSchema),
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
        <h3 className="text-lg font-semibold mb-4">Distribution Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Gross Distribution"
            name="grossDistribution"
            type="number"
            step="0.01"
            register={register}
            error={errors.grossDistribution}
            helpText="Total amount of distribution"
            required
          />

          <FormField
            label="Taxable Amount"
            name="taxableAmount"
            type="number"
            step="0.01"
            register={register}
            error={errors.taxableAmount}
            helpText="Taxable portion of distribution"
          />

          <FormField
            label="Distribution Code"
            name="distributionCode"
            register={register}
            error={errors.distributionCode}
            helpText="Single letter code (1-9, A-T)"
            maxLength={1}
            required
          />

          <FormField
            label="Federal Income Tax Withheld"
            name="federalIncomeTaxWithheld"
            type="number"
            step="0.01"
            register={register}
            error={errors.federalIncomeTaxWithheld}
            helpText="Federal tax withheld from distribution"
          />
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Employee Contributions"
            name="employeeContributions"
            type="number"
            step="0.01"
            register={register}
            error={errors.employeeContributions}
            helpText="Employee contributions or designated Roth contributions"
          />

          <FormField
            label="Net Unrealized Appreciation"
            name="netUnrealizedAppreciation"
            type="number"
            step="0.01"
            register={register}
            error={errors.netUnrealizedAppreciation}
            helpText="Net unrealized appreciation in employer securities"
          />

          <FormField
            label="Pension/Annuity Gross"
            name="pensionAnnuityGross"
            type="number"
            step="0.01"
            register={register}
            error={errors.pensionAnnuityGross}
            helpText="Gross pension/annuity amount"
          />

          <FormField
            label="Pension/Annuity Taxable"
            name="pensionAnnuityTaxable"
            type="number"
            step="0.01"
            register={register}
            error={errors.pensionAnnuityTaxable}
            helpText="Taxable pension/annuity amount"
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
            helpText="State tax withheld from distribution"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Form 1040 Mapping</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• IRA distributions → <strong>Form 1040 Lines 4a and 4b</strong></li>
          <li>• Pension/annuity distributions → <strong>Form 1040 Lines 5a and 5b</strong></li>
        </ul>
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

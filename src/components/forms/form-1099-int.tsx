
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { form1099INTSchema, Form1099INTData } from '@/lib/validations/form-schemas'
import { FormField } from './form-field'
import { PayerRecipientSection } from './payer-recipient-section'

interface Form1099INTProps {
  onSubmit: (data: Form1099INTData) => void
  loading: boolean
  initialData?: Partial<Form1099INTData>
}

export function Form1099INT({ onSubmit, loading, initialData }: Form1099INTProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<Form1099INTData>({
    resolver: zodResolver(form1099INTSchema),
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
        <h3 className="text-lg font-semibold mb-4">Interest Income</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Interest Income"
            name="interestIncome"
            type="number"
            step="0.01"
            register={register}
            error={errors.interestIncome}
            helpText="Total taxable interest income"
            required
          />

          <FormField
            label="Tax-Exempt Interest"
            name="taxExemptInterest"
            type="number"
            step="0.01"
            register={register}
            error={errors.taxExemptInterest}
            helpText="Interest from tax-exempt bonds"
          />

          <FormField
            label="Interest on US Savings Bonds"
            name="interestOnUSSavingsBonds"
            type="number"
            step="0.01"
            register={register}
            error={errors.interestOnUSSavingsBonds}
            helpText="Interest from US Treasury obligations"
          />

          <FormField
            label="Early Withdrawal Penalty"
            name="earlyWithdrawalPenalty"
            type="number"
            step="0.01"
            register={register}
            error={errors.earlyWithdrawalPenalty}
            helpText="Penalty for early withdrawal of savings"
          />
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Tax Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Federal Income Tax Withheld"
            name="federalIncomeTaxWithheld"
            type="number"
            step="0.01"
            register={register}
            error={errors.federalIncomeTaxWithheld}
            helpText="Federal tax withheld from interest"
          />

          <FormField
            label="Foreign Tax Paid"
            name="foreignTaxPaid"
            type="number"
            step="0.01"
            register={register}
            error={errors.foreignTaxPaid}
            helpText="Foreign tax paid on interest"
          />

          <FormField
            label="Foreign Country"
            name="foreignCountry"
            register={register}
            error={errors.foreignCountry}
            helpText="Country where foreign tax was paid"
          />

          <FormField
            label="Investment Expenses"
            name="investmentExpenses"
            type="number"
            step="0.01"
            register={register}
            error={errors.investmentExpenses}
            helpText="Investment expenses related to this interest"
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
            helpText="State tax withheld from interest"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Form 1040 Mapping</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Interest income → <strong>Form 1040 Line 2a (Taxable interest)</strong></li>
          <li>• Foreign tax paid → <strong>Schedule 3 Line 1 (Foreign tax credit)</strong></li>
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

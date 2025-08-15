
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { form1099GSchema, Form1099GData } from '@/lib/validations/form-schemas'
import { FormField } from './form-field'
import { PayerRecipientSection } from './payer-recipient-section'

interface Form1099GProps {
  onSubmit: (data: Form1099GData) => void
  loading: boolean
  initialData?: Partial<Form1099GData>
}

export function Form1099G({ onSubmit, loading, initialData }: Form1099GProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<Form1099GData>({
    resolver: zodResolver(form1099GSchema),
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
        <h3 className="text-lg font-semibold mb-4">Government Payments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Unemployment Compensation"
            name="unemploymentCompensation"
            type="number"
            step="0.01"
            register={register}
            error={errors.unemploymentCompensation}
            helpText="Unemployment compensation received"
          />

          <FormField
            label="State Income Tax Refund"
            name="stateIncomeTaxRefund"
            type="number"
            step="0.01"
            register={register}
            error={errors.stateIncomeTaxRefund}
            helpText="State or local income tax refunds"
          />

          <FormField
            label="Reemployment Trade Adjustment Assistance"
            name="reemploymentTradeAdjustmentAssistance"
            type="number"
            step="0.01"
            register={register}
            error={errors.reemploymentTradeAdjustmentAssistance}
            helpText="RTAA payments"
          />

          <FormField
            label="Taxable Grants"
            name="taxableGrants"
            type="number"
            step="0.01"
            register={register}
            error={errors.taxableGrants}
            helpText="Taxable grants received"
          />

          <FormField
            label="Agriculture Payments"
            name="agriculturePayments"
            type="number"
            step="0.01"
            register={register}
            error={errors.agriculturePayments}
            helpText="Agriculture program payments"
          />

          <FormField
            label="Market Gain on Repayment"
            name="marketGainOnRepayment"
            type="number"
            step="0.01"
            register={register}
            error={errors.marketGainOnRepayment}
            helpText="Market gain on repayment of loan"
          />
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Tax Withholding</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Federal Income Tax Withheld"
            name="federalIncomeTaxWithheld"
            type="number"
            step="0.01"
            register={register}
            error={errors.federalIncomeTaxWithheld}
            helpText="Federal tax withheld from payments"
          />

          <FormField
            label="State Income Tax Withheld"
            name="stateIncomeTaxWithheld"
            type="number"
            step="0.01"
            register={register}
            error={errors.stateIncomeTaxWithheld}
            helpText="State tax withheld from payments"
          />
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">State Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Form 1040 Mapping</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Unemployment compensation → <strong>Form 1040 Line 7</strong></li>
          <li>• State income tax refund → <strong>Form 1040 Line 8a</strong></li>
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

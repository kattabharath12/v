
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { form1099KSchema, Form1099KData } from '@/lib/validations/form-schemas'
import { FormField } from './form-field'
import { PayerRecipientSection } from './payer-recipient-section'

interface Form1099KProps {
  onSubmit: (data: Form1099KData) => void
  loading: boolean
  initialData?: Partial<Form1099KData>
}

export function Form1099K({ onSubmit, loading, initialData }: Form1099KProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<Form1099KData>({
    resolver: zodResolver(form1099KSchema),
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
        <h3 className="text-lg font-semibold mb-4">Payment Card Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Gross Amount"
            name="grossAmount"
            type="number"
            step="0.01"
            register={register}
            error={errors.grossAmount}
            helpText="Gross amount of payment card transactions"
            required
          />

          <FormField
            label="Card Not Present Transactions"
            name="cardNotPresentTransactions"
            type="number"
            step="0.01"
            register={register}
            error={errors.cardNotPresentTransactions}
            helpText="Amount of card-not-present transactions"
          />

          <FormField
            label="Number of Payment Transactions"
            name="numberOfPaymentTransactions"
            type="number"
            register={register}
            error={errors.numberOfPaymentTransactions}
            helpText="Total number of payment transactions"
          />

          <FormField
            label="Merchant Category Code"
            name="merchantCategoryCode"
            register={register}
            error={errors.merchantCategoryCode}
            helpText="Merchant category code (if applicable)"
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
        <p className="text-blue-800 text-sm">
          Payment card transactions will be mapped to <strong>Schedule C (Business Income)</strong> 
          on your Form 1040. This represents gross receipts from your business activities.
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

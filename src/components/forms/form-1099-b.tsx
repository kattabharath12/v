
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { form1099BSchema, Form1099BData } from '@/lib/validations/form-schemas'
import { FormField } from './form-field'
import { PayerRecipientSection } from './payer-recipient-section'

interface Form1099BProps {
  onSubmit: (data: Form1099BData) => void
  loading: boolean
  initialData?: Partial<Form1099BData>
}

export function Form1099B({ onSubmit, loading, initialData }: Form1099BProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<Form1099BData>({
    resolver: zodResolver(form1099BSchema),
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
        <h3 className="text-lg font-semibold mb-4">Transaction Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Security Description"
            name="description"
            register={register}
            error={errors.description}
            helpText="Description of the security sold"
            required
          />

          <FormField
            label="Date Sold"
            name="dateSold"
            type="date"
            register={register}
            error={errors.dateSold}
            helpText="Date the security was sold"
            required
          />

          <FormField
            label="Date Acquired"
            name="dateAcquired"
            type="date"
            register={register}
            error={errors.dateAcquired}
            helpText="Date the security was acquired"
          />

          <FormField
            label="Proceeds from Broker"
            name="proceedsFromBroker"
            type="number"
            step="0.01"
            register={register}
            error={errors.proceedsFromBroker}
            helpText="Gross proceeds from the sale"
            required
          />

          <FormField
            label="Cost or Other Basis"
            name="costOrOtherBasis"
            type="number"
            step="0.01"
            register={register}
            error={errors.costOrOtherBasis}
            helpText="Cost basis of the security"
          />

          <FormField
            label="Federal Income Tax Withheld"
            name="federalIncomeTaxWithheld"
            type="number"
            step="0.01"
            register={register}
            error={errors.federalIncomeTaxWithheld}
            helpText="Federal tax withheld from proceeds"
          />
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Gain/Loss Classification</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="form-field">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('shortTermGainLoss')}
                className="mr-2"
              />
              Short-term gain/loss
            </label>
          </div>

          <div className="form-field">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('longTermGainLoss')}
                className="mr-2"
              />
              Long-term gain/loss
            </label>
          </div>

          <div className="form-field">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('ordinaryIncome')}
                className="mr-2"
              />
              Ordinary income
            </label>
          </div>
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
            helpText="State tax withheld from proceeds"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Form 1040 Mapping</h4>
        <p className="text-blue-800 text-sm">
          Proceeds from broker transactions will be mapped to <strong>Schedule D (Capital gains and losses)</strong> 
          on your Form 1040. You&apos;ll need to calculate the actual gain or loss using your cost basis.
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

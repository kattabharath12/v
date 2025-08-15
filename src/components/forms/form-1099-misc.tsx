
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { form1099MISCSchema, Form1099MISCData } from '@/lib/validations/form-schemas'
import { FormField } from './form-field'
import { PayerRecipientSection } from './payer-recipient-section'

interface Form1099MISCProps {
  onSubmit: (data: Form1099MISCData) => void
  loading: boolean
  initialData?: Partial<Form1099MISCData>
}

export function Form1099MISC({ onSubmit, loading, initialData }: Form1099MISCProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<Form1099MISCData>({
    resolver: zodResolver(form1099MISCSchema),
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
            label="Rents"
            name="rents"
            type="number"
            step="0.01"
            register={register}
            error={errors.rents}
            helpText="Real estate rental income"
          />

          <FormField
            label="Royalties"
            name="royalties"
            type="number"
            step="0.01"
            register={register}
            error={errors.royalties}
            helpText="Royalty payments"
          />

          <FormField
            label="Other Income"
            name="otherIncome"
            type="number"
            step="0.01"
            register={register}
            error={errors.otherIncome}
            helpText="Other miscellaneous income"
          />

          <FormField
            label="Prizes and Awards"
            name="prizesAndAwards"
            type="number"
            step="0.01"
            register={register}
            error={errors.prizesAndAwards}
            helpText="Prizes, awards, and gambling winnings"
          />

          <FormField
            label="Medical and Health Care Payments"
            name="medicalAndHealthCarePayments"
            type="number"
            step="0.01"
            register={register}
            error={errors.medicalAndHealthCarePayments}
            helpText="Payments to physicians and healthcare providers"
          />

          <FormField
            label="Fishing Boat Proceeds"
            name="fishingBoatProceeds"
            type="number"
            step="0.01"
            register={register}
            error={errors.fishingBoatProceeds}
            helpText="Proceeds from fishing boat operations"
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
          <li>• Rents and royalties → <strong>Schedule E</strong></li>
          <li>• Other income and prizes → <strong>Form 1040 Line 8i (Other income)</strong></li>
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


'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { form1099DIVSchema, Form1099DIVData } from '@/lib/validations/form-schemas'
import { FormField } from './form-field'
import { PayerRecipientSection } from './payer-recipient-section'

interface Form1099DIVProps {
  onSubmit: (data: Form1099DIVData) => void
  loading: boolean
  initialData?: Partial<Form1099DIVData>
}

export function Form1099DIV({ onSubmit, loading, initialData }: Form1099DIVProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<Form1099DIVData>({
    resolver: zodResolver(form1099DIVSchema),
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
        <h3 className="text-lg font-semibold mb-4">Dividend Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Ordinary Dividends"
            name="ordinaryDividends"
            type="number"
            step="0.01"
            register={register}
            error={errors.ordinaryDividends}
            helpText="Total ordinary dividends"
            required
          />

          <FormField
            label="Qualified Dividends"
            name="qualifiedDividends"
            type="number"
            step="0.01"
            register={register}
            error={errors.qualifiedDividends}
            helpText="Qualified dividends eligible for capital gains rates"
          />

          <FormField
            label="Capital Gain Distributions"
            name="capitalGainDistributions"
            type="number"
            step="0.01"
            register={register}
            error={errors.capitalGainDistributions}
            helpText="Capital gain distributions from mutual funds"
          />

          <FormField
            label="Section 199A Dividends"
            name="section199ADividends"
            type="number"
            step="0.01"
            register={register}
            error={errors.section199ADividends}
            helpText="Qualified business income dividends"
          />
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Capital Gains</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Unrecaptured Section 1250 Gain"
            name="unrecapturedSection1250Gain"
            type="number"
            step="0.01"
            register={register}
            error={errors.unrecapturedSection1250Gain}
            helpText="Unrecaptured section 1250 gain"
          />

          <FormField
            label="Section 1202 Gain"
            name="section1202Gain"
            type="number"
            step="0.01"
            register={register}
            error={errors.section1202Gain}
            helpText="Section 1202 gain"
          />

          <FormField
            label="Collectibles Gain"
            name="collectiblesGain"
            type="number"
            step="0.01"
            register={register}
            error={errors.collectiblesGain}
            helpText="28% rate gain (collectibles)"
          />

          <FormField
            label="Nondividend Distributions"
            name="nondividendDistributions"
            type="number"
            step="0.01"
            register={register}
            error={errors.nondividendDistributions}
            helpText="Nondividend distributions"
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
            helpText="Federal tax withheld from dividends"
          />

          <FormField
            label="Foreign Tax Paid"
            name="foreignTaxPaid"
            type="number"
            step="0.01"
            register={register}
            error={errors.foreignTaxPaid}
            helpText="Foreign tax paid on dividends"
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
            helpText="Investment expenses related to dividends"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Form 1040 Mapping</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Ordinary dividends → <strong>Form 1040 Line 3a</strong></li>
          <li>• Qualified dividends → <strong>Form 1040 Line 3b</strong></li>
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

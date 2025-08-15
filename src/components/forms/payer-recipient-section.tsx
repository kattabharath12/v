
import { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { FormField } from './form-field'

interface PayerRecipientSectionProps {
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  watch: UseFormWatch<any>
  setValue: UseFormSetValue<any>
}

export function PayerRecipientSection({ register, errors }: PayerRecipientSectionProps) {
  return (
    <>
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Payer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Payer Name"
            name="payer.name"
            register={register}
            error={(errors as any).payer?.name}
            required
          />

          <FormField
            label="Payer Tax ID"
            name="payer.taxId"
            register={register}
            error={(errors as any).payer?.taxId}
            helpText="Format: XX-XXXXXXX or XXX-XX-XXXX"
          />

          <FormField
            label="Address"
            name="payer.address"
            register={register}
            error={(errors as any).payer?.address}
            required
          />

          <FormField
            label="City"
            name="payer.city"
            register={register}
            error={(errors as any).payer?.city}
            required
          />

          <FormField
            label="State"
            name="payer.state"
            register={register}
            error={(errors as any).payer?.state}
            maxLength={2}
            placeholder="CA"
            required
          />

          <FormField
            label="ZIP Code"
            name="payer.zipCode"
            register={register}
            error={(errors as any).payer?.zipCode}
            placeholder="12345 or 12345-6789"
            required
          />
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recipient Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Recipient Name"
            name="recipient.name"
            register={register}
            error={(errors as any).recipient?.name}
            required
          />

          <FormField
            label="Social Security Number"
            name="recipient.ssn"
            register={register}
            error={(errors as any).recipient?.ssn}
            placeholder="XXX-XX-XXXX"
            required
          />

          <FormField
            label="Address"
            name="recipient.address"
            register={register}
            error={(errors as any).recipient?.address}
            required
          />

          <FormField
            label="City"
            name="recipient.city"
            register={register}
            error={(errors as any).recipient?.city}
            required
          />

          <FormField
            label="State"
            name="recipient.state"
            register={register}
            error={(errors as any).recipient?.state}
            maxLength={2}
            placeholder="CA"
            required
          />

          <FormField
            label="ZIP Code"
            name="recipient.zipCode"
            register={register}
            error={(errors as any).recipient?.zipCode}
            placeholder="12345 or 12345-6789"
            required
          />
        </div>
      </div>
    </>
  )
}

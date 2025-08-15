
import { FieldError, UseFormRegister } from 'react-hook-form'

interface FormFieldProps {
  label: string
  name: string
  type?: string
  register: UseFormRegister<any>
  error?: FieldError
  helpText?: string
  required?: boolean
  step?: string
  maxLength?: number
  placeholder?: string
}

export function FormField({
  label,
  name,
  type = 'text',
  register,
  error,
  helpText,
  required = false,
  step,
  maxLength,
  placeholder
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        step={step}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`form-input ${error ? 'border-red-500' : ''}`}
        {...register(name, { valueAsNumber: type === 'number' })}
      />
      {error && (
        <p className="form-error">{error.message}</p>
      )}
      {helpText && !error && (
        <p className="help-text">{helpText}</p>
      )}
    </div>
  )
}

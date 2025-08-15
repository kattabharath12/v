
import { z } from 'zod'

// Common validation helpers
const currencyAmount = z.number().min(0).max(999999999.99)
const taxId = z.string().regex(/^\d{2}-\d{7}$|^\d{3}-\d{2}-\d{4}$/, 'Invalid Tax ID format')
const zipCode = z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code')

// Base payer information schema
const payerInfoSchema = z.object({
  name: z.string().min(1, 'Payer name is required'),
  address: z.string().min(1, 'Payer address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  zipCode,
  taxId: taxId.optional(),
})

// Base recipient information schema
const recipientInfoSchema = z.object({
  name: z.string().min(1, 'Recipient name is required'),
  address: z.string().min(1, 'Recipient address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  zipCode,
  ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, 'Invalid SSN format'),
})

// 1099-NEC Schema
export const form1099NECSchema = z.object({
  payer: payerInfoSchema,
  recipient: recipientInfoSchema,
  nonemployeeCompensation: currencyAmount,
  federalIncomeTaxWithheld: currencyAmount.optional(),
  stateIncomeTaxWithheld: currencyAmount.optional(),
  state: z.string().length(2).optional(),
  stateIdNumber: z.string().optional(),
})

// 1099-MISC Schema
export const form1099MISCSchema = z.object({
  payer: payerInfoSchema,
  recipient: recipientInfoSchema,
  rents: currencyAmount.optional(),
  royalties: currencyAmount.optional(),
  otherIncome: currencyAmount.optional(),
  federalIncomeTaxWithheld: currencyAmount.optional(),
  fishingBoatProceeds: currencyAmount.optional(),
  medicalAndHealthCarePayments: currencyAmount.optional(),
  nonemployeeCompensation: currencyAmount.optional(),
  substitutePayments: currencyAmount.optional(),
  cropInsuranceProceeds: currencyAmount.optional(),
  grossProceedsToAttorney: currencyAmount.optional(),
  section409ADeferrals: currencyAmount.optional(),
  nonqualifiedDeferredCompensation: currencyAmount.optional(),
  stateIncomeTaxWithheld: currencyAmount.optional(),
  state: z.string().length(2).optional(),
  stateIdNumber: z.string().optional(),
  prizesAndAwards: currencyAmount.optional(),
})

// 1099-INT Schema
export const form1099INTSchema = z.object({
  payer: payerInfoSchema,
  recipient: recipientInfoSchema,
  interestIncome: currencyAmount,
  earlyWithdrawalPenalty: currencyAmount.optional(),
  interestOnUSSavingsBonds: currencyAmount.optional(),
  federalIncomeTaxWithheld: currencyAmount.optional(),
  investmentExpenses: currencyAmount.optional(),
  foreignTaxPaid: currencyAmount.optional(),
  foreignCountry: z.string().optional(),
  taxExemptInterest: currencyAmount.optional(),
  specifiedPrivateActivityBondInterest: currencyAmount.optional(),
  marketDiscount: currencyAmount.optional(),
  bondPremium: currencyAmount.optional(),
  bondPremiumOnTaxExemptBond: currencyAmount.optional(),
  cusipNumber: z.string().optional(),
  stateIncomeTaxWithheld: currencyAmount.optional(),
  state: z.string().length(2).optional(),
  stateIdNumber: z.string().optional(),
})

// 1099-DIV Schema
export const form1099DIVSchema = z.object({
  payer: payerInfoSchema,
  recipient: recipientInfoSchema,
  ordinaryDividends: currencyAmount,
  qualifiedDividends: currencyAmount.optional(),
  capitalGainDistributions: currencyAmount.optional(),
  unrecapturedSection1250Gain: currencyAmount.optional(),
  section1202Gain: currencyAmount.optional(),
  collectiblesGain: currencyAmount.optional(),
  nondividendDistributions: currencyAmount.optional(),
  federalIncomeTaxWithheld: currencyAmount.optional(),
  section199ADividends: currencyAmount.optional(),
  investmentExpenses: currencyAmount.optional(),
  foreignTaxPaid: currencyAmount.optional(),
  foreignCountry: z.string().optional(),
  cashLiquidationDistributions: currencyAmount.optional(),
  noncashLiquidationDistributions: currencyAmount.optional(),
  exemptInterestDividends: currencyAmount.optional(),
  specifiedPrivateActivityBondInterestDividends: currencyAmount.optional(),
  stateIncomeTaxWithheld: currencyAmount.optional(),
  state: z.string().length(2).optional(),
  stateIdNumber: z.string().optional(),
})

// 1099-B Schema
export const form1099BSchema = z.object({
  payer: payerInfoSchema,
  recipient: recipientInfoSchema,
  proceedsFromBroker: currencyAmount,
  costOrOtherBasis: currencyAmount.optional(),
  federalIncomeTaxWithheld: currencyAmount.optional(),
  description: z.string().min(1, 'Security description is required'),
  dateAcquired: z.string().optional(),
  dateSold: z.string().min(1, 'Date sold is required'),
  shortTermGainLoss: z.boolean().optional(),
  longTermGainLoss: z.boolean().optional(),
  ordinaryIncome: z.boolean().optional(),
  stateIncomeTaxWithheld: currencyAmount.optional(),
  state: z.string().length(2).optional(),
  stateIdNumber: z.string().optional(),
})

// 1099-R Schema
export const form1099RSchema = z.object({
  payer: payerInfoSchema,
  recipient: recipientInfoSchema,
  grossDistribution: currencyAmount,
  taxableAmount: currencyAmount.optional(),
  federalIncomeTaxWithheld: currencyAmount.optional(),
  distributionCode: z.string().length(1, 'Distribution code must be 1 character'),
  netUnrealizedAppreciation: currencyAmount.optional(),
  employeeContributions: currencyAmount.optional(),
  pensionAnnuityGross: currencyAmount.optional(),
  pensionAnnuityTaxable: currencyAmount.optional(),
  stateIncomeTaxWithheld: currencyAmount.optional(),
  state: z.string().length(2).optional(),
  stateIdNumber: z.string().optional(),
})

// 1099-G Schema
export const form1099GSchema = z.object({
  payer: payerInfoSchema,
  recipient: recipientInfoSchema,
  unemploymentCompensation: currencyAmount.optional(),
  stateIncomeTaxRefund: currencyAmount.optional(),
  reemploymentTradeAdjustmentAssistance: currencyAmount.optional(),
  taxableGrants: currencyAmount.optional(),
  agriculturePayments: currencyAmount.optional(),
  marketGainOnRepayment: currencyAmount.optional(),
  federalIncomeTaxWithheld: currencyAmount.optional(),
  stateIncomeTaxWithheld: currencyAmount.optional(),
  state: z.string().length(2).optional(),
  stateIdNumber: z.string().optional(),
})

// 1099-K Schema
export const form1099KSchema = z.object({
  payer: payerInfoSchema,
  recipient: recipientInfoSchema,
  grossAmount: currencyAmount,
  cardNotPresentTransactions: currencyAmount.optional(),
  merchantCategoryCode: z.string().optional(),
  numberOfPaymentTransactions: z.number().int().min(0).optional(),
  federalIncomeTaxWithheld: currencyAmount.optional(),
  stateIncomeTaxWithheld: currencyAmount.optional(),
  state: z.string().length(2).optional(),
  stateIdNumber: z.string().optional(),
})

// Export all schemas
export const FORM_SCHEMAS = {
  'NEC': form1099NECSchema,
  'MISC': form1099MISCSchema,
  'INT': form1099INTSchema,
  'DIV': form1099DIVSchema,
  'B': form1099BSchema,
  'R': form1099RSchema,
  'G': form1099GSchema,
  'K': form1099KSchema,
}

export type Form1099NECData = z.infer<typeof form1099NECSchema>
export type Form1099MISCData = z.infer<typeof form1099MISCSchema>
export type Form1099INTData = z.infer<typeof form1099INTSchema>
export type Form1099DIVData = z.infer<typeof form1099DIVSchema>
export type Form1099BData = z.infer<typeof form1099BSchema>
export type Form1099RData = z.infer<typeof form1099RSchema>
export type Form1099GData = z.infer<typeof form1099GSchema>
export type Form1099KData = z.infer<typeof form1099KSchema>

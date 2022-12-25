import { validateCPF } from 'validations-br'

import { validateZipCode } from '@common/services/validationsServices'

export const customValidatePhone = (phone: string) => {
  if (!phone) return false
  const regex = /^([1-9]{2})(?:[1-9])(\d{3,4})(\d{4})$/g
  return regex.test(String(phone))
}

export const customValidateTaxpayer = (cpf: string) => {
  if (!cpf) return false
  return validateCPF(cpf)
}

export const customValidateZipCode = async (zipCode: string) => {
  if (!zipCode || zipCode.length < 8) return
  const { data } = await validateZipCode(zipCode)
  return data
}

import { isValid } from 'date-fns'
import { validateCPF } from 'validations-br'

import { validateZipCode } from '@common/services/validationsServices'

export const customValidatePhone = (phone: string, phoneType: 'celPhone' | 'phone' | 'both') => {
  if (!phone) return false
  const regexCelPhone = /^([1-9]{2})(?:[1-9])(\d{4})(\d{4})$/g
  const regexPhone = /^([1-9]{2})(?:[1-9])(\d{3})(\d{4})$/g
  if (phoneType === 'both') {
    return regexCelPhone.test(String(phone)) || regexPhone.test(String(phone))
  }
  return phoneType === 'celPhone' ? regexCelPhone.test(String(phone)) : regexPhone.test(String(phone))
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

export const customValidateDate = (date: number) => {
  if (!date) return false
  return isValid(date)
}

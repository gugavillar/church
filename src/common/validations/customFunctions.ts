import { isValid } from 'date-fns'
import { validateCPF } from 'validations-br'

import { validateZipCode } from '@common/services/validationsServices'

export const customValidatePhone = (phone: string, phoneType: 'celPhone' | 'phone' | 'both') => {
  if (!phone) return false
  const numberPhone = phone.replace(/\D/g, '')
  const regexCelPhone = /^([1-9]{2})(?:[1-9])(\d{4})(\d{4})$/g
  const regexPhone = /^([1-9]{2})(?:[1-9])(\d{3})(\d{4})$/g
  if (phoneType === 'both') {
    return regexCelPhone.test(String(numberPhone)) || regexPhone.test(String(numberPhone))
  }
  return phoneType === 'celPhone' ? regexCelPhone.test(String(numberPhone)) : regexPhone.test(String(numberPhone))
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

export const customValidateDate = (date: string) => {
  if (!date || date?.length < 10) return false
  const [day, month, year] = date.split('/')
  const timestampDate = new Date(`${year}-${month}-${day}`).setHours(24, 0, 0)
  return isValid(timestampDate)
}

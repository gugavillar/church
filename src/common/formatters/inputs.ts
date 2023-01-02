import { ChangeEvent } from 'react'
import { UseFormSetValue } from 'react-hook-form'

export const fieldFormatCelPhone = (value: string) => {
  if (!value) return null
  return value
    .replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/^\((\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}

export const fieldFormatPhone = (value: string) => {
  if (!value) return null
  return value
    .replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/^\((\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d{1,4})/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}

export const fieldFormatZipCode = (value: string) => {
  if (!value) return null
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1')
}

export const fieldFormatTaxpayer = (value: string) => {
  if (!value) return null
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/(\.\d{3})(\d)/, '$1.$2')
    .replace(/(\.\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const fieldFormatDate = (value: string) => {
  if (!value) return null
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{4})\d+?$/, '$1')
}

export const fieldFormatToNumberForSendToAPI = (value: string) => (!value ? null : Number(value?.replace(/\D/g, '')))

type InputRegisterOptionsPhoneOrZipCodeOrTaxpayerOrDate = (
  name: string,
  setValue: UseFormSetValue<any>
) => {
  onChange: (event: ChangeEvent<HTMLInputElement>) => any
}

export const phoneInputRegisterOptions: InputRegisterOptionsPhoneOrZipCodeOrTaxpayerOrDate = (name, setValue) => ({
  onChange: (event: ChangeEvent<HTMLInputElement>) =>
    event?.target?.value?.length >= 15
      ? setValue(name, fieldFormatCelPhone(event.target.value))
      : setValue(name, fieldFormatPhone(event.target.value))
})

export const taxpayerInputRegisterOptions: InputRegisterOptionsPhoneOrZipCodeOrTaxpayerOrDate = (name, setValue) => ({
  onChange: (event: ChangeEvent<HTMLInputElement>) => setValue(name, fieldFormatTaxpayer(event.target.value))
})

export const zipCodeInputRegisterOptions: InputRegisterOptionsPhoneOrZipCodeOrTaxpayerOrDate = (name, setValue) => ({
  onChange: (event: ChangeEvent<HTMLInputElement>) => setValue(name, fieldFormatZipCode(event.target.value))
})

export const dateInputRegisterOptions: InputRegisterOptionsPhoneOrZipCodeOrTaxpayerOrDate = (name, setValue) => ({
  onChange: (event: ChangeEvent<HTMLInputElement>) => setValue(name, fieldFormatDate(event.target.value))
})

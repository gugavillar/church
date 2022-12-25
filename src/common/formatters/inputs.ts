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

type InputRegisterOptionsPhoneOrZipCodeOrTaxpayer = (
  name: string,
  setValue: UseFormSetValue<any>,
  phoneType?: 'celPhone' | 'phone'
) => {
  onChange: (event: ChangeEvent<HTMLInputElement>) => any
  setValueAs: (value: string) => number | null
}

export const phoneInputRegisterOptions: InputRegisterOptionsPhoneOrZipCodeOrTaxpayer = (name, setValue, phoneType) => ({
  onChange: (event: ChangeEvent<HTMLInputElement>) =>
    phoneType === 'celPhone'
      ? setValue(name, fieldFormatCelPhone(event.target.value))
      : setValue(name, fieldFormatPhone(event.target.value)),
  setValueAs: (value: string) => (!value ? null : Number(value?.replace(/\D/g, '')))
})

export const taxpayerInputRegisterOptions: InputRegisterOptionsPhoneOrZipCodeOrTaxpayer = (name, setValue) => ({
  onChange: (event: ChangeEvent<HTMLInputElement>) => setValue(name, fieldFormatTaxpayer(event.target.value)),
  setValueAs: (value: string) => (!value ? null : Number(value?.replace(/\D/g, '')))
})

export const zipCodeInputRegisterOptions: InputRegisterOptionsPhoneOrZipCodeOrTaxpayer = (name, setValue) => ({
  onChange: (event: ChangeEvent<HTMLInputElement>) => setValue(name, fieldFormatZipCode(event.target.value)),
  setValueAs: (value) => (!value ? null : Number(value?.replace(/\D/g, '')))
})

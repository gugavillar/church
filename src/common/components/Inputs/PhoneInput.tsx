import { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'

import { Input } from '@chakra-ui/react'

import { fieldFormatCelPhone, fieldFormatPhone } from '@common/formatters/inputs'

import { InputController } from './InputController'

type PhoneInputProps = {
  name: string
  label: string
  phoneType: 'celPhone' | 'phone'
}

export const PhoneInput = ({ name, label, phoneType }: PhoneInputProps) => {
  const {
    register,
    setValue,
    formState: { errors, isValid }
  } = useFormContext()

  return (
    <InputController
      errorMessage={errors[name]?.message as string}
      isError={isValid}
      label={label}
    >
      <Input
        type='text'
        {...register(name, {
          onChange: (event: ChangeEvent<HTMLInputElement>) =>
            phoneType === 'celPhone'
              ? setValue(name, fieldFormatCelPhone(event.target.value))
              : setValue(name, fieldFormatPhone(event.target.value)),
          setValueAs: (value) => Number(value?.replace(/\D/g, ''))
        })}
      />
    </InputController>
  )
}

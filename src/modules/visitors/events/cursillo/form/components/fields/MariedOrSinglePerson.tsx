import { useEffect } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormUnregister, UseFormWatch } from 'react-hook-form'

import { CLOSE_RELATIVE, MARITAL_STATUS } from '@common/constants'

import { NewCursilhistForm } from '../..'
import { CloseRelative } from './CloseRelative'
import { SpouseData } from './SpouseData'

type MarriedOrSinglePersonProps = {
  errors: FieldErrors<NewCursilhistForm>
  register: UseFormRegister<NewCursilhistForm>
  setValue: UseFormSetValue<NewCursilhistForm>
  unregister: UseFormUnregister<NewCursilhistForm>
  watch: UseFormWatch<NewCursilhistForm>
}

export const MarriedOrSinglePerson = ({
  register,
  errors,
  setValue,
  unregister,
  watch
}: MarriedOrSinglePersonProps) => {
  const maritalStatus = watch('maritalStatus')

  const isMarriedPerson =
    Boolean(maritalStatus) && CLOSE_RELATIVE?.includes(maritalStatus as typeof MARITAL_STATUS[number]['value'])

  useEffect(() => {
    if (CLOSE_RELATIVE?.includes(maritalStatus as typeof MARITAL_STATUS[number]['value'])) {
      unregister('closeRelative')
    } else {
      unregister('spouse')
    }
  }, [maritalStatus, setValue, unregister])

  return isMarriedPerson ? (
    <SpouseData
      register={register}
      errors={errors}
      setValue={setValue}
    />
  ) : (
    <CloseRelative
      register={register}
      errors={errors}
      setValue={setValue}
    />
  )
}

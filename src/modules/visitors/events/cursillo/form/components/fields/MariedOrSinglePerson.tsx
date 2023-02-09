import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { CLOSE_RELATIVE, MARITAL_STATUS } from '@common/constants'

import { NewCursilhistForm } from '../..'
import { CloseRelative } from './CloseRelative'
import { SpouseData } from './SpouseData'

export const MarriedOrSinglePerson = () => {
  const {
    register,
    setValue,
    unregister,
    watch,
    formState: { errors }
  } = useFormContext<NewCursilhistForm>()
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

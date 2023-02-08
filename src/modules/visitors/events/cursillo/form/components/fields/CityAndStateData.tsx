import { Fragment, useEffect } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { Select } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { BRAZILIAN_STATES } from '@common/constants'
import { useCities } from '@common/hooks/useCities'

import { NewCursilhistForm } from '../..'

type CityAndStateDataProps = {
  errors: FieldErrors<NewCursilhistForm>
  register: UseFormRegister<NewCursilhistForm>
  watch: UseFormWatch<NewCursilhistForm>
  setValue: UseFormSetValue<NewCursilhistForm>
  cityFromAPI: string
}

export const CityAndStateData = ({ errors, register, watch, setValue, cityFromAPI }: CityAndStateDataProps) => {
  const state = watch('state')

  const { citiesFromUF, isLoadingCities, handleGetCities } = useCities(
    state as typeof BRAZILIAN_STATES[number]['value']
  )

  useEffect(() => {
    Boolean(citiesFromUF?.length) && setValue('city', cityFromAPI, { shouldValidate: true, shouldDirty: true })
  }, [citiesFromUF?.length, setValue, cityFromAPI])

  return (
    <Fragment>
      <FieldController
        error={errors?.state?.message as string}
        label='Estado'
        isRequired
        maxW={{ base: 'full', md: 24, lg: 24 }}
      >
        <Select
          placeholder='UF'
          {...register('state')}
          onChange={(event) => handleGetCities(event.target.value as typeof BRAZILIAN_STATES[number]['value'])}
        >
          {BRAZILIAN_STATES.map((state) => (
            <option
              key={state.value}
              value={state.value}
            >
              {state.label}
            </option>
          ))}
        </Select>
      </FieldController>
      <FieldController
        error={errors?.city?.message as string}
        label='Cidade'
        isRequired
      >
        <Select
          placeholder={isLoadingCities ? 'Carregando...' : 'Cidade'}
          {...register('city')}
          isDisabled={isLoadingCities}
        >
          {citiesFromUF.map((city) => (
            <option
              key={city.value}
              value={city.value}
            >
              {city.label}
            </option>
          ))}
        </Select>
      </FieldController>
    </Fragment>
  )
}

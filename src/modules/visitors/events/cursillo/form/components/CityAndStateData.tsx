import { useCallback, useState, Fragment, useEffect } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Select, useToast } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { BRAZILIAN_STATES, ERROR_TOAST } from '@common/constants'
import { getCities, GetCitiesReturn } from '@common/services'

import { NewCursilhistForm } from '..'

type CityAndStateDataProps = {
  errors: FieldErrors<NewCursilhistForm>
  register: UseFormRegister<NewCursilhistForm>
  watchState: typeof BRAZILIAN_STATES[number]['value'] | ''
  setValue: UseFormSetValue<NewCursilhistForm>
  cityFromAPI: string
}

export const CityAndStateData = ({ errors, register, watchState, setValue, cityFromAPI }: CityAndStateDataProps) => {
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [citiesFromUF, setCitiesFromUF] = useState<Array<GetCitiesReturn>>([])

  const toast = useToast()

  const handleGetCities = useCallback(
    async (uf: string) => {
      setIsLoadingCities(true)
      try {
        const response = await getCities(uf)
        setCitiesFromUF(response)
      } catch {
        toast({
          ...ERROR_TOAST,
          title: 'Ocorreu uma falha',
          description: 'Falha ao carregar as cidades'
        })
      } finally {
        setIsLoadingCities(false)
      }
    },
    [toast]
  )

  useEffect(() => {
    watchState && handleGetCities(watchState)
  }, [handleGetCities, watchState])

  useEffect(() => {
    citiesFromUF?.length && setValue('city', cityFromAPI)
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
          onChange={(event) => handleGetCities(event.target.value)}
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

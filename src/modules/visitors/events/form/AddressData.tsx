import { useState } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Box, Flex, Input, Select, useToast } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { BRAZILIAN_STATES, ERROR_TOAST } from '@common/constants'
import { zipCodeInputRegisterOptions } from '@common/formatters'
import { getCities, GetCitiesReturn } from '@common/services'

import { NewCursilhistForm } from './NewCursilhist'

type AddressDataProps = {
  errors: FieldErrors
  register: UseFormRegister<NewCursilhistForm>
  setValue: UseFormSetValue<NewCursilhistForm>
}

export const AddressData = ({ errors, register, setValue }: AddressDataProps) => {
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [citiesFromUF, setCitiesFromUF] = useState<Array<GetCitiesReturn>>([])

  const toast = useToast()

  const handleGetCities = async (uf: string) => {
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
  }

  return (
    <Box mt={6}>
      <Flex
        gap={8}
        direction={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <FieldController
          error={errors?.name?.message as string}
          label='CEP'
          maxW={{ base: 'full', md: 48, lg: 48 }}
          isRequired
        >
          <Input
            type='text'
            {...register('zipCode', { ...zipCodeInputRegisterOptions('zipCode', setValue) })}
          />
        </FieldController>
        <FieldController
          error={errors?.street?.message as string}
          label='Endereço'
          isRequired
        >
          <Input
            type='text'
            {...register('street')}
          />
        </FieldController>
      </Flex>
      <Flex
        gap={8}
        mt={6}
        direction={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <FieldController
          error={errors?.neighborhood?.message as string}
          label='Bairro'
          isRequired
        >
          <Input
            type='text'
            {...register('neighborhood')}
          />
        </FieldController>
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
      </Flex>
      <FieldController
        error={errors?.neighborhood?.message as string}
        label='Ponto de referência'
        mt={6}
      >
        <Input
          type='text'
          {...register('referencePoint')}
        />
      </FieldController>
    </Box>
  )
}

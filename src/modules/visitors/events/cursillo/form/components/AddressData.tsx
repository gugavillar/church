import { useCallback, useState } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Box, Flex, Input, useToast } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { BRAZILIAN_STATES, ERROR_TOAST } from '@common/constants'
import { zipCodeInputRegisterOptions } from '@common/formatters'
import { getAddressFromZipCode } from '@common/services'

import { NewCursilhistForm } from '..'
import { CityAndStateData } from './CityAndStateData'

type AddressDataProps = {
  errors: FieldErrors<NewCursilhistForm>
  register: UseFormRegister<NewCursilhistForm>
  setValue: UseFormSetValue<NewCursilhistForm>
  watchState: typeof BRAZILIAN_STATES[number]['value'] | undefined
}

export const AddressData = ({ errors, register, setValue, watchState }: AddressDataProps) => {
  const [cityFromAPI, setCityFromAPI] = useState('')

  const toast = useToast()

  const handleGetAddressData = useCallback(
    async (zipCode: string) => {
      if (zipCode.length < 9) return
      const formatZipCode = zipCode.replace(/-/, '')
      try {
        const response = await getAddressFromZipCode(formatZipCode)
        if (response.error) {
          return toast({
            ...ERROR_TOAST,
            title: 'Cep não encontrado',
            description: 'Caso esteja correto preencher os dados manualmente'
          })
        }
        setCityFromAPI(response?.city)
        setValue('state', response?.state, { shouldValidate: true })
        setValue('street', response?.street, { shouldValidate: true })
        setValue('neighborhood', response?.neighborhood, { shouldValidate: true })
      } catch {
        toast({
          ...ERROR_TOAST,
          title: 'Ocorreu uma falha',
          description: 'Falha ao pegar os dados do cep'
        })
      }
    },
    [setValue, toast]
  )

  return (
    <Box mt={6}>
      <Flex
        gap={{ base: 6, md: 8, lg: 8 }}
        direction={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <FieldController
          error={errors?.zipCode?.message as string}
          label='CEP'
          maxW={{ base: 'full', md: 48, lg: 48 }}
          isRequired
        >
          <Input
            type='text'
            {...register('zipCode', { ...zipCodeInputRegisterOptions('zipCode', setValue) })}
            onBlur={(event) => handleGetAddressData(event.target.value)}
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
        <FieldController
          error={errors?.number?.message as string}
          label='N˚'
          isRequired
          maxW={{ base: 'full', md: 32, lg: 32 }}
        >
          <Input
            type='text'
            {...register('number')}
          />
        </FieldController>
      </Flex>
      <Flex
        gap={{ base: 6, md: 8, lg: 8 }}
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
        <CityAndStateData
          register={register}
          errors={errors}
          watchState={watchState}
          setValue={setValue}
          cityFromAPI={cityFromAPI}
        />
      </Flex>
      <FieldController
        error={errors?.referencePoint?.message as string}
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

import { useEffect } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { Box, Flex, Input } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { zipCodeInputRegisterOptions } from '@common/formatters'
import { useAddress } from '@common/hooks/useAddress'

import { NewCursilhistForm } from '../..'
import { CityAndStateData } from './CityAndStateData'

type AddressDataProps = {
  errors: FieldErrors<NewCursilhistForm>
  register: UseFormRegister<NewCursilhistForm>
  setValue: UseFormSetValue<NewCursilhistForm>
  watch: UseFormWatch<NewCursilhistForm>
  cityFromReducer: string
}

export const AddressData = ({ errors, register, setValue, watch, cityFromReducer }: AddressDataProps) => {
  const { addressResponse, handleGetAddressData } = useAddress()

  useEffect(() => {
    if (addressResponse) {
      setValue('state', addressResponse?.state, { shouldValidate: true })
      setValue('street', addressResponse?.street, { shouldValidate: true })
      setValue('neighborhood', addressResponse?.neighborhood, { shouldValidate: true })
      setValue('city', addressResponse?.city, { shouldValidate: true })
    }
  }, [addressResponse, setValue])

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
          watch={watch}
          setValue={setValue}
          cityFromAPI={addressResponse?.city ?? cityFromReducer}
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

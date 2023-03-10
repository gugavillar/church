import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { Box, Flex, Input } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { zipCodeInputRegisterOptions } from '@common/formatters'
import { useAddress } from '@common/hooks/useAddress'

import { NewCursilhistForm } from '../Form'
import { CityAndStateData } from './CityAndStateData'

export const AddressData = () => {
  const {
    register,
    setValue,
    formState: { errors }
  } = useFormContext<NewCursilhistForm>()
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
            {...register('zipCode', {
              ...zipCodeInputRegisterOptions('zipCode', setValue),
              onBlur: (event) => handleGetAddressData(event?.target?.value)
            })}
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
        <CityAndStateData />
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

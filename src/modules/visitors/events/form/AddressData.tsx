import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Box, Flex, Input } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { zipCodeInputRegisterOptions } from '@common/formatters'

import { CityAndStateData } from './CityAndStateData'
import { NewCursilhistForm } from './NewCursilhist'

type AddressDataProps = {
  errors: FieldErrors<NewCursilhistForm>
  register: UseFormRegister<NewCursilhistForm>
  setValue: UseFormSetValue<NewCursilhistForm>
}

export const AddressData = ({ errors, register, setValue }: AddressDataProps) => {
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
        <CityAndStateData
          register={register}
          errors={errors}
        />
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

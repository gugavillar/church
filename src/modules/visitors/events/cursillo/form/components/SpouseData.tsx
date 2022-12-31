import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Flex, Input } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { phoneInputRegisterOptions } from '@common/formatters'

import { NewCursilhistForm } from '..'

type SpouseDataProps = {
  errors: FieldErrors<NewCursilhistForm>
  register: UseFormRegister<NewCursilhistForm>
  setValue: UseFormSetValue<NewCursilhistForm>
}

export const SpouseData = ({ errors, register, setValue }: SpouseDataProps) => {
  return (
    <Flex
      gap={{ base: 6, md: 8, lg: 8 }}
      mt={6}
      direction={{ base: 'column', md: 'row', lg: 'row' }}
    >
      <FieldController
        error={errors?.spouse?.name?.message as string}
        label='Cônjuge'
        isRequired
      >
        <Input
          type='text'
          {...register('spouse.name')}
        />
      </FieldController>
      <FieldController
        error={errors?.spouse?.phone?.message as string}
        label='Celular'
        isRequired
        maxW={{ base: 'full', md: 56, lg: 56 }}
      >
        <Input
          type='text'
          {...register('spouse.phone', { ...phoneInputRegisterOptions('spouse.phone', setValue) })}
        />
      </FieldController>
      <FieldController
        error={errors?.spouse?.numberOfChildren?.message as string}
        label='N˚ de filhos'
        isRequired
        maxW={{ base: 'full', md: 36, lg: 36 }}
      >
        <Input
          type='number'
          min={0}
          {...register('spouse.numberOfChildren', { valueAsNumber: true })}
        />
      </FieldController>
    </Flex>
  )
}

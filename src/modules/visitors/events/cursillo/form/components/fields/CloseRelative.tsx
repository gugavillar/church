import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Flex, Input } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { phoneInputRegisterOptions } from '@common/formatters'

import { NewCursilhistForm } from '../Form'

type SpouseDataProps = {
  errors: FieldErrors<NewCursilhistForm>
  register: UseFormRegister<NewCursilhistForm>
  setValue: UseFormSetValue<NewCursilhistForm>
}

export const CloseRelative = ({ errors, register, setValue }: SpouseDataProps) => {
  return (
    <Flex
      gap={{ base: 6, md: 8, lg: 8 }}
      mt={6}
      direction={{ base: 'column', md: 'row', lg: 'row' }}
    >
      <FieldController
        error={errors?.closeRelative?.name?.message as string}
        label='Nome do parente próximo'
        isRequired
      >
        <Input
          type='text'
          {...register('closeRelative.name')}
        />
      </FieldController>
      <FieldController
        error={errors?.closeRelative?.phone?.message as string}
        label='Celular'
        isRequired
        maxW={{ base: 'full', md: 56, lg: 56 }}
      >
        <Input
          type='text'
          {...register('closeRelative.phone', {
            ...phoneInputRegisterOptions('closeRelative.phone', setValue)
          })}
        />
      </FieldController>
    </Flex>
  )
}

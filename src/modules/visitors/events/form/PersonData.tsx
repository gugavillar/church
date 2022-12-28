import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Flex, Input, Box, Select } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { MARITAL_STATUS } from '@common/constants'
import { dateInputRegisterOptions, taxpayerInputRegisterOptions, phoneInputRegisterOptions } from '@common/formatters'

import { NewCursilhistForm } from './NewCursilhist'

type PersonDataProps = {
  errors: FieldErrors
  register: UseFormRegister<NewCursilhistForm>
  setValue: UseFormSetValue<NewCursilhistForm>
}

export const PersonData = ({ errors, register, setValue }: PersonDataProps) => {
  return (
    <Box>
      <Flex
        gap={8}
        direction={{ base: 'column', md: 'column', lg: 'row' }}
      >
        <FieldController
          error={errors?.name?.message as string}
          label='Nome'
          isRequired
        >
          <Input
            type='text'
            {...register('name')}
          />
        </FieldController>
        <FieldController
          error={errors?.likeToBeCalled?.message as string}
          label='Como gostaria de ser chamado(a)'
          isRequired
        >
          <Input
            type='text'
            {...register('likeToBeCalled')}
          />
        </FieldController>
      </Flex>
      <Flex
        gap={8}
        mt={6}
        direction={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <FieldController
          error={errors?.taxpayer?.message as string}
          label='CPF'
          maxW={{ base: 'full', md: 'full', lg: 80 }}
          isRequired
        >
          <Input
            type='text'
            {...register('taxpayer', { ...taxpayerInputRegisterOptions('taxpayer', setValue) })}
          />
        </FieldController>
        <FieldController
          error={errors?.birthDate?.message as string}
          label='Data de nascimento'
          maxW={{ base: 'full', md: 'full', lg: 80 }}
          isRequired
          minW={{ base: 'full', md: 60, lg: 60 }}
        >
          <Input
            type='text'
            {...register('birthDate', { ...dateInputRegisterOptions('birthDate', setValue) })}
          />
        </FieldController>
        <FieldController
          error={errors?.phone?.message as string}
          label='Telefone'
          maxW={{ base: 'full', md: 'full', lg: 80 }}
          isRequired
        >
          <Input
            type='text'
            {...register('phone', { ...phoneInputRegisterOptions('phone', setValue, 'celPhone') })}
          />
        </FieldController>
      </Flex>
      <Flex
        gap={8}
        mt={6}
        direction={{ base: 'column', md: 'column', lg: 'row' }}
      >
        <FieldController
          error={errors?.email?.message as string}
          label='Email'
          isRequired
        >
          <Input
            type='email'
            {...register('email')}
          />
        </FieldController>
        <FieldController
          error={errors?.email?.message as string}
          label='Estado civil'
          isRequired
        >
          <Select
            {...register('maritalStatus')}
            placeholder='Estado civil'
          >
            {MARITAL_STATUS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </Select>
        </FieldController>
      </Flex>
    </Box>
  )
}

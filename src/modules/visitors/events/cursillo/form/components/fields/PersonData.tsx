import { useFormContext } from 'react-hook-form'

import { Flex, Input, Box, Select } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { Gender } from '@common/@types'
import { MARITAL_STATUS } from '@common/constants'
import { dateInputRegisterOptions, phoneInputRegisterOptions } from '@common/formatters'

import { NewCursilhistForm } from '../..'

type PersonDataProps = {
  gender: Gender
}

export const PersonData = ({ gender }: PersonDataProps) => {
  const {
    register,
    setValue,
    formState: { errors }
  } = useFormContext<NewCursilhistForm>()
  return (
    <Box>
      <Flex
        gap={{ base: 6, md: 8, lg: 8 }}
        direction={{ base: 'column', md: 'column', lg: 'row' }}
      >
        <FieldController
          error={errors?.name?.message as string}
          label='Nome completo'
          isRequired
        >
          <Input
            type='text'
            {...register('name')}
          />
        </FieldController>
        <FieldController
          error={errors?.likeToBeCalled?.message as string}
          label={`Como gostaria de ser ${gender === 'masculino' ? 'chamado' : 'chamada'}`}
          isRequired
        >
          <Input
            type='text'
            {...register('likeToBeCalled')}
          />
        </FieldController>
      </Flex>
      <Flex
        gap={{ base: 6, md: 8, lg: 8 }}
        mt={6}
        direction={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <FieldController
          error={errors?.birthDate?.message as string}
          label='Data de nascimento'
          isRequired
        >
          <Input
            type='text'
            {...register('birthDate', { ...dateInputRegisterOptions('birthDate', setValue) })}
          />
        </FieldController>
        <FieldController
          error={errors?.phone?.message as string}
          label='Celular'
          isRequired
        >
          <Input
            type='text'
            {...register('phone', { ...phoneInputRegisterOptions('phone', setValue) })}
          />
        </FieldController>
      </Flex>
      <Flex
        gap={{ base: 6, md: 8, lg: 8 }}
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
          error={errors?.maritalStatus?.message as string}
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

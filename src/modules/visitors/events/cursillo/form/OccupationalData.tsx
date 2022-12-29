import { Fragment } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Flex, Select, Input } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { EDUCATION_LEVEL, OCCUPATIONS } from '@common/constants'
import { phoneInputRegisterOptions } from '@common/formatters'

import { NewCursilhistForm } from '.'

type OccupationalDataProps = {
  errors: FieldErrors<NewCursilhistForm>
  register: UseFormRegister<NewCursilhistForm>
  setValue: UseFormSetValue<NewCursilhistForm>
}

export const OccupationalData = ({ errors, register, setValue }: OccupationalDataProps) => {
  return (
    <Fragment>
      <Flex
        gap={8}
        mt={6}
        direction={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <FieldController
          error={errors?.education?.message as string}
          label='Escolaridade'
        >
          <Select
            placeholder='Escolaridade'
            {...register('education')}
          >
            {EDUCATION_LEVEL.map((education) => (
              <option
                key={education.value}
                value={education.value}
              >
                {education.label}
              </option>
            ))}
          </Select>
        </FieldController>
        <FieldController
          error={errors?.occupation?.message as string}
          label='Profissão'
        >
          <Select
            placeholder='Profissão'
            {...register('occupation')}
          >
            {OCCUPATIONS.map((occupation) => (
              <option
                key={occupation.value}
                value={occupation.value}
              >
                {occupation.label}
              </option>
            ))}
          </Select>
        </FieldController>
      </Flex>
      <Flex
        gap={8}
        mt={6}
        direction={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <FieldController
          error={errors?.workplace?.message as string}
          label='Local de trabalho'
        >
          <Input
            type='text'
            {...register('workplace')}
          />
        </FieldController>
        <FieldController
          error={errors?.workplacePhone?.message as string}
          label='Telefone do trabalho'
          maxW={{ base: 'full', md: 60, lg: 60 }}
        >
          <Input
            type='text'
            {...register('workplacePhone', { ...phoneInputRegisterOptions('workplacePhone', setValue, 'phone') })}
          />
        </FieldController>
      </Flex>
    </Fragment>
  )
}

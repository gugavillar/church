import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { Flex, Input } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { NewCursilhistForm } from '..'

type ReligionDataProps = {
  errors: FieldErrors<NewCursilhistForm>
  register: UseFormRegister<NewCursilhistForm>
}

export const ReligionData = ({ errors, register }: ReligionDataProps) => {
  return (
    <Flex
      gap={{ base: 6, md: 8, lg: 8 }}
      mt={6}
      direction={{ base: 'column', md: 'row', lg: 'row' }}
    >
      <FieldController
        error={errors?.religion?.message as string}
        label='Qual a sua religião'
        isRequired
      >
        <Input
          type='text'
          {...register('religion')}
        />
      </FieldController>
      <FieldController
        error={errors?.church?.message as string}
        label='Igreja que frequenta atualmente'
        isRequired
      >
        <Input
          type='text'
          {...register('church')}
        />
      </FieldController>
    </Flex>
  )
}

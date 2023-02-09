import { useFormContext } from 'react-hook-form'

import { Textarea } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { NewCursilhistForm } from '../Form'

export const WishData = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<NewCursilhistForm>()
  return (
    <FieldController
      error={errors?.wish?.message as string}
      label='Porque deseja fazer o cursilho'
      mt={6}
      isRequired
    >
      <Textarea {...register('wish')} />
    </FieldController>
  )
}

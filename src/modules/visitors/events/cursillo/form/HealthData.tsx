import { Fragment, useEffect } from 'react'
import { Control, Controller, FieldErrors, UseFormRegister, UseFormUnregister } from 'react-hook-form'

import { Flex, Input, RadioGroup, Radio, Textarea } from '@chakra-ui/react'

import { FieldController, IfComponent } from '@common/components'

import { NewCursilhistForm } from '.'

type HealthDataProps = {
  errors: FieldErrors<NewCursilhistForm>
  register: UseFormRegister<NewCursilhistForm>
  control: Control<NewCursilhistForm>
  hasDietOuFoodRestriction: 'true' | 'false'
  unregister: UseFormUnregister<NewCursilhistForm>
}

export const HealthData = ({ errors, register, control, hasDietOuFoodRestriction, unregister }: HealthDataProps) => {
  useEffect(() => {
    if (hasDietOuFoodRestriction === 'false') {
      unregister('dietOuFoodRestriction')
    }
  }, [hasDietOuFoodRestriction, unregister])
  return (
    <Fragment>
      <Flex
        mt={6}
        gap={8}
        direction={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <FieldController
          label='Problemas de saúde'
          error={errors?.healthProblems?.message as string}
        >
          <Input
            type='text'
            {...register('healthProblems')}
          />
        </FieldController>
        <FieldController
          label='Faz dieta ou restrição alimentar?'
          error={errors?.dietOuFoodRestriction?.message as string}
        >
          <Controller
            name='hasDietOuFoodRestriction'
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                colorScheme='gray'
              >
                <Flex
                  align='center'
                  gap={8}
                >
                  <Radio value='true'>Sim</Radio>
                  <Radio value='false'>Não</Radio>
                </Flex>
              </RadioGroup>
            )}
          />
        </FieldController>
      </Flex>
      <IfComponent
        conditional={hasDietOuFoodRestriction === 'true'}
        component={
          <FieldController
            label='Descreva'
            error={errors?.dietOuFoodRestriction?.message as string}
            mt={6}
          >
            <Textarea
              height={24}
              {...register('dietOuFoodRestriction')}
            />
          </FieldController>
        }
      />
    </Fragment>
  )
}

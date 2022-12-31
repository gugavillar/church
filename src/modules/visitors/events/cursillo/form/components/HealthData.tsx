import { Fragment, useEffect } from 'react'
import { Control, Controller, FieldErrors, UseFormRegister, UseFormUnregister } from 'react-hook-form'

import { Flex, Input, RadioGroup, Radio, Textarea } from '@chakra-ui/react'

import { FieldController, IfComponent } from '@common/components'

import { NewCursilhistForm } from '..'

type HealthDataProps = {
  errors: FieldErrors<NewCursilhistForm>
  register: UseFormRegister<NewCursilhistForm>
  control: Control<NewCursilhistForm>
  hasDietOrFoodRestriction?: '1' | '0'
  unregister: UseFormUnregister<NewCursilhistForm>
}

export const HealthData = ({ errors, register, control, hasDietOrFoodRestriction, unregister }: HealthDataProps) => {
  useEffect(() => {
    if (hasDietOrFoodRestriction === '0') {
      unregister('dietOrFoodRestriction')
    }
  }, [hasDietOrFoodRestriction, unregister])
  return (
    <Fragment>
      <Flex
        mt={6}
        gap={{ base: 6, md: 8, lg: 8 }}
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
          error={errors?.dietOrFoodRestriction?.message as string}
          isRequired
        >
          <Controller
            name='hasDietOrFoodRestriction'
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                colorScheme='gray'
              >
                <Flex
                  align='center'
                  gap={{ base: 6, md: 8, lg: 8 }}
                >
                  <Radio value='1'>Sim</Radio>
                  <Radio value='0'>Não</Radio>
                </Flex>
              </RadioGroup>
            )}
          />
        </FieldController>
      </Flex>
      <IfComponent
        conditional={hasDietOrFoodRestriction === '1'}
        component={
          <FieldController
            label='Descreva'
            error={errors?.dietOrFoodRestriction?.message as string}
            mt={6}
          >
            <Textarea
              height={24}
              {...register('dietOrFoodRestriction')}
            />
          </FieldController>
        }
      />
    </Fragment>
  )
}

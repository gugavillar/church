import { Fragment, useEffect } from 'react'
import { Control, Controller, FieldErrors, UseFormRegister, UseFormUnregister } from 'react-hook-form'

import { Flex, RadioGroup, Radio, Textarea } from '@chakra-ui/react'

import { FieldController, IfComponent } from '@common/components'

import { NewCursilhistForm } from '../..'

type HealthDataProps = {
  errors: FieldErrors<NewCursilhistForm>
  register: UseFormRegister<NewCursilhistForm>
  control: Control<NewCursilhistForm>
  hasDietOrFoodRestriction?: '1' | '0'
  hasHealthProblems?: '1' | '0'
  unregister: UseFormUnregister<NewCursilhistForm>
}

export const HealthData = ({
  errors,
  register,
  control,
  hasDietOrFoodRestriction,
  hasHealthProblems,
  unregister
}: HealthDataProps) => {
  useEffect(() => {
    if (hasDietOrFoodRestriction === '0') {
      unregister('dietOrFoodRestriction')
    }
    if (hasHealthProblems === '0') {
      unregister('healthProblems')
    }
  }, [hasDietOrFoodRestriction, hasHealthProblems, unregister])
  return (
    <Fragment>
      <Flex
        mt={6}
        gap={{ base: 6, md: 8, lg: 8 }}
        direction={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <FieldController
          label='Tem problema(s) de saúde?'
          error={errors?.hasHealthProblems?.message as string}
          isRequired
        >
          <Controller
            name='hasHealthProblems'
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
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
        <FieldController
          label='Faz dieta ou restrição alimentar?'
          error={errors?.hasDietOrFoodRestriction?.message as string}
          isRequired
        >
          <Controller
            name='hasDietOrFoodRestriction'
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
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
        conditional={hasHealthProblems === '1'}
        component={
          <FieldController
            label='Descreva o(s) problema(s) de saúde'
            error={errors?.healthProblems?.message as string}
            mt={6}
            isRequired
          >
            <Textarea
              height={24}
              {...register('healthProblems')}
            />
          </FieldController>
        }
      />
      <IfComponent
        conditional={hasDietOrFoodRestriction === '1'}
        component={
          <FieldController
            label='Descreva a dieta ou restrição alimentar'
            error={errors?.dietOrFoodRestriction?.message as string}
            mt={6}
            isRequired
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

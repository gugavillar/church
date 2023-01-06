import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Card, CardHeader, Heading, CardBody, Textarea, Flex, Button, Box, Text } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { newCursilhistFormValidation } from '@common/validations/events/cursillo'

import { NewCursilhistForm, CursilhistActionReducer, CursilhistStateReducer } from '..'
import { AddressData } from './fields/AddressData'
import { CloseRelative } from './fields/CloseRelative'
import { HealthData } from './fields/HealthData'
import { OccupationalData } from './fields/OccupationalData'
import { PersonData } from './fields/PersonData'
import { ReligionData } from './fields/ReligionData'
import { SpouseData } from './fields/SpouseData'

type CardFormProps = {
  gender: 'masculino' | 'feminino'
  nextStep: () => void
  dispatch: Dispatch<CursilhistActionReducer>
  reducerState: CursilhistStateReducer
}

export const defaultFormValues = {
  name: '',
  likeToBeCalled: '',
  birthDate: '',
  phone: '',
  email: '',
  maritalStatus: undefined,
  zipCode: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: undefined,
  referencePoint: undefined,
  religion: '',
  church: '',
  education: undefined,
  occupation: undefined,
  workplace: undefined,
  workplacePhone: undefined,
  healthProblems: undefined,
  hasDietOrFoodRestriction: undefined,
  dietOrFoodRestriction: undefined,
  wish: ''
}

export const CursilloFormSubscription = ({ gender, nextStep, dispatch, reducerState }: CardFormProps) => {
  const {
    watch,
    control,
    unregister,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting }
  } = useForm<NewCursilhistForm>({
    resolver: yupResolver(newCursilhistFormValidation),
    defaultValues: {
      ...reducerState
    }
  })

  const onSubmitHandle = (values: NewCursilhistForm) => {
    dispatch({ type: 'formStep', data: { ...values, stepProgress: 'reviewSubscription' } })
    nextStep()
  }

  const [maritalStatus, hasDietOrFoodRestriction, state] = watch(['maritalStatus', 'hasDietOrFoodRestriction', 'state'])
  const isMarriedPerson = !!maritalStatus && maritalStatus?.includes('Casado(a)')

  useEffect(() => {
    if (maritalStatus === 'Casado(a)') {
      unregister('closeRelative')
    }
    unregister('spouse')
  }, [maritalStatus, setValue, unregister])

  return (
    <Card
      bg='blackAlpha.500'
      boxShadow='2xl'
    >
      <CardHeader>
        <Heading
          as='h4'
          fontSize='md'
        >
          Formulário de inscrição
        </Heading>
        <Text
          mt={4}
          color='red'
        >
          Campos com * são obrigatórios
        </Text>
      </CardHeader>
      <CardBody pt={0}>
        <Box
          as='form'
          onSubmit={handleSubmit(onSubmitHandle)}
        >
          <PersonData
            register={register}
            errors={errors}
            setValue={setValue}
            gender={gender}
          />
          {isMarriedPerson ? (
            <SpouseData
              register={register}
              errors={errors}
              setValue={setValue}
            />
          ) : (
            <CloseRelative
              register={register}
              errors={errors}
              setValue={setValue}
            />
          )}
          <AddressData
            register={register}
            errors={errors}
            setValue={setValue}
            watchState={state}
          />
          <ReligionData
            register={register}
            errors={errors}
          />
          <OccupationalData
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <HealthData
            register={register}
            errors={errors}
            control={control}
            hasDietOrFoodRestriction={hasDietOrFoodRestriction}
            unregister={unregister}
          />
          <FieldController
            error={errors?.wish?.message as string}
            label='Porque deseja fazer o cursilho'
            mt={6}
            isRequired
          >
            <Textarea {...register('wish')} />
          </FieldController>
          <Flex
            justify='flex-end'
            mt={6}
          >
            <Button
              type='submit'
              isLoading={isSubmitting}
              isDisabled={!isValid || !isDirty}
            >
              Cadastrar
            </Button>
          </Flex>
        </Box>
      </CardBody>
    </Card>
  )
}

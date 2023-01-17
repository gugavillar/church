import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Card, CardHeader, Heading, CardBody, Textarea, Flex, Button, Box, Text, CardFooter } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { Gender } from '@common/@types'
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
  gender: Gender
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
  hasHealthProblems: undefined,
  healthProblems: undefined,
  hasDietOrFoodRestriction: undefined,
  dietOrFoodRestriction: undefined,
  wish: ''
}

export const CursilloFormSubscription = ({ gender, dispatch, reducerState }: CardFormProps) => {
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
  }

  const [maritalStatus, hasDietOrFoodRestriction, hasHealthProblems, state] = watch([
    'maritalStatus',
    'hasDietOrFoodRestriction',
    'hasHealthProblems',
    'state'
  ])
  const isMarriedPerson = Boolean(maritalStatus) && maritalStatus?.includes('Casado(a)')

  useEffect(() => {
    if (maritalStatus === 'Casado(a)') {
      unregister('closeRelative')
    } else {
      unregister('spouse')
    }
  }, [maritalStatus, setValue, unregister])

  return (
    <Card
      bg='transparent'
      boxShadow='2xl'
      as='form'
      onSubmit={handleSubmit(onSubmitHandle)}
    >
      <CardHeader>
        <Heading
          as='h4'
          fontSize='md'
          color='gray.900'
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
        <Box>
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
            cityFromReducer={reducerState?.city}
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
            hasHealthProblems={hasHealthProblems}
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
        </Box>
      </CardBody>
      <CardFooter>
        <Flex
          align='center'
          justify='flex-end'
          width='full'
        >
          <Button
            type='submit'
            isLoading={isSubmitting}
            isDisabled={!isValid || !isDirty}
          >
            Avançar
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}
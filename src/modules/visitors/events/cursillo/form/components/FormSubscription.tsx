import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch } from 'react'
import { useForm } from 'react-hook-form'

import { Card, CardHeader, CardBody, Textarea, Flex, Button, Box, Text, CardFooter } from '@chakra-ui/react'

import { FieldController, PageSubtitle } from '@common/components'

import { Gender } from '@common/@types'
import { newCursilhistFormValidation } from '@common/validations/events/cursillo'

import { NewCursilhistForm, CursilhistActionReducer, CursilhistStateReducer } from '..'
import { AddressData } from './fields/AddressData'
import { HealthData } from './fields/HealthData'
import { MarriedOrSinglePerson } from './fields/MariedOrSinglePerson'
import { OccupationalData } from './fields/OccupationalData'
import { PersonData } from './fields/PersonData'
import { ReligionData } from './fields/ReligionData'

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

  return (
    <Card
      bg='transparent'
      boxShadow='2xl'
      as='form'
      onSubmit={handleSubmit(onSubmitHandle)}
    >
      <CardHeader>
        <PageSubtitle>Formulário de inscrição</PageSubtitle>
        <Text color='red'>Campos com * são obrigatórios</Text>
      </CardHeader>
      <CardBody pt={0}>
        <Box>
          <PersonData
            register={register}
            errors={errors}
            setValue={setValue}
            gender={gender}
          />
          <MarriedOrSinglePerson
            errors={errors}
            register={register}
            setValue={setValue}
            unregister={unregister}
            watch={watch}
          />
          <AddressData
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
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
            watch={watch}
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

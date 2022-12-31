import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Card, CardHeader, Heading, CardBody, Textarea, Flex, Button, Box, Text } from '@chakra-ui/react'

import { FieldController } from '@common/components'

import { newCursilhistFormValidation } from '@common/validations/events/cursillo'

import { AddressData } from './AddressData'
import { CloseRelative } from './CloseRelative'
import { HealthData } from './HealthData'
import { OccupationalData } from './OccupationalData'
import { PersonData } from './PersonData'
import { ReligionData } from './ReligionData'
import { SpouseData } from './SpouseData'

import { NewCursilhistForm } from '.'

type CardFormProps = {
  gender: 'masculino' | 'feminino'
}

export const CursilloFormSubscription = ({ gender }: CardFormProps) => {
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
      name: '',
      likeToBeCalled: '',
      birthDate: null,
      phone: null,
      email: '',
      maritalStatus: '',
      zipCode: null,
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      referencePoint: undefined,
      spouse: {
        name: '',
        phone: null,
        numberOfChildren: null
      },
      closeRelative: {
        name: '',
        phone: null
      },
      religion: '',
      church: '',
      education: undefined,
      occupation: undefined,
      workplace: undefined,
      workplacePhone: undefined,
      healthProblems: undefined,
      hasDietOrFoodRestriction: '0',
      dietOrFoodRestriction: undefined,
      wish: ''
    }
  })

  const onSubmitHandle = (values: NewCursilhistForm) => console.log(values)

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

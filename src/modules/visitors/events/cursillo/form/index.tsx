import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Heading, Box, Flex, Button, Card, CardHeader, CardBody, Textarea } from '@chakra-ui/react'

import { FieldController } from '@common/components'
import { CursilloFormInstructions } from '@visitors/components'

import { BRAZILIAN_STATES, EDUCATION_LEVEL, MARITAL_STATUS, OCCUPATIONS } from '@common/constants'

import { AddressData } from './AddressData'
import { CloseRelative } from './CloseRelative'
import { HealthData } from './HealthData'
import { OccupationalData } from './OccupationalData'
import { PersonData } from './PersonData'
import { ReligionData } from './ReligionData'
import { SpouseData } from './SpouseData'

export type NewCursilhistForm = {
  name: string
  likeToBeCalled: string
  birthDate: number
  phone: number
  email: string
  maritalStatus: typeof MARITAL_STATUS[number]['value']
  zipCode: number
  street: string
  neighborhood: string
  city: string
  state: typeof BRAZILIAN_STATES[number]['value']
  referencePoint?: string
  spouse?: {
    name: string
    phone: string
    numberOfChildren: number
  }
  closeRelative?: {
    name: string
    phone: string
  }
  religion: string
  church: string
  education: typeof EDUCATION_LEVEL[number]['value']
  occupation: typeof OCCUPATIONS[number]['value']
  workplace: string
  workplacePhone: number
  healthProblems: string
  hasDietOuFoodRestriction: 'true' | 'false'
  dietOuFoodRestriction?: string
  wish: string
}

const ACTUAL_YEAR = new Date().getFullYear()

const NewCursilhist = () => {
  const { query } = useRouter()
  const {
    watch,
    control,
    unregister,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting }
  } = useForm<NewCursilhistForm>()

  const onSubmitHandle = (values: NewCursilhistForm) => console.log(values)

  const [maritalStatus, hasDietOuFoodRestriction] = watch(['maritalStatus', 'hasDietOuFoodRestriction'])
  const isMarriedPerson = !!maritalStatus && maritalStatus?.includes('Casado(a)')

  useEffect(() => {
    if (maritalStatus === 'Casado(a)') {
      unregister('closeRelative')
    }
    unregister('spouse')
  }, [maritalStatus, setValue, unregister])

  return (
    <Box>
      <Heading
        as='h2'
        fontSize='lg'
        textAlign='center'
        mb={6}
      >
        Cursilho {query.gender} de cristandade vida - {ACTUAL_YEAR}
      </Heading>
      <CursilloFormInstructions />
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
        </CardHeader>
        <CardBody>
          <Box
            as='form'
            onSubmit={handleSubmit(onSubmitHandle)}
          >
            <PersonData
              register={register}
              errors={errors}
              setValue={setValue}
            />
            <AddressData
              register={register}
              errors={errors}
              setValue={setValue}
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
              hasDietOuFoodRestriction={hasDietOuFoodRestriction}
              unregister={unregister}
            />
            <FieldController
              error={errors?.wish?.message as string}
              label='Porque deseja fazer o cursilho'
              mt={6}
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
    </Box>
  )
}

export default NewCursilhist

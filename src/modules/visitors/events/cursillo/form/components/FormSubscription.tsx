import { useFormContext } from 'react-hook-form'

import { Card, CardHeader, CardBody, Flex, Button, Box, Text, CardFooter } from '@chakra-ui/react'

import { PageSubtitle } from '@common/components'

import { Gender } from '@common/@types'

import { NewCursilhistForm } from '..'
import { AddressData } from './fields/AddressData'
import { HealthData } from './fields/HealthData'
import { MarriedOrSinglePerson } from './fields/MariedOrSinglePerson'
import { OccupationalData } from './fields/OccupationalData'
import { PersonData } from './fields/PersonData'
import { ReligionData } from './fields/ReligionData'
import { WishData } from './fields/WishData'

type CardFormProps = {
  gender: Gender
  handleNextStep: () => void
}

export const CursilloFormSubscription = ({ gender, handleNextStep }: CardFormProps) => {
  const {
    formState: { isValid, isDirty }
  } = useFormContext<NewCursilhistForm>()

  return (
    <Card
      bg='transparent'
      boxShadow='2xl'
    >
      <CardHeader>
        <PageSubtitle>Formulário de inscrição</PageSubtitle>
        <Text color='red'>Campos com * são obrigatórios</Text>
      </CardHeader>
      <CardBody pt={0}>
        <Box>
          <PersonData gender={gender} />
          <MarriedOrSinglePerson />
          <AddressData />
          <ReligionData />
          <OccupationalData />
          <HealthData />
          <WishData />
        </Box>
      </CardBody>
      <CardFooter>
        <Flex
          align='center'
          justify='flex-end'
          width='full'
        >
          <Button
            onClick={handleNextStep}
            isDisabled={!isValid || !isDirty}
          >
            Avançar
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}

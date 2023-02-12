import { useFormContext } from 'react-hook-form'

import { CardBody, Flex, Button, Box, CardFooter } from '@chakra-ui/react'

import { CardTitle } from '@common/components'

import { Gender } from '@common/@types'

import { AddressData } from './fields/AddressData'
import { HealthData } from './fields/HealthData'
import { MarriedOrSinglePerson } from './fields/MariedOrSinglePerson'
import { OccupationalData } from './fields/OccupationalData'
import { PersonData } from './fields/PersonData'
import { ReligionData } from './fields/ReligionData'
import { WishData } from './fields/WishData'
import { NewCursilhistForm } from './Form'

type CardFormProps = {
  gender: Gender
  handleNextStep: () => void
}

export const CursilloFormSubscription = ({ gender, handleNextStep }: CardFormProps) => {
  const {
    formState: { isDirty, isValid }
  } = useFormContext<NewCursilhistForm>()

  return (
    <CardTitle
      title='Inscrição'
      subtitle='Campos com * são obrigatórios'
    >
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
            isDisabled={!isValid || !isDirty}
            onClick={handleNextStep}
          >
            Avançar
          </Button>
        </Flex>
      </CardFooter>
    </CardTitle>
  )
}

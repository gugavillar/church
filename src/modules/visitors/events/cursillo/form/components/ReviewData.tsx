import { useFormContext } from 'react-hook-form'

import { Card, CardHeader, CardBody, Text, CardFooter, Flex, Button } from '@chakra-ui/react'

import { PageSubtitle } from '@common/components'

import { Gender } from '@common/@types'

import { NewCursilhistForm } from '..'
import { ReviewComplementaryData } from './reviews/ReviewComplementaryData'
import { ReviewContactData } from './reviews/ReviewContactData'
import { ReviewPersonData } from './reviews/ReviewPersonData'

type ReviewDataProps = {
  gender: Gender
  handlePrevStep: () => void
  handleNextStep: () => void
}

export const ReviewData = ({ gender, handleNextStep, handlePrevStep }: ReviewDataProps) => {
  const { getValues } = useFormContext<NewCursilhistForm>()

  const formValues = getValues()

  return (
    <Card
      bg='transparent'
      boxShadow='2xl'
    >
      <CardHeader>
        <PageSubtitle>Revisão dos dados</PageSubtitle>
        <Text>Revise os dados e clique em avançar para escolher a forma de pagamento</Text>
      </CardHeader>
      <CardBody pt={0}>
        <ReviewPersonData
          data={formValues}
          gender={gender}
        />
        <ReviewContactData data={formValues} />
        <ReviewComplementaryData data={formValues} />
      </CardBody>
      <CardFooter>
        <Flex
          align='center'
          justify='flex-end'
          gap={6}
          width='full'
        >
          <Button
            variant='outline'
            onClick={handlePrevStep}
          >
            Voltar
          </Button>
          <Button onClick={handleNextStep}>Avançar</Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}

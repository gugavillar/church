import { useFormContext } from 'react-hook-form'

import { CardBody, CardFooter, Flex, Button } from '@chakra-ui/react'

import { CardTitle } from '@common/components'

import { Gender } from '@common/@types'

import { NewCursilhistForm } from './Form'
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
    <CardTitle
      title='Inscrição'
      subtitle='Revise os dados e clique em avançar para escolher a forma de pagamento'
    >
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
    </CardTitle>
  )
}

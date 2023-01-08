import { Dispatch } from 'react'

import { Card, CardHeader, Heading, CardBody, Text, CardFooter, Flex, Button } from '@chakra-ui/react'

import { timestampDate, formatToNumber } from '@common/formatters'

import { CursilhistActionReducer, CursilhistStateReducer } from '..'
import { ReviewComplementaryData } from './reviews/ReviewComplementaryData'
import { ReviewContactData } from './reviews/ReviewContactData'
import { ReviewPersonData } from './reviews/ReviewPersonData'

type ReviewDataProps = {
  reducerState: CursilhistStateReducer
  nextStep: () => void
  dispatch: Dispatch<CursilhistActionReducer>
  gender: 'masculino' | 'feminino'
  prevStep: () => void
}

type FormatDataToDatabaseArgs = {
  reducerState: CursilhistStateReducer
  gender: 'masculino' | 'feminino'
}

const formatDataToDatabase = ({ reducerState: { stepProgress, ...rest }, gender }: FormatDataToDatabaseArgs) => {
  return {
    ...rest,
    gender,
    birthDate: timestampDate(rest.birthDate),
    hasDietOrFoodRestriction: Boolean(rest.hasDietOrFoodRestriction),
    hasHealthProblems: Boolean(rest.hasHealthProblems),
    phone: formatToNumber(rest.phone),
    zipCode: formatToNumber(rest.zipCode),
    ...(rest?.workplacePhone && { workplacePhone: formatToNumber(rest?.workplacePhone) }),
    ...(rest?.spouse?.phone && { spouse: { ...rest?.spouse, phone: formatToNumber(rest?.spouse?.phone) } }),
    ...(rest?.closeRelative?.phone && {
      closeRelative: { ...rest?.closeRelative, phone: formatToNumber(rest?.closeRelative?.phone) }
    })
  }
}

export const ReviewData = ({ dispatch, gender, nextStep, prevStep, reducerState }: ReviewDataProps) => {
  const handleCreateCursilhist = () => {
    const formattedData = formatDataToDatabase({ reducerState, gender })
    console.log('Cadastrou no banco de dados', formattedData)
    dispatch({ type: 'reviewStep', data: { ...reducerState, stepProgress: 'paymentSubscription' } })
    nextStep()
  }

  const handlePrevStep = () => {
    dispatch({ type: 'formStep', data: { ...reducerState, stepProgress: 'formSubscription' } })
    console.log(reducerState)
    prevStep()
  }

  return (
    <Card
      bg='transparent'
      boxShadow='2xl'
    >
      <CardHeader>
        <Heading
          as='h4'
          fontSize='md'
          color='gray.900'
        >
          Revisão dos dados
        </Heading>
        <Text mt={4}>Revise os dados e clique em avançar para escolher a forma de pagamento</Text>
      </CardHeader>
      <CardBody pt={0}>
        <ReviewPersonData
          data={reducerState}
          gender={gender}
        />
        <ReviewContactData data={reducerState} />
        <ReviewComplementaryData data={reducerState} />
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
          <Button onClick={handleCreateCursilhist}>Avançar</Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}

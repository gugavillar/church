import { useRouter } from 'next/router'
import { Dispatch } from 'react'

import { Card, CardHeader, Heading, CardBody, Text, CardFooter, Flex, Button, useToast } from '@chakra-ui/react'

import { IfComponent } from '@common/components'

import { ERROR_TOAST } from '@common/constants'
import { timestampDate, formatToNumber } from '@common/formatters'
import { createCursilhist } from '@common/services'

import { CursilhistActionReducer, CursilhistStateReducer } from '..'
import { ReviewComplementaryData } from './reviews/ReviewComplementaryData'
import { ReviewContactData } from './reviews/ReviewContactData'
import { ReviewPersonData } from './reviews/ReviewPersonData'

type ReviewDataProps = {
  reducerState: CursilhistStateReducer
  dispatch: Dispatch<CursilhistActionReducer>
  gender: 'masculino' | 'feminino'
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
    hasDietOrFoodRestriction: Boolean(Number(rest.hasDietOrFoodRestriction)),
    hasHealthProblems: Boolean(Number(rest.hasHealthProblems)),
    phone: formatToNumber(rest.phone),
    zipCode: formatToNumber(rest.zipCode),
    ...(rest?.workplacePhone && { workplacePhone: formatToNumber(rest?.workplacePhone) }),
    ...(rest?.spouse?.phone && { spouse: { ...rest?.spouse, phone: formatToNumber(rest?.spouse?.phone) } }),
    ...(rest?.closeRelative?.phone && {
      closeRelative: { ...rest?.closeRelative, phone: formatToNumber(rest?.closeRelative?.phone) }
    })
  }
}

export type Cursilhist = ReturnType<typeof formatDataToDatabase>

export const ReviewData = ({ dispatch, gender, reducerState }: ReviewDataProps) => {
  const toast = useToast()
  const { query } = useRouter()

  const handleCreateCursilhist = async () => {
    if (reducerState?.id) {
      dispatch({ type: 'reviewStep', data: { ...reducerState, stepProgress: 'paymentSubscription' } })
      return
    }

    try {
      const formattedData = formatDataToDatabase({ reducerState, gender })
      const { ref } = await createCursilhist(formattedData)
      dispatch({ type: 'reviewStep', data: { ...reducerState, id: ref.value.id, stepProgress: 'paymentSubscription' } })
    } catch {
      toast({
        ...ERROR_TOAST,
        title: 'Ocorreu uma falha',
        description: 'Falha ao tentar salvar. Tente novamente'
      })
    }
  }

  const handlePrevStep = () => {
    dispatch({ data: { ...reducerState, stepProgress: 'formSubscription' } })
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
          <IfComponent
            conditional={!Boolean(query?.user_id)}
            component={
              <Button
                variant='outline'
                onClick={handlePrevStep}
              >
                Voltar
              </Button>
            }
          />
          <Button onClick={handleCreateCursilhist}>Avançar</Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}

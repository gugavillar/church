import { useRouter } from 'next/router'
import { useState } from 'react'

import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Flex, useToast } from '@chakra-ui/react'

import { ERROR_TOAST } from '@common/constants'
import { createCursilhistPaymentConfirmation } from '@common/services'

import { CursilhistStateReducer } from '..'

type ConfirmedPaymentProps = {
  reducerState: CursilhistStateReducer
  gender: 'masculino' | 'feminino'
}

export const ConfirmedPayment = ({ gender, reducerState }: ConfirmedPaymentProps) => {
  console.log(reducerState)
  const [isLoading, setIsLoading] = useState(false)

  const { push } = useRouter()
  const toast = useToast()

  const handleConcludeSubscription = async () => {
    setIsLoading(true)
    try {
      const payment = {
        method: reducerState.method as 'pix' | 'money' | 'credit',
        cursilhistRef: reducerState.id as string,
        status: reducerState.method !== 'money',
        gender
      }
      await createCursilhistPaymentConfirmation(payment)
      push('/eventos/cursilho')
    } catch {
      toast({
        ...ERROR_TOAST,
        title: 'Ocorreu uma falha',
        description: 'Falha ao tentar salvar. Tente novamente'
      })
    } finally {
      setIsLoading(false)
    }
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
          Pagamento confirmado
        </Heading>
      </CardHeader>
      <CardBody pt={0}></CardBody>
      <CardFooter>
        <Flex
          align='center'
          justify='flex-end'
          gap={6}
          width='full'
        >
          <Button
            isLoading={isLoading}
            onClick={handleConcludeSubscription}
          >
            Finalizar
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}

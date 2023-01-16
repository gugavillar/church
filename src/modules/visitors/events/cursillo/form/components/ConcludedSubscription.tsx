import { useRouter } from 'next/router'
import { useState } from 'react'

import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Flex, useToast, Text } from '@chakra-ui/react'

import { PaymentMethods, PaymentStatus } from '@common/@types'
import { ERROR_TOAST } from '@common/constants'
import { createCursilhistPaymentConfirmation } from '@common/services'

import { CursilhistStateReducer } from '..'

type ConfirmedPaymentProps = {
  reducerState: CursilhistStateReducer
}

const MESSAGE_PAYMENT = {
  credit: 'Estamos aguardando o retorno da operadora do cartão',
  money: 'Procure os responsáveis do financeiro para efetuar o pagamento',
  pix: 'Envie o comprovante para o telefone para que possamos confirmar o seu pagamento'
}

export const ConcludedSubscription = ({ reducerState }: ConfirmedPaymentProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { push, query } = useRouter()
  const toast = useToast()
  const hasUserId = Boolean(query?.user_id)

  const handleConcludeSubscription = async () => {
    setIsLoading(true)
    try {
      const payment = {
        paymentMethod: hasUserId ? 'credit' : (reducerState.paymentMethod as PaymentMethods),
        cursilhistRef: reducerState.id as string,
        paymentStatus: 'em_aberto' as PaymentStatus
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
          Inscrição confirmada
        </Heading>
      </CardHeader>
      <CardBody
        pt={0}
        fontSize='sm'
      >
        <Text>Você finalizou o processo de inscrição</Text>
        <Text>{MESSAGE_PAYMENT[reducerState.paymentMethod as PaymentMethods]}</Text>
        <Text>Esperamos você na quinta feira. Clique em finalizar para sair.</Text>
      </CardBody>
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

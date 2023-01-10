import { Dispatch, useState } from 'react'
import { generate } from 'short-uuid'

import { Card, CardHeader, Heading, CardBody, Button, CardFooter, Flex, Box, Image, useToast } from '@chakra-ui/react'

import { IfComponent } from '@common/components'

import { ERROR_TOAST, PAYMENT_METHODS } from '@common/constants'
import { creditCardService } from '@common/services'

import { CursilhistActionReducer, CursilhistStateReducer } from '..'
import { ButtonPayment } from './payments/ButtonPayment'

type PaymentDataProps = {
  reducerState: CursilhistStateReducer
  prevStep: () => void
  dispatch: Dispatch<CursilhistActionReducer>
}

const PAYMENT_METHOD_SHOW = {
  pix: (
    <Box mt={8}>
      <Heading
        textAlign='center'
        as='h4'
        fontSize='sm'
        color='gray.500'
      >
        Leia o QrCode, efetue o pagamento e envie o comprovante.
      </Heading>
      <Image
        src='/assets/qrCodePix.png'
        mt={6}
        mx='auto'
        alt='QrCode pagamento via pix'
      />
    </Box>
  ),
  credit: (
    <Box mt={8}>
      <Heading
        textAlign='center'
        as='h4'
        fontSize='sm'
        color='gray.500'
      >
        Pagamento com cartão de crédito
      </Heading>
    </Box>
  ),
  money: (
    <Box mt={8}>
      <Heading
        textAlign='center'
        as='h4'
        fontSize='sm'
        color='gray.500'
      >
        Pagamento em dinheiro no local
      </Heading>
    </Box>
  ),
  noPayment: (
    <Box mt={8}>
      <Heading
        textAlign='center'
        as='h4'
        fontSize='sm'
        color='gray.500'
      >
        Selecione uma das opção de pagamento acima
      </Heading>
    </Box>
  )
}

export const PaymentData = ({ reducerState, prevStep, dispatch }: PaymentDataProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | 'money' | 'noPayment'>('noPayment')

  const toast = useToast()

  const handleSetPaymentMethod = async (method: 'pix' | 'credit' | 'money') => {
    setPaymentMethod(method)
    if (method === 'credit') {
      try {
        const { session } = await creditCardService()
        window.location.href = session?.url
      } catch {
        toast({
          ...ERROR_TOAST,
          title: 'Ocorreu uma falha',
          description: 'Falha ao direcionar para o pagamento'
        })
      }
    }
  }

  const handlePrevStep = () => {
    dispatch({ type: 'formStep', data: { ...reducerState, stepProgress: 'reviewSubscription' } })
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
          Método de pagamento
        </Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Flex
          align='center'
          justify='space-evenly'
          mt={8}
        >
          {PAYMENT_METHODS?.map((method) => (
            <ButtonPayment
              key={generate()}
              label={method.label}
              iconType={method.iconType}
              onClick={() => handleSetPaymentMethod(method.iconType)}
            />
          ))}
        </Flex>
        <IfComponent
          conditional={Boolean(paymentMethod)}
          component={PAYMENT_METHOD_SHOW[paymentMethod]}
        />
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
          <Button>Finalizar</Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}

import { Dispatch, useState } from 'react'
import { generate } from 'short-uuid'

import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Button,
  CardFooter,
  Flex,
  Box,
  Image,
  useToast,
  Spinner
} from '@chakra-ui/react'

import { IfComponent } from '@common/components'

import { PaymentMethods } from '@common/@types'
import { ERROR_TOAST, PAYMENT_METHODS } from '@common/constants'
import { creditCardService } from '@common/services'

import { CursilhistActionReducer, CursilhistStateReducer } from '..'
import { ButtonPayment } from './payments/ButtonPayment'

type PaymentDataProps = {
  reducerState: CursilhistStateReducer
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
        Leia o QrCode, efetue o pagamento.
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
        <Spinner
          size='sm'
          color='gray.500'
          mr={4}
        />
        Redirecionando para o pagamento
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

export const PaymentData = ({ reducerState, dispatch }: PaymentDataProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods | 'noPayment'>('noPayment')

  const toast = useToast()

  const handleSetPaymentMethod = async (method: PaymentMethods) => {
    setPaymentMethod(method)
    if (method === 'credit') {
      try {
        const { session } = await creditCardService({
          line_items: [{ price: process.env.NEXT_PUBLIC_CURSILHO_INSCRICAO as string, quantity: 1 }],
          ref: String(reducerState?.id),
          email: String(reducerState?.email)
        })
        window.location.href = session?.url
      } catch {
        toast({
          ...ERROR_TOAST,
          title: 'Ocorreu uma falha',
          description: 'Falha ao redirecionar para o pagamento'
        })
      }
    }
  }

  const handlePrevStep = () => {
    dispatch({ data: { ...reducerState, stepProgress: 'reviewSubscription' } })
  }

  const handleConcludeSubscription = () => {
    dispatch({
      type: 'paymentStep',
      data: {
        ...reducerState,
        stepProgress: 'confirmSubscription',
        paymentMethod: paymentMethod as PaymentMethods
      }
    })
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
          <IfComponent
            conditional={['money', 'pix'].includes(paymentMethod)}
            component={<Button onClick={handleConcludeSubscription}>Avançar</Button>}
          />
        </Flex>
      </CardFooter>
    </Card>
  )
}

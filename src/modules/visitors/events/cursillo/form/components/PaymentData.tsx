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

import { IfComponent, PageSubtitle } from '@common/components'

import { PaymentMethods } from '@common/@types'
import { ERROR_TOAST, PAYMENT_METHODS } from '@common/constants'
import { getStripeJs } from '@common/provider/stripeJSApi'
import { creditCardService } from '@common/services'

import { CursilhistActionReducer, CursilhistStateReducer } from '..'
import { ButtonPayment } from './payments/ButtonPayment'

type PaymentDataProps = {
  reducerState: CursilhistStateReducer
  dispatch: Dispatch<CursilhistActionReducer>
}

const PAYMENT_METHOD_SHOW = {
  pix: (
    <Box>
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
    <Box>
      <Heading
        textAlign='center'
        as='h4'
        fontSize='sm'
        color='gray.500'
      >
        Redirecionando para o pagamento
      </Heading>
    </Box>
  ),
  money: (
    <Box>
      <Heading
        textAlign='center'
        as='h4'
        fontSize='sm'
        color='gray.500'
      >
        Pagamento em dinheiro no local
      </Heading>
    </Box>
  )
} as const

export const PaymentData = ({ reducerState, dispatch }: PaymentDataProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods | ''>('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const handleSetPaymentMethod = async (method: PaymentMethods) => {
    setPaymentMethod(method)
    if (method === 'credit') {
      setIsLoading(true)
      try {
        const { sessionId } = await creditCardService({
          line_items: [{ price: process.env.NEXT_PUBLIC_CURSILHO_INSCRICAO as string, quantity: 1 }],
          ref: String(reducerState?.id),
          email: String(reducerState?.email)
        })
        const stripe = await getStripeJs()
        await stripe?.redirectToCheckout({ sessionId })
      } catch {
        toast({
          ...ERROR_TOAST,
          title: 'Ocorreu uma falha',
          description: 'Falha ao redirecionar para o pagamento'
        })
      } finally {
        setIsLoading(false)
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
        <PageSubtitle>Método de pagamento</PageSubtitle>
      </CardHeader>
      <CardBody pt={0}>
        <Flex
          direction={['column', 'row']}
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
        <Flex
          align='center'
          justify='center'
          mt={8}
        >
          <IfComponent
            conditional={isLoading}
            component={
              <Spinner
                size='sm'
                color='gray.500'
                mr={4}
              />
            }
          />
          <IfComponent
            conditional={Boolean(paymentMethod)}
            component={PAYMENT_METHOD_SHOW[paymentMethod as PaymentMethods]}
          />
        </Flex>
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

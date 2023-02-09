import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { generate } from 'short-uuid'

import { Card, CardHeader, Heading, CardBody, Button, CardFooter, Flex, Box, Image } from '@chakra-ui/react'

import { IfComponent, PageSubtitle } from '@common/components'

import { PaymentMethods } from '@common/@types'
import { PAYMENT_METHODS } from '@common/constants'

import { NewCursilhistForm } from './Form'
import { ButtonPayment } from './payments/ButtonPayment'

type PaymentDataProps = {
  handleNextStep: () => void
  handlePrevStep: () => void
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

export const PaymentData = ({ handleNextStep, handlePrevStep }: PaymentDataProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods | ''>('')

  const { setValue } = useFormContext<NewCursilhistForm>()

  const handleSetPaymentMethod = async (method: PaymentMethods) => {
    setPaymentMethod(method)
    setValue('paymentMethod', method)
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
          <Button onClick={handleNextStep}>Avançar</Button>
        </Flex>
      </CardFooter>
    </Card>
  )
}

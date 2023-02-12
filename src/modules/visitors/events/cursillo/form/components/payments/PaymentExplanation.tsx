import { Box, Text } from '@chakra-ui/react'

import { PaymentMethods } from '@common/@types'

const PAYMENT_METHOD_SHOW = {
  pix: 'Ao clicar em finalizar você será redirecionado para efetuar o pagamento via pix.',
  credit: 'Ao clicar em finalizar você será redirecionado para efetuar o pagamento com cartão de crédito.',
  money:
    'Ao clicar em finalizar você confirma que efetuará o pagamento em dinheiro. Procurar o responsável para efetuar o pagamento.'
} as const

type PaymentExplanationProps = {
  payment: PaymentMethods
}

export const PaymentExplanation = ({ payment }: PaymentExplanationProps) => {
  return (
    <Box maxW={['full', '40rem']}>
      <Text
        fontSize='sm'
        align='justify'
      >
        {PAYMENT_METHOD_SHOW[payment]}
      </Text>
    </Box>
  )
}

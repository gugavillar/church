import { Highlight } from '@chakra-ui/react'

import { PaymentMethods } from '@common/@types'

type HighlightPaymentMethodProps = {
  text: PaymentMethods
}

const translateText = {
  money: 'Pagamento em dinheiro',
  pix: 'Pagamento via pix',
  credit: 'Pagamento no cartão de crédito'
} as const

export const HighlightPaymentMethod = ({ text }: HighlightPaymentMethodProps) => {
  return (
    <Highlight
      query={translateText[text]}
      styles={{ px: 6, py: 1, rounded: 'full', color: 'white', bg: 'gray.400', fontWeight: 700 }}
    >
      {translateText[text]}
    </Highlight>
  )
}

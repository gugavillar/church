import { Highlight } from '@chakra-ui/react'

import { PaymentStatus } from '@common/@types'

type HighlightPaymentStatusProps = {
  text: PaymentStatus
}

const BACKGROUND_COLORS = {
  pago: 'green.400',
  aguardando_pagamento: 'yellow.400',
  em_aberto: 'red.400'
} as const

const translateText = {
  pago: 'Pago',
  em_aberto: 'Em aberto',
  aguardando_pagamento: 'Aguardando pagamento'
} as const

export const HighlightPaymentStatus = ({ text }: HighlightPaymentStatusProps) => {
  return (
    <Highlight
      query={translateText[text]}
      styles={{ px: 6, py: 1, rounded: 'full', color: 'white', bg: BACKGROUND_COLORS[text], fontWeight: 700 }}
    >
      {translateText[text]}
    </Highlight>
  )
}

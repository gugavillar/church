import { Highlight } from '@chakra-ui/react'

type HighlightTextProps = {
  text: 'Pago' | 'Aguardando pagamento' | 'Aberto' | 'Pagamento presencial'
}

const BACKGROUND_COLORS = {
  Pago: 'green.400',
  'Aguardando pagamento': 'yellow.400',
  Aberto: 'red.400',
  'Pagamento presencial': 'blue.400'
}

export const HighlightText = ({ text }: HighlightTextProps) => {
  return (
    <Highlight
      query={[...Object.keys(BACKGROUND_COLORS)]}
      styles={{ px: 6, py: 1, rounded: 'full', bg: BACKGROUND_COLORS[text], fontWeight: 700 }}
    >
      {text}
    </Highlight>
  )
}

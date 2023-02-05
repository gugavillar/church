import { CreditCard, CurrencyDollar } from 'phosphor-react'

import { Button as ChakraButton, Text } from '@chakra-ui/react'

import { Pix } from '@common/components'

import { PaymentMethods } from '@common/@types'

type ButtonPaymentProps = {
  iconType: PaymentMethods
  label: 'PIX' | 'Cartão' | 'Dinheiro'
  onClick: () => void
}

const pixDefaultProps = {
  width: 8,
  height: 8
}

const iconsDefaultProps = {
  width: 32,
  height: 32,
  color: '#4BB8A9'
}

const icon = {
  pix: <Pix {...pixDefaultProps} />,
  credit: <CreditCard {...iconsDefaultProps} />,
  money: <CurrencyDollar {...iconsDefaultProps} />
}

export const ButtonPayment = ({ iconType, label, onClick }: ButtonPaymentProps) => {
  return (
    <ChakraButton
      bg='transparent'
      onClick={onClick}
      leftIcon={icon[iconType]}
    >
      <Text
        color='black'
        fontSize='sm'
        {...(iconType !== 'pix' && { textTransform: 'capitalize' })}
      >
        {label}
      </Text>
    </ChakraButton>
  )
}

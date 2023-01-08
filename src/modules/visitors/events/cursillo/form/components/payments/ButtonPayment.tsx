import { CreditCard, CurrencyDollar } from 'phosphor-react'

import { Button as ChakraButton, Text } from '@chakra-ui/react'

import { Pix } from '@common/components'

type ButtonPaymentProps = {
  iconType: 'pix' | 'credit' | 'money'
  label: 'PIX' | 'Cartão' | 'Dinheiro'
}

const pixDefaultProps = {
  width: 12,
  height: 12
}

const iconsDefaultProps = {
  width: 48,
  height: 48,
  color: '#4BB8A9'
}

const icon = {
  pix: <Pix {...pixDefaultProps} />,
  credit: <CreditCard {...iconsDefaultProps} />,
  money: <CurrencyDollar {...iconsDefaultProps} />
}

export const ButtonPayment = ({ iconType, label }: ButtonPaymentProps) => {
  return (
    <ChakraButton bg='transparent'>
      {icon[iconType]}
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

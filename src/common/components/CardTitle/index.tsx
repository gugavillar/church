import { ReactNode } from 'react'

import { Card, CardHeader, Text } from '@chakra-ui/react'

import { PageSubtitle } from '@common/components'

type CardTitleProps = {
  children: ReactNode
  title: string
  subtitle: string
}

export const CardTitle = ({ children, subtitle, title }: CardTitleProps) => {
  return (
    <Card
      bg='transparent'
      boxShadow='2xl'
    >
      <CardHeader>
        <PageSubtitle>{title}</PageSubtitle>
        <Text color='red'>{subtitle}</Text>
      </CardHeader>
      {children}
    </Card>
  )
}

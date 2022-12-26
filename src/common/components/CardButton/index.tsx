import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { Card, CardBody, CardFooter, Divider, Heading, Flex } from '@chakra-ui/react'

type CardButtonProps = {
  cardProps: {
    icon: ReactNode
    title: string
    url: string
  }
}

export const CardButton = ({ cardProps }: CardButtonProps) => {
  const { push } = useRouter()

  const handleNavigateTo = (url: string) => push(url)

  return (
    <Card
      bg='white'
      boxShadow='dark-lg'
      maxW={80}
      minW={80}
    >
      <CardBody>
        <Flex
          align='center'
          justify='center'
        >
          {cardProps.icon}
        </Flex>
      </CardBody>
      <Divider />
      <CardFooter
        justifyContent='center'
        onClick={() => handleNavigateTo(cardProps.url)}
      >
        <Heading
          as='h3'
          fontSize='md'
          textAlign='center'
        >
          {cardProps.title}
        </Heading>
      </CardFooter>
    </Card>
  )
}

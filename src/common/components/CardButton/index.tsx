import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { Card, CardBody, CardFooter, Divider, Heading, Flex } from '@chakra-ui/react'

type CardButtonProps = {
  cardProps: {
    icon: ReactNode
    title: string
    url: string
  }
  gender: 'masculino' | 'feminino'
}

export const CardButton = ({ cardProps, gender }: CardButtonProps) => {
  const { push } = useRouter()

  const handleNavigateTo = (url: string) => push(`/cursilho/${gender}/${url}`)

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
        cursor='pointer'
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

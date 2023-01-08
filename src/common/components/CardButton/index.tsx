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
      onClick={() => handleNavigateTo(cardProps.url)}
      cursor='pointer'
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
      <CardFooter justifyContent='center'>
        <Heading
          as='h4'
          fontSize='sm'
          textAlign='center'
          color='black'
        >
          {cardProps.title}
        </Heading>
      </CardFooter>
    </Card>
  )
}

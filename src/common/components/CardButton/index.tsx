import { ReactNode } from 'react'

import { Card, CardBody, CardFooter, Divider, Heading, Flex } from '@chakra-ui/react'

type CardButtonProps = {
  icon: ReactNode
  title: string
}

export const CardButton = ({ icon, title }: CardButtonProps) => {
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
          {icon}
        </Flex>
      </CardBody>
      <Divider />
      <CardFooter justifyContent='center'>
        <Heading
          as='h3'
          fontSize='md'
          textAlign='center'
        >
          {title}
        </Heading>
      </CardFooter>
    </Card>
  )
}

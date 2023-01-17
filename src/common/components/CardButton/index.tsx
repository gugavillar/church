import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { Card, CardBody, CardFooter, Divider, Flex, Button } from '@chakra-ui/react'

type CardButtonProps = {
  cardProps: {
    icon: ReactNode
    title: string
    url: string
  }
  urlNavigation: string
  isDisabled: boolean
}

export const CardButton = ({ cardProps, urlNavigation, isDisabled }: CardButtonProps) => {
  const { push } = useRouter()

  const handleNavigateTo = (url: string) => push(`${urlNavigation}/${url}`)

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
      <CardFooter justifyContent='center'>
        <Button
          variant='outline'
          isDisabled={!isDisabled}
          onClick={() => handleNavigateTo(cardProps.url)}
        >
          {cardProps.title}
        </Button>
      </CardFooter>
    </Card>
  )
}

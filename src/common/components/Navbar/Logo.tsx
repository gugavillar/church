import { memo } from 'react'

import { Heading, Flex } from '@chakra-ui/react'

export const Logo = memo(() => {
  return (
    <Flex align='center'>
      <Heading color='white'>Anglicana</Heading>
    </Flex>
  )
})

Logo.displayName = 'Logo'

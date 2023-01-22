import { memo } from 'react'

import { Box, Flex, Image } from '@chakra-ui/react'

export const Logo = memo(() => {
  return (
    <Flex
      align='center'
      justify='center'
      width={32}
    >
      <Box boxSize={20}>
        <Image
          src='/assets/logo-vida-white.png'
          alt='Logo da igreja anglicana de Gravatá'
        />
      </Box>
    </Flex>
  )
})

Logo.displayName = 'Logo'

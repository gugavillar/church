import { memo } from 'react'

import { Box, Image } from '@chakra-ui/react'

export const LogoRed = memo(() => {
  return (
    <Box boxSize={48}>
      <Image
        src='/assets/logo-vida-red.png'
        alt='Logo igreja anglicana vida na cor vermelha'
      />
    </Box>
  )
})

LogoRed.displayName = 'LogoRed'

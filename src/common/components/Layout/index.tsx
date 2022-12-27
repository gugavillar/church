import { ReactNode } from 'react'

import { Box, Container } from '@chakra-ui/react'

import { Navbar } from '@common/components'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <Navbar />
      <Container
        maxW='80rem'
        py={{ base: 6, md: 6, lg: 8 }}
        px={{ base: 4, md: 4, lg: '6.875rem' }}
      >
        {children}
      </Container>
    </Box>
  )
}

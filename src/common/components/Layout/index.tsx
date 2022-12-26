import { ReactNode } from 'react'

import { Box, Button, Container } from '@chakra-ui/react'

import { Navbar } from '@common/components'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Navbar actionButton={<Button>Contate-nos</Button>} />
      <Container
        maxW='full'
        py={{ base: 6, md: 6, lg: 8 }}
        px={{ base: 4, md: 4, lg: '6.875rem' }}
      >
        {children}
      </Container>
    </Box>
  )
}

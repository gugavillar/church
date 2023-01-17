import { Box, Container } from '@chakra-ui/react'

import { IfComponent, LoaderPage, Navbar } from '@common/components'

import { useRouterChange } from '@common/hooks'

type LayoutProps = {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {
  const isChanging = useRouterChange()
  return (
    <Box>
      <Navbar />
      <Container
        maxW='80rem'
        py={{ base: 6, md: 6, lg: 8 }}
        px={{ base: 4, md: 4, lg: 16 }}
      >
        <IfComponent
          conditional={isChanging}
          component={<LoaderPage />}
        />
        <IfComponent
          conditional={!isChanging}
          component={children}
        />
      </Container>
    </Box>
  )
}

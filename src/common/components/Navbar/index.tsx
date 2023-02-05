import { memo } from 'react'

import { Button, Flex } from '@chakra-ui/react'

import { Menu } from './Menu/Menu'

export const Navbar = memo(() => {
  return (
    <Flex
      as='nav'
      bg='gray.900'
      height={20}
      justify='space-between'
      align='center'
      px={{ base: 4, md: 4, lg: 32 }}
    >
      <Menu />
      <Button
        variant='secondary'
        display={{ base: 'none', md: 'none', lg: 'flex' }}
      >
        Contate-nos
      </Button>
    </Flex>
  )
})

Navbar.displayName = 'Navbar'

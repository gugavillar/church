import { Button, Flex } from '@chakra-ui/react'

import { Menu } from './Menu'

export const Navbar = () => {
  return (
    <Flex
      as='nav'
      bg='gray'
      height={20}
      justify='space-between'
      align='center'
      px={{ base: 4, md: 4, lg: '6.875rem' }}
    >
      <Menu />
      <Button display={{ base: 'none', md: 'none', lg: 'flex' }}>Contate-nos</Button>
    </Flex>
  )
}

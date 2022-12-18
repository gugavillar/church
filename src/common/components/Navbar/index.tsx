import { ReactNode } from 'react'

import { Flex, useMediaQuery } from '@chakra-ui/react'

import { Menu } from './Menu'

type NavbarProps = {
  actionButton: ReactNode
}

export const Navbar = ({ actionButton }: NavbarProps) => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  return (
    <Flex
      bg='black'
      height='5rem'
      justify='space-between'
      align='center'
      px={{ base: '2rem', md: '2rem', lg: '6.875rem' }}
    >
      <Menu isLargerThan768={isLargerThan768} />
      {isLargerThan768 && actionButton}
    </Flex>
  )
}

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
      as='nav'
      bg='black'
      height={20}
      justify='space-between'
      align='center'
      px={{ base: 4, md: 4, lg: '6.875rem' }}
    >
      <Menu isLargerThan768={isLargerThan768} />
      {isLargerThan768 && actionButton}
    </Flex>
  )
}

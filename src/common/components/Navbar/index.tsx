import { ReactNode } from 'react'

import { Flex, useMediaQuery } from '@chakra-ui/react'

import { Menu } from './Menu'

type NavbarProps = {
  actionButton: ReactNode
}

export const Navbar = ({ actionButton }: NavbarProps) => {
  const [isLargerThan640] = useMediaQuery('(min-width: 640px)')
  return (
    <Flex
      bg='black'
      height='5rem'
      justify='space-between'
      align='center'
      px={['2rem', '6.875rem']}
    >
      <Menu isLargerThan640={isLargerThan640} />
      {isLargerThan640 && actionButton}
    </Flex>
  )
}

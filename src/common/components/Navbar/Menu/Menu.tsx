import { Flex } from '@chakra-ui/react'

import { VerticalDivider } from '@common/components'

import { Logo } from '../Logo'
import { BodyMenu } from './BodyMenu'

export const Menu = () => {
  return (
    <Flex
      gap={4}
      width='100%'
      justify={{ base: 'space-between', md: 'space-between', lg: 'flex-start' }}
    >
      <Logo />
      <VerticalDivider
        height={20}
        opacity='0.1'
        display={{ base: 'none', md: 'none', lg: 'flex' }}
      />
      <BodyMenu />
    </Flex>
  )
}

import { Flex } from '@chakra-ui/react'

import { VerticalDivider } from '@common/components'

import { itensMenu } from './constants'
import { ItemMenu } from './ItemMenu'
import { Logo } from './Logo'
import { MenuContent } from './MenuContent'

export const Menu = () => {
  return (
    <Flex
      gap={16}
      width='100%'
      justify={{ base: 'space-between', md: 'space-between', lg: 'flex-start' }}
    >
      <Logo />
      <VerticalDivider
        height={20}
        opacity='0.1'
        display={{ base: 'none', md: 'none', lg: 'flex' }}
      />
      <MenuContent>
        {itensMenu.map((item) => (
          <ItemMenu
            key={item.label}
            label={item.label}
            url={item.url}
          />
        ))}
      </MenuContent>
    </Flex>
  )
}

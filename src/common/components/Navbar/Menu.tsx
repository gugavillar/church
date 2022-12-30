import { useRouter } from 'next/router'

import { Flex, useDisclosure } from '@chakra-ui/react'

import { VerticalDivider } from '@common/components'

import { ITENS_MENU } from './constants'
import { ItemMenu } from './ItemMenu'
import { Logo } from './Logo'
import { MenuContent } from './MenuContent'

export const Menu = () => {
  const { pathname } = useRouter()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleCloseDrawer = () => onClose()

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
      <MenuContent
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        {ITENS_MENU.map((item) => (
          <ItemMenu
            key={item.label}
            label={item.label}
            url={item.url}
            activeUrl={pathname}
            handleCloseDrawer={handleCloseDrawer}
          />
        ))}
      </MenuContent>
    </Flex>
  )
}

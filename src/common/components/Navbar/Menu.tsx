import { useRouter } from 'next/router'

import { Flex, useDisclosure } from '@chakra-ui/react'

import { DropdownMenu, VerticalDivider } from '@common/components'

import { DROPDOWN_MENU_ITENS } from './constants'
import { ItemList } from './ItemList'
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
        <ItemList
          handleCloseDrawer={handleCloseDrawer}
          pathname={pathname}
        />
        <DropdownMenu
          labelMenu='Eventos'
          menuList={DROPDOWN_MENU_ITENS}
          activeUrl={pathname}
          handleCloseDrawer={handleCloseDrawer}
        />
      </MenuContent>
    </Flex>
  )
}

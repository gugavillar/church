import Link from 'next/link'
import { CaretDown } from 'phosphor-react'
import { generate } from 'short-uuid'

import { Menu, MenuButton, Text, MenuList, MenuItem, Flex } from '@chakra-ui/react'

import { DROPDOWN_MENU_ITENS } from '../Navbar/constants'

type DropdownMenuProps = {
  labelMenu: string
  menuList: typeof DROPDOWN_MENU_ITENS
  activeUrl: string
  handleCloseDrawer: () => void
}

export const DropdownMenu = ({ labelMenu, menuList, activeUrl, handleCloseDrawer }: DropdownMenuProps) => {
  const isEventInPath = /eventos/g.test(activeUrl)
  return (
    <Menu>
      <MenuButton>
        <Text
          as='span'
          display={{ base: 'block', md: 'block', lg: 'flex' }}
          py={{ base: 2, md: 2 }}
          variant='navLink'
          {...(isEventInPath && { variant: 'active' })}
        >
          <Flex
            gap={2}
            align='center'
          >
            {labelMenu} <CaretDown />
          </Flex>
        </Text>
      </MenuButton>
      <MenuList
        bg='gray.900'
        borderColor='gray.500'
      >
        {menuList?.map((menuItem) => (
          <MenuItem
            bg='gray.900'
            key={generate()}
          >
            <Link
              href={`/eventos${menuItem.url}`}
              passHref
              onClick={handleCloseDrawer}
            >
              <Text
                as='span'
                display={{ base: 'block', md: 'block', lg: 'flex' }}
                py={{ base: 2, md: 2 }}
                variant='navLink'
                {...(`/eventos${menuItem.url}` === activeUrl && { variant: 'active' })}
              >
                {menuItem.label}
              </Text>
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

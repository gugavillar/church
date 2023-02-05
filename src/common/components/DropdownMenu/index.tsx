import { useRouter } from 'next/router'

import { Menu } from '@chakra-ui/react'

import { DROPDOWN_MENU_ITENS } from '@common/components/Navbar/constants'

import { DropdownButton } from './DropdownButton'
import { DropdownList } from './DropdownList'

type DropdownMenuProps = {
  labelMenu: string
  menuList: typeof DROPDOWN_MENU_ITENS
  handleCloseDrawer: () => void
}

export const DropdownMenu = ({ labelMenu, menuList, handleCloseDrawer }: DropdownMenuProps) => {
  const { pathname } = useRouter()
  return (
    <Menu>
      <DropdownButton
        label={labelMenu}
        activeUrl={pathname}
      />
      <DropdownList
        activeUrl={pathname}
        handleCloseDrawer={handleCloseDrawer}
        menuList={menuList}
      />
    </Menu>
  )
}

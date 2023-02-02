import { Menu } from '@chakra-ui/react'

import { DROPDOWN_MENU_ITENS } from '@common/components/Navbar/constants'

import { DropdownButton } from './DropdownButton'
import { DropdownList } from './DropdownList'

type DropdownMenuProps = {
  labelMenu: string
  menuList: typeof DROPDOWN_MENU_ITENS
  activeUrl: string
  handleCloseDrawer: () => void
}

export const DropdownMenu = ({ labelMenu, menuList, activeUrl, handleCloseDrawer }: DropdownMenuProps) => {
  return (
    <Menu>
      <DropdownButton
        label={labelMenu}
        activeUrl={activeUrl}
      />
      <DropdownList
        activeUrl={activeUrl}
        handleCloseDrawer={handleCloseDrawer}
        menuList={menuList}
      />
    </Menu>
  )
}

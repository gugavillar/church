import { MenuList } from '@chakra-ui/react'

import { DROPDOWN_MENU_ITENS } from '@common/components/Navbar/constants'

import { DropdownListItem } from './DropdownListItem'

type DropdownListProps = {
  menuList: typeof DROPDOWN_MENU_ITENS
  activeUrl: string
  handleCloseDrawer?: () => void
}

export const DropdownList = ({ menuList, activeUrl, handleCloseDrawer }: DropdownListProps) => {
  return (
    <MenuList
      bg='gray.900'
      borderColor='gray.500'
    >
      {menuList?.map((menuItem) => (
        <DropdownListItem
          key={menuItem.label}
          item={menuItem}
          isActive={activeUrl.includes(menuItem.url)}
          {...(handleCloseDrawer && { handleCloseDrawer })}
        />
      ))}
    </MenuList>
  )
}

import { Fragment } from 'react'

import { DropdownMenu } from '../../DropdownMenu'
import { DROPDOWN_MENU_ITENS } from '../constants'
import { ItemList } from '../ItemMenu/ItemList'

type MenuContentProps = {
  handleCloseDrawer?: () => void
}

export const MenuContent = ({ handleCloseDrawer }: MenuContentProps) => {
  return (
    <Fragment>
      <ItemList {...(handleCloseDrawer && { handleCloseDrawer })} />
      <DropdownMenu
        labelMenu='Eventos'
        menuList={DROPDOWN_MENU_ITENS}
        {...(handleCloseDrawer && { handleCloseDrawer })}
      />
    </Fragment>
  )
}

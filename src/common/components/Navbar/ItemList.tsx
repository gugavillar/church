import { Fragment } from 'react'

import { ITENS_MENU } from './constants'
import { ItemMenu } from './ItemMenu'

type ItemListProps = {
  handleCloseDrawer: () => void
  pathname: string
}

export const ItemList = ({ pathname, handleCloseDrawer }: ItemListProps) => {
  return (
    <Fragment>
      {ITENS_MENU.map((item) => (
        <ItemMenu
          key={item.label}
          item={item}
          activeUrl={pathname}
          handleCloseDrawer={handleCloseDrawer}
        />
      ))}
    </Fragment>
  )
}

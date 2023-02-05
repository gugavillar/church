import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { ITENS_MENU } from '../constants'
import { ItemMenu } from './ItemMenu'

type ItemListProps = {
  handleCloseDrawer?: () => void
}

export const ItemList = ({ handleCloseDrawer }: ItemListProps) => {
  const { pathname } = useRouter()
  return (
    <Fragment>
      {ITENS_MENU.map((item) => (
        <ItemMenu
          key={item.label}
          item={item}
          activeUrl={pathname}
          {...(handleCloseDrawer && { handleCloseDrawer })}
        />
      ))}
    </Fragment>
  )
}

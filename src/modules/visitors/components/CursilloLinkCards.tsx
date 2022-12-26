import { UserPlus, UserList } from 'phosphor-react'
import { Fragment } from 'react'

import { CardButton } from '@common/components'

const defaultHeightAndWidthForIcons = {
  width: 64,
  height: 64
}

const CARDS_OBJECTS = [
  {
    icon: <UserPlus {...defaultHeightAndWidthForIcons} />,
    title: 'Adicionar Cursilhista',
    url: '/cursilho/adicionar_cursilhista'
  },
  {
    icon: <UserList {...defaultHeightAndWidthForIcons} />,
    title: 'Listar Cursilhistas',
    url: '/cursilho/listar_cursilhistas'
  }
]

export const CursilloLinkCards = () => {
  return (
    <Fragment>
      {CARDS_OBJECTS.map((card) => (
        <CardButton
          key={card.title}
          cardProps={card}
        />
      ))}
    </Fragment>
  )
}

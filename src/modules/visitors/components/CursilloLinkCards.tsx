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
    title: 'Adicionar Cursilhista'
  },
  {
    icon: <UserList {...defaultHeightAndWidthForIcons} />,
    title: 'Listar Cursilhistas'
  }
]

export const CursilloLinkCards = () => {
  return (
    <Fragment>
      {CARDS_OBJECTS.map((card) => (
        <CardButton
          key={card.title}
          icon={card.icon}
          title={card.title}
        />
      ))}
    </Fragment>
  )
}

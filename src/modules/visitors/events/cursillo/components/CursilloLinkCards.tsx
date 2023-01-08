import { UserPlus, UserList, Handshake, UsersThree } from 'phosphor-react'
import { Fragment } from 'react'

import { CardButton } from '@common/components'

const defaultHeightAndWidthForIcons = {
  width: 64,
  height: 64,
  color: 'black'
}

const CARDS_OBJECTS = [
  {
    icon: <UserPlus {...defaultHeightAndWidthForIcons} />,
    title: 'Inscrever-se',
    url: 'adicionar_cursilhista'
  },
  {
    icon: <UserList {...defaultHeightAndWidthForIcons} />,
    title: 'Cursilhistas inscritos',
    url: 'listar_cursilhistas'
  },
  {
    icon: <Handshake {...defaultHeightAndWidthForIcons} />,
    title: 'Voluntariar-se',
    url: 'adicionar_voluntários'
  },
  {
    icon: <UsersThree {...defaultHeightAndWidthForIcons} />,
    title: 'Voluntários inscritos',
    url: 'listar_voluntários'
  }
]

type CursilloLinkCardsPros = {
  gender: 'masculino' | 'feminino'
}

export const CursilloLinkCards = ({ gender }: CursilloLinkCardsPros) => {
  return (
    <Fragment>
      {CARDS_OBJECTS.map((card) => (
        <CardButton
          key={card.title}
          cardProps={card}
          gender={gender}
        />
      ))}
    </Fragment>
  )
}

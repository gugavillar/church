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
    title: 'Inscreva-se aqui',
    url: 'adicionar_cursilhista'
  },
  {
    icon: <UserList {...defaultHeightAndWidthForIcons} />,
    title: 'Listar inscritos',
    url: 'listar_cursilhistas'
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

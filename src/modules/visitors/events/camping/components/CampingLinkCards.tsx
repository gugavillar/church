import { Person, UserList } from 'phosphor-react'
import { Fragment } from 'react'

import { CardButton } from '@common/components'

const defaultHeightAndWidthForIcons = {
  width: 64,
  height: 64,
  color: 'black'
}

const CARDS_OBJECTS = [
  {
    icon: <Person {...defaultHeightAndWidthForIcons} />,
    title: 'Inscrever-se',
    url: 'adicionar_jovem'
  },
  {
    icon: <UserList {...defaultHeightAndWidthForIcons} />,
    title: 'Jovens',
    url: 'listar_jovens'
  }
]

export const CampingLinkCards = () => {
  return (
    <Fragment>
      {CARDS_OBJECTS.map((card) => (
        <CardButton
          key={card.title}
          cardProps={card}
          urlNavigation='/eventos/acampamento/'
        />
      ))}
    </Fragment>
  )
}

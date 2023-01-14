import { UserPlus, UserList } from 'phosphor-react'
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
    url: 'adicionar'
  },
  {
    icon: <UserList {...defaultHeightAndWidthForIcons} />,
    title: 'Jovens',
    url: 'listar'
  }
]

type CampingLinkCardsProps = {
  gender: 'feminino' | 'masculino'
}

export const CampingLinkCards = ({ gender }: CampingLinkCardsProps) => {
  return (
    <Fragment>
      {CARDS_OBJECTS.map((card) => (
        <CardButton
          key={card.title}
          cardProps={card}
          urlNavigation={`/eventos/acampamento/${gender}`}
        />
      ))}
    </Fragment>
  )
}

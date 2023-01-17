import { UserPlus, UserList, Handshake, UsersThree } from 'phosphor-react'
import { Fragment } from 'react'

import { CardButton } from '@common/components'

import { Gender } from '@common/@types'

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
    title: 'Cursilhistas',
    url: 'listar'
  },
  {
    icon: <Handshake {...defaultHeightAndWidthForIcons} />,
    title: 'Voluntariar-se',
    url: 'adicionar'
  },
  {
    icon: <UsersThree {...defaultHeightAndWidthForIcons} />,
    title: 'Voluntários',
    url: 'listar'
  }
]

type CursilloLinkCardsPros = {
  gender: Gender
  isOpenSubscription: boolean
}

export const CursilloLinkCards = ({ gender, isOpenSubscription }: CursilloLinkCardsPros) => {
  return (
    <Fragment>
      {CARDS_OBJECTS.map((card) => {
        const isDisabled = card.url === 'adicionar' ? isOpenSubscription : true
        return (
          <CardButton
            key={card.title}
            cardProps={card}
            isDisabled={isDisabled}
            urlNavigation={`/eventos/cursilho/${gender}`}
          />
        )
      })}
    </Fragment>
  )
}

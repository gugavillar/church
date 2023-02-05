import { Fragment } from 'react'

import { SimpleGrid, Box } from '@chakra-ui/react'

import { PageTitle, PageSubtitle } from '@common/components'

import { ACTUAL_YEAR } from '@common/constants'
import { useDatabaseAccessError } from '@common/hooks'

import { CursilloLinkCards } from './components/CursilloLinkCards'

const cursilhistsErrorParams = {
  key: 'cursilhistsError',
  description: 'Falha ao carregar os cursilhistas.'
}

const isOpenMaleSubscriptionErrorParams = {
  key: 'isOpenMaleSubscription',
  description: 'Não tem inscrições abertas para o cursilho masculino.'
}

const isOpenFemaleSubscriptionErrorParams = {
  key: 'isOpenFemaleSubscription',
  description: 'Não tem inscrições abertas para o cursilho feminino.'
}

type CursilloProps = {
  isOpenMaleSubscription: boolean
  isOpenFemaleSubscription: boolean
}

const Cursillo = ({ isOpenMaleSubscription, isOpenFemaleSubscription }: CursilloProps) => {
  useDatabaseAccessError({ ...cursilhistsErrorParams })
  useDatabaseAccessError({ ...isOpenMaleSubscriptionErrorParams })
  useDatabaseAccessError({ ...isOpenFemaleSubscriptionErrorParams })
  return (
    <Fragment>
      <PageTitle>Cursilho de cristandade {ACTUAL_YEAR}</PageTitle>
      <Box mb={8}>
        <PageSubtitle>Feminino</PageSubtitle>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 2 }}
          spacing={8}
          justifyItems='center'
          alignItems='center'
        >
          <CursilloLinkCards
            gender='feminino'
            isOpenSubscription={isOpenFemaleSubscription}
          />
        </SimpleGrid>
      </Box>
      <Box>
        <PageSubtitle>Masculino</PageSubtitle>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 2 }}
          spacing={8}
          justifyItems='center'
        >
          <CursilloLinkCards
            gender='masculino'
            isOpenSubscription={isOpenMaleSubscription}
          />
        </SimpleGrid>
      </Box>
    </Fragment>
  )
}

export default Cursillo

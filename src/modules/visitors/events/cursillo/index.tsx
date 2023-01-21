import { Fragment } from 'react'

import { Heading, SimpleGrid, Box } from '@chakra-ui/react'

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
      <Heading
        as='h2'
        fontSize='lg'
        mb={6}
      >
        Cursilho de cristandade {ACTUAL_YEAR}
      </Heading>
      <Box mb={8}>
        <Heading
          as='h3'
          fontSize='md'
          mb={6}
        >
          Feminino
        </Heading>
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
        <Heading
          as='h3'
          fontSize='md'
          mb={6}
        >
          Masculino
        </Heading>
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

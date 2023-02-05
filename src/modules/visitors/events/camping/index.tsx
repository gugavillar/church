import { Fragment } from 'react'

import { SimpleGrid, Box } from '@chakra-ui/react'

import { PageTitle, PageSubtitle } from '@common/components'

import { ACTUAL_YEAR } from '@common/constants'

import { CampingLinkCards } from './components/CampingLinkCards'

const Camping = () => {
  return (
    <Fragment>
      <Box mb={8}>
        <PageTitle>Acampamento de jovens {ACTUAL_YEAR}</PageTitle>
        <Box mb={8}>
          <PageSubtitle>Masculino</PageSubtitle>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 2 }}
            spacing={8}
            justifyItems='center'
            alignItems='center'
          >
            <CampingLinkCards gender='masculino' />
          </SimpleGrid>
        </Box>
        <Box>
          <PageSubtitle>Feminino</PageSubtitle>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 2 }}
            spacing={8}
            justifyItems='center'
            alignItems='center'
          >
            <CampingLinkCards gender='feminino' />
          </SimpleGrid>
        </Box>
      </Box>
    </Fragment>
  )
}

export default Camping

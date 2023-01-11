import { Fragment } from 'react'

import { Heading, SimpleGrid, Box } from '@chakra-ui/react'

import { ACTUAL_YEAR } from '@common/constants'

import { CampingLinkCards } from './components/CampingLinkCards'

const Camping = () => {
  return (
    <Fragment>
      <Box mb={8}>
        <Heading
          as='h2'
          fontSize='lg'
          mb={6}
        >
          Acampamento de jovens {ACTUAL_YEAR}
        </Heading>
        <Box mb={8}>
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
            alignItems='center'
          >
            <CampingLinkCards gender='masculino' />
          </SimpleGrid>
        </Box>
        <Box>
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
            <CampingLinkCards gender='feminino' />
          </SimpleGrid>
        </Box>
      </Box>
    </Fragment>
  )
}

export default Camping

import { Fragment } from 'react'

import { Heading, SimpleGrid, Box } from '@chakra-ui/react'

import { ACTUAL_YEAR } from '@common/constants'

import { CursilloLinkCards } from './components/CursilloLinkCards'

const Cursillo = () => {
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
          <CursilloLinkCards gender='feminino' />
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
          <CursilloLinkCards gender='masculino' />
        </SimpleGrid>
      </Box>
    </Fragment>
  )
}

export default Cursillo

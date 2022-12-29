import { Fragment } from 'react'

import { Heading, SimpleGrid, Box } from '@chakra-ui/react'

import { CursilloLinkCards } from '@visitors/components'

const Cursillo = () => {
  return (
    <Fragment>
      <Box mb={8}>
        <Heading
          as='h3'
          fontSize='md'
          mb={6}
        >
          Cursilho Feminino
        </Heading>
        <SimpleGrid
          minChildWidth={64}
          spacing={8}
          justifyItems='center'
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
          Cursilho Masculino
        </Heading>
        <SimpleGrid
          minChildWidth={64}
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

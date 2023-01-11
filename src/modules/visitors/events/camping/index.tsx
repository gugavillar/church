import { Fragment } from 'react'

import { Heading, SimpleGrid, Box } from '@chakra-ui/react'

import { CampingLinkCards } from './components/CampingLinkCards'

const Camping = () => {
  return (
    <Fragment>
      <Box mb={8}>
        <Heading
          as='h3'
          fontSize='md'
          mb={6}
        >
          Acampamento de jovens
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 2 }}
          spacing={8}
          justifyItems='center'
          alignItems='center'
        >
          <CampingLinkCards />
        </SimpleGrid>
      </Box>
    </Fragment>
  )
}

export default Camping

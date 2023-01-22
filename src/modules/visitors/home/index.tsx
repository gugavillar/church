import { Fragment } from 'react'

import { Heading, Box } from '@chakra-ui/react'

import { useDatabaseAccessError } from '@common/hooks'

import { Footer } from './components/Footer'

const configurationsErrorParams = {
  key: 'configurations',
  description: 'Falha ao carregar as configurações dos eventos'
}

const Home = () => {
  useDatabaseAccessError({ ...configurationsErrorParams })
  return (
    <Fragment>
      <Box as='main'>
        <Heading>Home</Heading>
      </Box>
      <Footer />
    </Fragment>
  )
}

export default Home

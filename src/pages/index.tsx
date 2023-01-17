import { Heading } from '@chakra-ui/react'

import { useDatabaseAccessError } from '@common/hooks'

const configurationsErrorParams = {
  key: 'configurations',
  description: 'Falha ao carregar as configurações dos eventos'
}

const Home = () => {
  useDatabaseAccessError({ ...configurationsErrorParams })
  return <Heading>Home</Heading>
}

export default Home

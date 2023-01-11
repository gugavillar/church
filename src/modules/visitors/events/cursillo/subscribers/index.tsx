import { useRouter } from 'next/router'

import { Heading, Box, Text, Card, CardHeader, CardBody } from '@chakra-ui/react'

import { CursilhistTable } from './components/CursilhistTable'

const ACTUAL_YEAR = new Date().getFullYear()

const CursilhistSubscribers = () => {
  const { query } = useRouter()
  return (
    <Box>
      <Heading as='h2'>Listagem dos cursilhistas</Heading>
      <Card
        bg='white'
        mt={6}
      >
        <CardHeader>
          <Text fontSize='sm'>
            Cursilho {query.gender} {ACTUAL_YEAR}
          </Text>
        </CardHeader>
        <CardBody>
          <CursilhistTable />
        </CardBody>
      </Card>
    </Box>
  )
}

export default CursilhistSubscribers

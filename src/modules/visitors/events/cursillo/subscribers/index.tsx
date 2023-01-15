import { useRouter } from 'next/router'

import { Heading, Box, Text, Card, CardHeader, CardBody } from '@chakra-ui/react'

import { ACTUAL_YEAR } from '@common/constants'
import { Cursilhists } from '@pages/eventos/cursilho/[gender]/listar'

import { CursilhistTable } from './components/CursilhistTable'

type CursilhistSubscribersProps = {
  cursilhists: Cursilhists
}

const CursilhistSubscribers = ({ cursilhists }: CursilhistSubscribersProps) => {
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
          <CursilhistTable cursilhists={cursilhists} />
        </CardBody>
      </Card>
    </Box>
  )
}

export default CursilhistSubscribers

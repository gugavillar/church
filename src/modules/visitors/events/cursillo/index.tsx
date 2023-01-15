import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'

import { Heading, SimpleGrid, Box, useToast } from '@chakra-ui/react'

import { ACTUAL_YEAR, ERROR_TOAST } from '@common/constants'

import { CursilloLinkCards } from './components/CursilloLinkCards'

const Cursillo = () => {
  const { push, query } = useRouter()
  const toast = useToast()

  useEffect(() => {
    if (query?.cursilhistsError) {
      toast({
        ...ERROR_TOAST,
        title: 'Ocorreu uma falha',
        description: 'Falha ao carregar os cursilhistas.'
      })
      push('/eventos/cursilho', undefined, { shallow: true })
    }
  }, [push, query?.cursilhistsError, toast])

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

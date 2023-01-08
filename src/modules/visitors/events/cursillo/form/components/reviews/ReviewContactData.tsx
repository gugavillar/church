import { Heading, Box, Flex } from '@chakra-ui/react'

import { IfComponent, ExhibitionData } from '@common/components'

import { CursilhistStateReducer } from '../..'

type ReviewPersonDataProps = {
  data: Pick<
    CursilhistStateReducer,
    'zipCode' | 'street' | 'number' | 'neighborhood' | 'referencePoint' | 'city' | 'state'
  >
}

export const ReviewContactData = ({
  data: { zipCode, city, neighborhood, number, state, street, referencePoint }
}: ReviewPersonDataProps) => {
  return (
    <Box mt={4}>
      <Heading
        as='h4'
        fontSize='sm'
        color='gray.900'
      >
        Endereço
      </Heading>
      <ExhibitionData
        label='CEP:'
        data={zipCode}
      />
      <Flex
        direction={{ base: 'column', md: 'row', lg: 'row' }}
        gap={{ base: 0, md: 2, lg: 2 }}
      >
        <ExhibitionData
          label='Endereço:'
          data={street}
        />
        <ExhibitionData
          label='N˚:'
          data={number}
        />
      </Flex>
      <Flex
        direction={{ base: 'column', md: 'row', lg: 'row' }}
        gap={{ base: 0, md: 2, lg: 2 }}
      >
        <ExhibitionData
          label='Bairro:'
          data={neighborhood}
        />

        <ExhibitionData
          label='Cidade:'
          data={city}
        />

        <ExhibitionData
          label='Estado:'
          data={state}
        />
      </Flex>
      <IfComponent
        conditional={Boolean(referencePoint)}
        component={
          <ExhibitionData
            label='Ponto de referência:'
            data={referencePoint}
          />
        }
      />
    </Box>
  )
}

import { Heading, Box, Flex } from '@chakra-ui/react'

import { IfComponent, ExhibitionData } from '@common/components'

import { calculateAge } from '@common/formatters'

import { CursilhistStateReducer } from '..'

type ReviewPersonDataProps = {
  data: Pick<
    CursilhistStateReducer,
    'name' | 'likeToBeCalled' | 'birthDate' | 'phone' | 'email' | 'maritalStatus' | 'spouse' | 'closeRelative'
  >
}

export const ReviewPersonData = ({
  data: { birthDate, likeToBeCalled, maritalStatus, name, phone, closeRelative, email, spouse }
}: ReviewPersonDataProps) => {
  return (
    <Box>
      <Heading
        as='h4'
        fontSize='md'
      >
        Dados pessoais
      </Heading>
      <Flex
        direction={{ base: 'column', md: 'row', lg: 'row' }}
        gap={{ base: 0, md: 2, lg: 2 }}
      >
        <ExhibitionData
          label='Nome:'
          data={name}
        />
        <ExhibitionData
          label='Como deseja ser chamado:'
          data={likeToBeCalled}
        />
      </Flex>
      <ExhibitionData
        label='Data de nascimento:'
        data={`${birthDate} (${calculateAge(birthDate)} anos)`}
      />
      <Flex
        direction={{ base: 'column', md: 'row', lg: 'row' }}
        gap={{ base: 0, md: 2, lg: 2 }}
      >
        <ExhibitionData
          label='Celular:'
          data={phone}
        />
        <IfComponent
          conditional={Boolean(email)}
          component={
            <ExhibitionData
              label='Email:'
              data={email}
            />
          }
        />
      </Flex>
      <ExhibitionData
        label='Estado civil:'
        data={maritalStatus}
      />
      <IfComponent
        conditional={Boolean(closeRelative?.name)}
        component={
          <Flex
            direction={{ base: 'column', md: 'row', lg: 'row' }}
            gap={{ base: 0, md: 2, lg: 2 }}
          >
            <ExhibitionData
              label='Parente próximo:'
              data={closeRelative?.name}
            />
            <ExhibitionData
              label='Contato do parente próximo:'
              data={closeRelative?.phone}
            />
          </Flex>
        }
      />
      <IfComponent
        conditional={Boolean(spouse?.name)}
        component={
          <Flex
            direction={{ base: 'column', md: 'row', lg: 'row' }}
            gap={{ base: 0, md: 2, lg: 2 }}
          >
            <ExhibitionData
              label='Cônjuge:'
              data={spouse?.name}
            />
            <ExhibitionData
              label='Contato do cônjuge:'
              data={spouse?.phone}
            />
            <ExhibitionData
              label='Número de filhos:'
              data={String(spouse?.numberOfChildren)}
            />
          </Flex>
        }
      />
    </Box>
  )
}

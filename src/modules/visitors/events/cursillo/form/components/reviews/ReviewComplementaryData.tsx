import { Heading, Box, Flex } from '@chakra-ui/react'

import { IfComponent, ExhibitionData } from '@common/components'

import { booleanToText } from '@common/formatters'

import { CursilhistStateReducer } from '../..'

type ReviewPersonDataProps = {
  data: Pick<
    CursilhistStateReducer,
    | 'religion'
    | 'church'
    | 'education'
    | 'occupation'
    | 'workplace'
    | 'workplacePhone'
    | 'hasHealthProblems'
    | 'healthProblems'
    | 'hasDietOrFoodRestriction'
    | 'dietOrFoodRestriction'
    | 'wish'
  >
}

export const ReviewComplementaryData = ({
  data: {
    church,
    religion,
    wish,
    dietOrFoodRestriction,
    education,
    hasDietOrFoodRestriction,
    hasHealthProblems,
    healthProblems,
    occupation,
    workplace,
    workplacePhone
  }
}: ReviewPersonDataProps) => {
  return (
    <Box mt={4}>
      <Heading
        as='h4'
        fontSize='md'
      >
        Dados complementares
      </Heading>
      <Flex
        direction={{ base: 'column', md: 'row', lg: 'row' }}
        gap={{ base: 0, md: 2, lg: 2 }}
      >
        <ExhibitionData
          label='Religião:'
          data={religion}
        />
        <ExhibitionData
          label='Igreja:'
          data={church}
        />
      </Flex>
      <IfComponent
        conditional={Boolean(education) || Boolean(occupation)}
        component={
          <Flex
            direction={{ base: 'column', md: 'row', lg: 'row' }}
            gap={{ base: 0, md: 2, lg: 2 }}
          >
            <IfComponent
              conditional={Boolean(education)}
              component={
                <ExhibitionData
                  label='Escolaridade:'
                  data={education}
                />
              }
            />
            <IfComponent
              conditional={Boolean(occupation)}
              component={
                <ExhibitionData
                  label='Profissão:'
                  data={occupation}
                />
              }
            />
          </Flex>
        }
      />
      <IfComponent
        conditional={Boolean(workplace) || Boolean(workplacePhone)}
        component={
          <Flex
            direction={{ base: 'column', md: 'row', lg: 'row' }}
            gap={{ base: 0, md: 2, lg: 2 }}
          >
            <IfComponent
              conditional={Boolean(workplace)}
              component={
                <ExhibitionData
                  label='Empresa:'
                  data={workplace}
                />
              }
            />
            <IfComponent
              conditional={Boolean(workplacePhone)}
              component={
                <ExhibitionData
                  label='Telefone:'
                  data={workplacePhone}
                />
              }
            />
          </Flex>
        }
      />
      <ExhibitionData
        label='Problema(s) de saúde:'
        data={booleanToText(String(hasHealthProblems), '1')}
      />
      <IfComponent
        conditional={hasHealthProblems === '1'}
        component={
          <ExhibitionData
            label='Descrição do problema(s) de saúde:'
            data={healthProblems}
          />
        }
      />
      <ExhibitionData
        label='Realiza dieta ou restrição alimentar:'
        data={booleanToText(String(hasDietOrFoodRestriction), '1')}
      />
      <IfComponent
        conditional={hasDietOrFoodRestriction === '1'}
        component={
          <ExhibitionData
            label='Descrição da dieta ou restrição alimentar:'
            data={dietOrFoodRestriction}
          />
        }
      />
      <ExhibitionData
        label='Motivo de realizar o cursilho:'
        data={wish}
      />
    </Box>
  )
}

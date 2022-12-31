import { useRouter } from 'next/router'

import { Heading, Box } from '@chakra-ui/react'

import { BRAZILIAN_STATES, EDUCATION_LEVEL, MARITAL_STATUS, OCCUPATIONS } from '@common/constants'

import { CursilloFormInstructions } from './components/CursilloFormInstructions'
import { CursilloFormSubscription } from './CursilloFormSubscription'

export type NewCursilhistForm = {
  name: string
  likeToBeCalled: string
  birthDate: number | null
  phone: number | null
  email?: string
  maritalStatus: typeof MARITAL_STATUS[number]['value'] | ''
  zipCode: number | null
  street: string
  number: string
  neighborhood: string
  city: string
  state: typeof BRAZILIAN_STATES[number]['value'] | ''
  referencePoint?: string
  spouse?: {
    name: string
    phone: number | null
    numberOfChildren: number | null
  }
  closeRelative?: {
    name: string
    phone: number | null
  }
  religion: string
  church: string
  education?: typeof EDUCATION_LEVEL[number]['value']
  occupation?: typeof OCCUPATIONS[number]['value']
  workplace?: string
  workplacePhone?: number
  healthProblems?: string
  hasDietOrFoodRestriction: '1' | '0'
  dietOrFoodRestriction?: string
  wish: string
}

const ACTUAL_YEAR = new Date().getFullYear()

const NewCursilhist = () => {
  const { query } = useRouter()
  return (
    <Box>
      <Heading
        as='h2'
        fontSize='lg'
        textAlign='center'
        mb={6}
      >
        Cursilho {query.gender} de cristandade vida - {ACTUAL_YEAR}
      </Heading>
      <CursilloFormInstructions />
      <CursilloFormSubscription gender={query.gender as 'masculino' | 'feminino'} />
    </Box>
  )
}

export default NewCursilhist

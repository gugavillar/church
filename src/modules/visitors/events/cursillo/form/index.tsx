import { useRouter } from 'next/router'
import { useMemo, useReducer } from 'react'

import { Heading, Box } from '@chakra-ui/react'

import { Steps } from '@common/components'

import { BRAZILIAN_STATES, EDUCATION_LEVEL, MARITAL_STATUS, OCCUPATIONS } from '@common/constants'
import { useSteps } from '@common/hooks'

import { CursilloFormInstructions } from './components/CursilloFormInstructions'
import { CursilloFormSubscription, defaultFormValues } from './components/CursilloFormSubscription'
import { PaymentData } from './components/PaymentData'
import { ReviewData } from './components/ReviewData'

export type NewCursilhistForm = {
  name: string
  likeToBeCalled: string
  birthDate: string
  phone: string
  email?: string
  maritalStatus: typeof MARITAL_STATUS[number]['value'] | undefined
  zipCode: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: typeof BRAZILIAN_STATES[number]['value'] | undefined
  referencePoint?: string
  spouse?: {
    name: string
    phone: string
    numberOfChildren: number | null
  }
  closeRelative?: {
    name: string
    phone: string
  }
  religion: string
  church: string
  education?: typeof EDUCATION_LEVEL[number]['value']
  occupation?: typeof OCCUPATIONS[number]['value']
  workplace?: string
  workplacePhone?: string
  hasHealthProblems?: '1' | '0'
  healthProblems?: string
  hasDietOrFoodRestriction?: '1' | '0'
  dietOrFoodRestriction?: string
  wish: string
}

export type CursilhistStateReducer = {
  stepProgress: 'formSubscription' | 'reviewSubscription' | 'paymentSubscription'
} & NewCursilhistForm

export type CursilhistActionReducer = {
  type: 'formStep' | 'reviewStep'
  data: CursilhistStateReducer
}

const ACTUAL_YEAR = new Date().getFullYear()

const reducer = (state: CursilhistStateReducer, action: CursilhistActionReducer) => {
  switch (action.type) {
    case 'formStep':
      return {
        ...action.data
      }
    case 'reviewStep':
      return {
        ...state,
        stepProgress: action.data.stepProgress
      }
  }
}

const NewCursilhist = () => {
  const { query } = useRouter()
  const { activeStep, nextStep, prevStep } = useSteps({ stepInitial: 0, stepLength: 3 })

  const [state, dispatch] = useReducer(reducer, {
    ...defaultFormValues,
    stepProgress: 'formSubscription'
  })

  const steps = useMemo(() => {
    return [
      {
        content: (
          <CursilloFormSubscription
            gender={query.gender as 'masculino' | 'feminino'}
            nextStep={nextStep}
            dispatch={dispatch}
            reducerState={state}
          />
        )
      },
      {
        content: (
          <ReviewData
            gender={query.gender as 'masculino' | 'feminino'}
            nextStep={nextStep}
            dispatch={dispatch}
            reducerState={state}
            prevStep={prevStep}
          />
        )
      },
      {
        content: (
          <PaymentData
            reducerState={state}
            prevStep={prevStep}
          />
        )
      }
    ]
  }, [nextStep, prevStep, query.gender, state])

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
      <Steps
        activeStep={activeStep}
        steps={steps}
      />
    </Box>
  )
}

export default NewCursilhist

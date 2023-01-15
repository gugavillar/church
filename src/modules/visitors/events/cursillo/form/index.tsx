import { useRouter } from 'next/router'
import { useEffect, useMemo, useReducer } from 'react'

import { Heading, Box } from '@chakra-ui/react'

import { Steps } from '@common/components'

import { ACTUAL_YEAR, BRAZILIAN_STATES, EDUCATION_LEVEL, MARITAL_STATUS, OCCUPATIONS } from '@common/constants'
import { useSteps } from '@common/hooks'

import { ConfirmedPayment } from './components/ConfirmedPayment'
import { CursilloFormInstructions } from './components/CursilloFormInstructions'
import { CursilloFormSubscription, defaultFormValues } from './components/CursilloFormSubscription'
import { PaymentData } from './components/PaymentData'
import { ReviewData } from './components/ReviewData'

export type NewCursilhistForm = {
  id?: string
  name: string
  likeToBeCalled: string
  birthDate: string
  phone: string
  email: string
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
  method?: 'credit' | 'money' | 'pix'
}

export type CursilhistStateReducer = {
  stepProgress: 'formSubscription' | 'reviewSubscription' | 'paymentSubscription' | 'confirmSubscription'
} & NewCursilhistForm

export type CursilhistActionReducer = {
  type?: 'formStep' | 'reviewStep' | 'paymentStep' | 'confirmStep'
  data: CursilhistStateReducer
}

type NewCursilhistProps = {
  cursilhist: NewCursilhistForm
}

const reducer = (state: CursilhistStateReducer, action: CursilhistActionReducer) => {
  switch (action.type) {
    case 'formStep':
      return {
        ...action.data
      }
    case 'reviewStep':
      return {
        ...state,
        stepProgress: action.data.stepProgress,
        id: action.data.id
      }
    case 'paymentStep':
      return {
        ...state,
        stepProgress: action.data.stepProgress,
        method: action.data.method
      }
    case 'confirmStep':
      return {
        ...action.data,
        stepProgress: action.data.stepProgress
      }
    default:
      return {
        ...state,
        stepProgress: action.data.stepProgress
      }
  }
}

const NewCursilhist = ({ cursilhist }: NewCursilhistProps) => {
  const { query } = useRouter()
  const { activeStep, setActiveStep } = useSteps({ stepInitial: 0, stepLength: 3 })

  const [state, dispatch] = useReducer(reducer, {
    ...defaultFormValues,
    stepProgress: 'formSubscription'
  })

  useEffect(() => {
    switch (state?.stepProgress) {
      case 'formSubscription':
        return setActiveStep(0)
      case 'reviewSubscription':
        return setActiveStep(1)
      case 'paymentSubscription':
        return setActiveStep(2)
      case 'confirmSubscription':
        return setActiveStep(3)
      default:
        return setActiveStep(0)
    }
  }, [setActiveStep, state?.stepProgress])

  useEffect(() => {
    cursilhist &&
      dispatch({
        type: 'confirmStep',
        data: { ...cursilhist, stepProgress: query?.payment === 'true' ? 'confirmSubscription' : 'reviewSubscription' }
      })
  }, [cursilhist, query?.payment])

  const steps = useMemo(() => {
    return [
      {
        content: (
          <CursilloFormSubscription
            gender={query.gender as 'masculino' | 'feminino'}
            dispatch={dispatch}
            reducerState={state}
          />
        )
      },
      {
        content: (
          <ReviewData
            gender={query.gender as 'masculino' | 'feminino'}
            dispatch={dispatch}
            reducerState={state}
          />
        )
      },
      {
        content: (
          <PaymentData
            reducerState={state}
            dispatch={dispatch}
          />
        )
      },
      {
        content: (
          <ConfirmedPayment
            gender={query.gender as 'masculino' | 'feminino'}
            reducerState={state}
          />
        )
      }
    ]
  }, [query.gender, state])

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

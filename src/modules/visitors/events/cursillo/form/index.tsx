import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

import { Box } from '@chakra-ui/react'

import { Steps, PageTitle } from '@common/components'

import { Gender } from '@common/@types'
import { ACTUAL_YEAR } from '@common/constants'
import { useSteps } from '@common/hooks'

import { ConcludedSubscription } from './components/ConcludedSubscription'
import { Form, NewCursilhistForm } from './components/Form'
import { CursilloFormSubscription } from './components/FormSubscription'
import { Instructions } from './components/Instructions'
import { PaymentData } from './components/PaymentSubscription'
import { ReviewData } from './components/ReviewSubscription'

type CursilhistStepProgress = 'formSubscription' | 'reviewSubscription' | 'paymentSubscription' | 'confirmSubscription'

type NewCursilhistProps = {
  cursilhist: NewCursilhistForm
  stepProgress: CursilhistStepProgress
}

const NewCursilhist = ({ cursilhist, stepProgress }: NewCursilhistProps) => {
  const { query } = useRouter()
  const { activeStep, setActiveStep, prevStep, nextStep } = useSteps({ stepInitial: 0, stepLength: 3 })

  useEffect(() => {
    if (stepProgress === 'reviewSubscription') {
      setActiveStep(1)
    } else {
      setActiveStep(0)
    }
  }, [setActiveStep, stepProgress])

  const steps = useMemo(() => {
    return [
      {
        content: (
          <CursilloFormSubscription
            gender={query.gender as Gender}
            handleNextStep={nextStep}
          />
        )
      },
      {
        content: (
          <ReviewData
            gender={query.gender as Gender}
            handlePrevStep={prevStep}
            handleNextStep={nextStep}
          />
        )
      },
      {
        content: (
          <PaymentData
            handlePrevStep={prevStep}
            handleNextStep={nextStep}
          />
        )
      },
      {
        content: <ConcludedSubscription handlePrevStep={prevStep} />
      }
    ]
  }, [nextStep, prevStep, query.gender])

  return (
    <Box>
      <PageTitle textAlign='center'>
        Cursilho {query.gender} de cristandade vida - {ACTUAL_YEAR}
      </PageTitle>
      <Instructions />
      <Form cursilhist={cursilhist}>
        <Steps
          activeStep={activeStep}
          steps={steps}
        />
      </Form>
    </Box>
  )
}

export default NewCursilhist

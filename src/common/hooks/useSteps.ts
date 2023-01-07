import { useState } from 'react'

type StepsHookProps = {
  stepInitial: number
  stepLength: number
}

export const useSteps = ({ stepInitial, stepLength }: StepsHookProps) => {
  const [activeStep, setActiveStep] = useState(stepInitial)

  const nextStep = () => {
    setActiveStep((currentStep) => {
      if (currentStep === stepLength) return currentStep

      return currentStep + 1
    })
  }

  const prevStep = () => {
    setActiveStep((currentStep) => {
      if (currentStep === 0) return currentStep

      return currentStep - 1
    })
  }

  return { nextStep, prevStep, activeStep, setActiveStep }
}

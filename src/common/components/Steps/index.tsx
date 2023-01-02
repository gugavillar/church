import { ReactNode } from 'react'

import { Box } from '@chakra-ui/react'

import { StepsIndicators } from './StepsIndicators'

type StepsProps = {
  steps: Array<{
    content: ReactNode
  }>
  activeStep: number
}

export const Steps = ({ activeStep, steps }: StepsProps) => {
  return (
    <Box>
      <StepsIndicators
        steps={steps}
        activeStep={activeStep}
      />
      <Box mt={6}>{steps[activeStep].content}</Box>
    </Box>
  )
}

import { Check } from 'phosphor-react'
import { Fragment, ReactNode } from 'react'
import { generate } from 'short-uuid'

import { Divider, Flex } from '@chakra-ui/react'

import { IfComponent } from '@common/components/IfComponent'

const Checked = () => (
  <Check
    height={24}
    width={24}
  />
)

type StepsIndicatorsProps = {
  steps: Array<{
    content: ReactNode
  }>
  activeStep: number
}

const notCompleteStepProps = {
  bg: 'transparent',
  color: 'black',
  border: '1px solid',
  borderColor: 'gray.900'
}

const completeStepProps = {
  bg: 'gray.500',
  color: 'white',
  border: 'none'
}

const lastStepProps = {
  bg: 'green.500',
  color: 'white',
  border: 'none'
}

const styledStep = (activeStep: number, index: number, isLastStep: boolean) => {
  if (activeStep > index) return completeStepProps
  if (isLastStep) return lastStepProps
  return notCompleteStepProps
}

export const StepsIndicators = ({ steps, activeStep }: StepsIndicatorsProps) => {
  const realStepLength = steps?.length - 1
  const isLastStep = realStepLength === activeStep

  return (
    <Flex
      width='full'
      height={12}
      align='center'
      justify='space-between'
    >
      {steps.map((step, index) => (
        <Fragment key={generate()}>
          <Flex
            rounded='full'
            {...styledStep(activeStep, index, isLastStep)}
            minH={{ base: '48px', md: '56px' }}
            minW={{ base: '48px', md: '56px' }}
            textAlign='center'
            lineHeight={1}
            fontSize={{ base: 'xs', md: 'sm' }}
            align='center'
            justify='center'
          >
            {activeStep > index || isLastStep ? Checked() : index + 1}
          </Flex>
          <IfComponent
            conditional={index + 1 < steps.length}
            component={<Divider />}
          />
        </Fragment>
      ))}
    </Flex>
  )
}

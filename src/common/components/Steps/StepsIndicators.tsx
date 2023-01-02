import { Check } from 'phosphor-react'
import { Fragment, ReactNode } from 'react'
import { generate } from 'short-uuid'

import { Divider, Flex } from '@chakra-ui/react'

import { IfComponent } from '../IfComponent'

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
  border: '1px solid gray'
}

const completeStepProps = {
  bg: 'gray',
  color: 'white',
  border: 'none'
}

export const StepsIndicators = ({ steps, activeStep }: StepsIndicatorsProps) => {
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
            {...(activeStep > index ? { ...completeStepProps } : { ...notCompleteStepProps })}
            minH='56px'
            minW='56px'
            textAlign='center'
            lineHeight={1}
            fontSize='sm'
            align='center'
            justify='center'
          >
            {activeStep > index ? Checked() : index + 1}
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

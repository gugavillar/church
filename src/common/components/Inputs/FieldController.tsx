import { ReactNode } from 'react'

import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/react'

import { IfComponent } from '@common/components'

type FieldControllerProps = {
  label: string
  error: string
  children: ReactNode
  isRequired?: boolean
  helperText?: string
}

export const FieldController = ({ error, isRequired, children, label, helperText }: FieldControllerProps) => {
  return (
    <FormControl
      {...(isRequired && { isRequired })}
      isInvalid={Boolean(error)}
    >
      <FormLabel fontSize='sm'>{label}</FormLabel>

      {children}

      <IfComponent
        conditional={Boolean(helperText) && !Boolean(error)}
        component={<FormHelperText>{helperText}</FormHelperText>}
      />

      <IfComponent
        conditional={Boolean(error)}
        component={<FormErrorMessage>{error}</FormErrorMessage>}
      />
    </FormControl>
  )
}

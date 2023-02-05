import { ReactNode } from 'react'

import { FormControl, FormControlProps, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/react'

import { IfComponent } from '@common/components'

type FieldControllerProps = FormControlProps & {
  label: string
  error: string
  children: ReactNode
  isRequired?: boolean
  helperText?: string
}

export const FieldController = ({ error, isRequired, children, label, helperText, ...props }: FieldControllerProps) => {
  return (
    <FormControl
      {...(isRequired && { isRequired })}
      isInvalid={Boolean(error)}
      {...props}
    >
      <FormLabel
        fontSize={{ base: 'xs', md: 'sm' }}
        color='gray.500'
      >
        {label}
      </FormLabel>

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

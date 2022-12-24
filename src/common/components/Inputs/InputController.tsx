import { ReactNode } from 'react'

import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/react'

import { IfComponent } from '@common/components'

type InputControllerProps = {
  label: string
  isError: boolean
  children: ReactNode
  isRequired?: boolean
  errorMessage?: string
  helperText?: string
}

export const InputController = ({
  isError,
  isRequired,
  children,
  label,
  errorMessage,
  helperText
}: InputControllerProps) => {
  return (
    <FormControl
      {...(isRequired && { isRequired })}
      isInvalid={isError}
    >
      <FormLabel fontSize='sm'>{label}</FormLabel>

      {children}

      <IfComponent
        conditional={Boolean(helperText)}
        component={<FormHelperText>{helperText}</FormHelperText>}
      />

      <IfComponent
        conditional={Boolean(errorMessage)}
        component={<FormErrorMessage>{errorMessage}</FormErrorMessage>}
      />
    </FormControl>
  )
}

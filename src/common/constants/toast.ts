import { UseToastOptions } from '@chakra-ui/react'

export const SUCCESS_TOAST: UseToastOptions = {
  status: 'success',
  duration: 3000,
  isClosable: true,
  variant: 'left-accent',
  position: 'top-right'
}

export const ERROR_TOAST: UseToastOptions = {
  status: 'error',
  duration: 3000,
  isClosable: true,
  variant: 'left-accent',
  position: 'top-right'
}

export const WARNING_TOAST: UseToastOptions = {
  status: 'warning',
  duration: 3000,
  isClosable: true,
  variant: 'left-accent',
  position: 'top-right'
}

export const INFO_TOAST: UseToastOptions = {
  status: 'info',
  duration: 3000,
  isClosable: true,
  variant: 'left-accent',
  position: 'top-right'
}

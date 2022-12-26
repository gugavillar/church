import { extendTheme } from '@chakra-ui/react'

export const globals = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'background',
        color: 'black'
      }
    }
  }
})

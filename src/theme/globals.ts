import { extendTheme } from '@chakra-ui/react'

export const globals = extendTheme({
  styles: {
    global: {
      body: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bg: 'gray.100',
        color: 'black'
      }
    }
  }
})

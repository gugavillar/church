import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import { Button, Input, Text } from './components'
import { fonts } from './fonts'
import { globals } from './globals'

export const theme = extendTheme({
  ...globals,
  ...colors,
  ...fonts,
  components: {
    Button,
    Input,
    Text
  }
})

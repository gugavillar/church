import { memo } from 'react'

import { Center, Divider, FlexProps } from '@chakra-ui/react'

type VerticalDividerProps = {
  height?: number | 'inherit'
} & FlexProps

export const VerticalDivider = memo(({ height = 'inherit', ...props }: VerticalDividerProps) => {
  return (
    <Center
      height={height}
      {...props}
    >
      <Divider
        orientation='vertical'
        opacity={1}
        borderWidth={1}
        borderColor='gray.50'
      />
    </Center>
  )
})

VerticalDivider.displayName = 'VerticalDivider'

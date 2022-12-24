import { Center, Divider, FlexProps } from '@chakra-ui/react'

type VerticalDividerProps = {
  height?: number | 'inherit'
} & FlexProps

export const VerticalDivider = ({ height = 'inherit', ...props }: VerticalDividerProps) => {
  return (
    <Center
      height={height}
      {...props}
    >
      <Divider orientation='vertical' />
    </Center>
  )
}

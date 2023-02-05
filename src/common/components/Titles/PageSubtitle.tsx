import { ReactNode } from 'react'

import { Heading, HeadingProps } from '@chakra-ui/react'

type PageSubtitleProps = HeadingProps & {
  children: ReactNode
}

export const PageSubtitle = ({ children, ...props }: PageSubtitleProps) => {
  return (
    <Heading
      as='h3'
      fontSize={['sm', 'md']}
      mb={6}
      {...props}
    >
      {children}
    </Heading>
  )
}

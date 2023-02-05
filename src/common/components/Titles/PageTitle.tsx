import { ReactNode } from 'react'

import { Heading, HeadingProps } from '@chakra-ui/react'

type PageTitleProps = HeadingProps & {
  children: ReactNode
}

export const PageTitle = ({ children, ...props }: PageTitleProps) => {
  return (
    <Heading
      as='h2'
      fontSize={['md', 'lg']}
      mb={6}
      {...props}
    >
      {children}
    </Heading>
  )
}

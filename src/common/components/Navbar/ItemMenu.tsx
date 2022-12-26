import Link from 'next/link'
import { memo } from 'react'

import { Link as ChakraLink } from '@chakra-ui/react'

type ItemMenuProps = {
  url: string
  label: string
  activeUrl: string
}

export const ItemMenu = memo(({ label, url, activeUrl }: ItemMenuProps) => {
  const labelLowerCase = label.toLowerCase()
  const isHomeLabel = label === 'Home' && activeUrl === '/'
  return (
    <Link
      href={url}
      passHref
    >
      <ChakraLink
        display={{ base: 'block', md: 'block', lg: 'flex' }}
        py={{ base: 2, md: 2 }}
        variant={{ base: 'base', md: 'base', lg: 'lg' }}
        {...(isHomeLabel && { variant: 'active' })}
        {...(activeUrl.includes(labelLowerCase) && { variant: 'active' })}
      >
        {label}
      </ChakraLink>
    </Link>
  )
})

ItemMenu.displayName = 'ItemMenu'

import Link from 'next/link'
import { memo } from 'react'

import { Text } from '@chakra-ui/react'

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
      <Text
        as='span'
        display={{ base: 'block', md: 'block', lg: 'flex' }}
        py={{ base: 2, md: 2 }}
        variant={{ base: 'baseurl', md: 'baseurl', lg: 'lg' }}
        {...(isHomeLabel && { variant: 'active' })}
        {...(activeUrl.includes(labelLowerCase) && { variant: 'active' })}
      >
        {label}
      </Text>
    </Link>
  )
})

ItemMenu.displayName = 'ItemMenu'

import Link from 'next/link'
import { memo } from 'react'

import { Text } from '@chakra-ui/react'

type ItemMenuProps = {
  url: string
  label: string
  activeUrl: string
  handleCloseDrawer: () => void
}

export const ItemMenu = memo(({ label, url, activeUrl, handleCloseDrawer }: ItemMenuProps) => {
  const labelLowerCase = label.toLowerCase()
  const isHomeLabel = label === 'Home' && activeUrl === '/'

  return (
    <Link
      href={url}
      passHref
      onClick={handleCloseDrawer}
    >
      <Text
        as='span'
        display={{ base: 'block', md: 'block', lg: 'flex' }}
        py={{ base: 2, md: 2 }}
        variant='navLink'
        {...(isHomeLabel && { variant: 'active' })}
        {...(activeUrl.includes(labelLowerCase) && { variant: 'active' })}
      >
        {label}
      </Text>
    </Link>
  )
})

ItemMenu.displayName = 'ItemMenu'

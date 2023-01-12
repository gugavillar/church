import Link from 'next/link'
import { memo } from 'react'

import { Text } from '@chakra-ui/react'

import { ITENS_MENU } from './constants'

type ItemMenuProps = {
  item: typeof ITENS_MENU[number]
  activeUrl: string
  handleCloseDrawer: () => void
}

export const ItemMenu = memo(({ item, activeUrl, handleCloseDrawer }: ItemMenuProps) => {
  const labelLowerCase = item.label.toLowerCase()
  const isHomeLabel = item.label === 'Home' && activeUrl === '/'

  return (
    <Link
      href={item.url}
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
        {item.label}
      </Text>
    </Link>
  )
})

ItemMenu.displayName = 'ItemMenu'

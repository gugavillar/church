import Link from 'next/link'
import { memo } from 'react'

import { MenuItem, Text } from '@chakra-ui/react'

import { DROPDOWN_MENU_ITENS } from '../Navbar/constants'

type DropdownListItemProps = {
  isActive: boolean
  item: typeof DROPDOWN_MENU_ITENS[number]
  handleCloseDrawer: () => void
}

export const DropdownListItem = memo(({ handleCloseDrawer, isActive, item }: DropdownListItemProps) => {
  return (
    <MenuItem bg='gray.900'>
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
          {...(isActive && { variant: 'active' })}
        >
          {item.label}
        </Text>
      </Link>
    </MenuItem>
  )
})

DropdownListItem.displayName = 'DropdownListItem'
import { useRouter } from 'next/router'
import { memo } from 'react'

import { Link } from '@chakra-ui/react'

type ItemMenuProps = {
  url: string
  label: string
}

export const ItemMenu = memo(({ label, url }: ItemMenuProps) => {
  const { asPath } = useRouter()

  return (
    <Link
      display={{ base: 'block', md: 'block', lg: 'flex' }}
      py={{ base: 2, md: 2 }}
      href={url}
      variant={{ base: 'base', md: 'base', lg: 'lg' }}
      {...(url === asPath && { variant: 'active' })}
    >
      {label}
    </Link>
  )
})

ItemMenu.displayName = 'ItemMenu'

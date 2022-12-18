import { useRouter } from 'next/router'

import { Link, Text } from '@chakra-ui/react'

type ItemMenuProps = {
  item: {
    url: string
    label: string
  }
  isLargerThan768: boolean
}

export const ItemMenu = ({ item: { label, url }, isLargerThan768 }: ItemMenuProps) => {
  const { asPath } = useRouter()

  if (!isLargerThan768) {
    return (
      <Text py='0.875rem'>
        <Link
          size='sm'
          href={url}
          {...(asPath.includes(url) && { variant: 'active' })}
        >
          {label}
        </Link>
      </Text>
    )
  }

  return (
    <Link
      href={url}
      {...(asPath.includes(url) && { variant: 'active' })}
    >
      {label}
    </Link>
  )
}

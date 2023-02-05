import { CaretDown } from 'phosphor-react'
import { memo } from 'react'

import { MenuButton, Flex, Text } from '@chakra-ui/react'

type DropdownButtonProps = {
  activeUrl: string
  label: string
}

export const DropdownButton = memo(({ activeUrl, label }: DropdownButtonProps) => {
  const regExp = new RegExp(label.toLowerCase())
  const isEventInPath = regExp.test(activeUrl)
  return (
    <MenuButton>
      <Text
        as='span'
        display={{ base: 'block', md: 'block', lg: 'flex' }}
        py={{ base: 2, md: 2 }}
        variant='navLink'
        {...(isEventInPath && { variant: 'active' })}
      >
        <Flex
          gap={2}
          align='center'
        >
          {label} <CaretDown />
        </Flex>
      </Text>
    </MenuButton>
  )
})

DropdownButton.displayName = 'DropdownButton'

import { CaretDown } from 'phosphor-react'

import { MenuButton, Flex, Text } from '@chakra-ui/react'

type DropdownButtonProps = {
  activeUrl: string
  label: string
}

export const DropdownButton = ({ activeUrl, label }: DropdownButtonProps) => {
  const isEventInPath = /eventos/g.test(activeUrl)
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
}

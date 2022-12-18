import { List } from 'phosphor-react'

import { Button, Flex, useDisclosure } from '@chakra-ui/react'

import { DrawerMenu } from './DrawerMenu'
import { ItemMenu } from './ItemMenu'

export const itensMenu = [
  { label: 'Home', url: '/' },
  { label: 'About us', url: '/sobre-nos' },
  { label: 'Sermon', url: '/sermoes' }
] as const

type MenuContentProps = {
  isLargerThan768: boolean
}

export const MenuContent = ({ isLargerThan768 }: MenuContentProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  if (!isLargerThan768) {
    return (
      <Flex align='center'>
        <Button
          arial-label='Menu principal'
          variant='outline'
          onClick={onOpen}
          size='sm'
          border='none'
        >
          <List
            weight='bold'
            color='white'
          />
        </Button>
        <DrawerMenu
          isOpen={isOpen}
          onClose={onClose}
          itensMenu={itensMenu}
          isLargerThan768={isLargerThan768}
        />
      </Flex>
    )
  }

  return (
    <Flex
      gap='3rem'
      align='center'
    >
      {itensMenu.map((item) => (
        <ItemMenu
          key={item.label}
          item={item}
          isLargerThan768={isLargerThan768}
        />
      ))}
    </Flex>
  )
}

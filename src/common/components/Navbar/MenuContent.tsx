import { List } from 'phosphor-react'
import { ReactNode } from 'react'

import { Button, Flex, useDisclosure } from '@chakra-ui/react'

import { DrawerMenu } from './DrawerMenu'

type MenuContentProps = {
  isLargerThan768: boolean
  children: ReactNode
}

export const MenuContent = ({ isLargerThan768, children }: MenuContentProps) => {
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
        >
          {children}
        </DrawerMenu>
      </Flex>
    )
  }

  return (
    <Flex
      gap='3rem'
      align='center'
    >
      {children}
    </Flex>
  )
}

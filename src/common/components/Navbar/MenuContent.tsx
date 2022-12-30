import { List } from 'phosphor-react'
import { Fragment, ReactNode, useMemo } from 'react'

import { Button, Flex } from '@chakra-ui/react'

import { DrawerMenu } from './DrawerMenu'

type MenuContentProps = {
  children: ReactNode
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const MenuContent = ({ children, isOpen, onOpen, onClose }: MenuContentProps) => {
  const memoChildren = useMemo(() => children, [children])
  return (
    <Fragment>
      <Flex
        align='center'
        display={{ base: 'flex', md: 'flex', lg: 'none' }}
      >
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
          {memoChildren}
        </DrawerMenu>
      </Flex>
      <Flex
        gap={12}
        align='center'
        display={{ base: 'none', md: 'none', lg: 'flex' }}
      >
        {memoChildren}
      </Flex>
    </Fragment>
  )
}

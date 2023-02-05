import { List } from 'phosphor-react'
import { Fragment, useCallback } from 'react'

import { Button, useDisclosure } from '@chakra-ui/react'

import { MenuContent } from '../Menu/MenuContent'

import { DrawerMenu } from '.'

export const DrawerOpenButton = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleCloseDrawer = useCallback(() => onClose(), [onClose])

  return (
    <Fragment>
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
        <MenuContent handleCloseDrawer={handleCloseDrawer} />
      </DrawerMenu>
    </Fragment>
  )
}

import { ReactNode } from 'react'

import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react'

type DrawerMenuProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const DrawerMenu = ({ isOpen, onClose, children }: DrawerMenuProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement='right'
    >
      <DrawerOverlay />
      <DrawerContent bg='gray.900'>
        <DrawerCloseButton color='white' />
        <DrawerBody mt={16}>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

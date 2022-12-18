import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react'

import { ItemMenu } from './ItemMenu'
import { itensMenu } from './MenuContent'

type DrawerMenuProps = {
  isOpen: boolean
  onClose: () => void
  itensMenu: typeof itensMenu
  isLargerThan768: boolean
}

export const DrawerMenu = ({ isOpen, onClose, itensMenu, isLargerThan768 }: DrawerMenuProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement='right'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody mt='4rem'>
          {itensMenu.map((item) => (
            <ItemMenu
              isLargerThan768={isLargerThan768}
              key={item.label}
              item={item}
            />
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

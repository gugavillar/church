import { Fragment } from 'react'

import { Flex } from '@chakra-ui/react'

import { DrawerOpenButton } from '../Drawer/DrawerOpenButton'
import { MenuContent } from './MenuContent'

export const BodyMenu = () => {
  return (
    <Fragment>
      <Flex
        align='center'
        display={{ base: 'flex', md: 'flex', lg: 'none' }}
      >
        <DrawerOpenButton />
      </Flex>
      <Flex
        gap={12}
        align='center'
        display={{ base: 'none', md: 'none', lg: 'flex' }}
      >
        <MenuContent />
      </Flex>
    </Fragment>
  )
}

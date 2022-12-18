import { Flex } from '@chakra-ui/react'

import { VerticalDivider } from '@common/components'

import { Logo } from './Logo'
import { MenuContent } from './MenuContent'

type MenuProps = {
  isLargerThan640: boolean
}

export const Menu = ({ isLargerThan640 }: MenuProps) => {
  return (
    <Flex
      gap='4rem'
      width='100%'
      {...(!isLargerThan640 && { justify: 'space-between' })}
    >
      <Logo />
      {isLargerThan640 && (
        <VerticalDivider
          height='5rem'
          opacity='0.1'
        />
      )}
      <MenuContent isLargerThan640={isLargerThan640} />
    </Flex>
  )
}

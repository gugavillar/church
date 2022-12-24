import { Flex } from '@chakra-ui/react'

import { VerticalDivider } from '@common/components'

import { itensMenu } from './constants'
import { ItemMenu } from './ItemMenu'
import { Logo } from './Logo'
import { MenuContent } from './MenuContent'

type MenuProps = {
  isLargerThan768: boolean
}

export const Menu = ({ isLargerThan768 }: MenuProps) => {
  return (
    <Flex
      gap={16}
      width='100%'
      {...(!isLargerThan768 && { justify: 'space-between' })}
    >
      <Logo />
      {isLargerThan768 && (
        <VerticalDivider
          height={20}
          opacity='0.1'
        />
      )}
      <MenuContent isLargerThan768={isLargerThan768}>
        {itensMenu.map((item) => (
          <ItemMenu
            key={item.label}
            item={item}
            isLargerThan768={isLargerThan768}
          />
        ))}
      </MenuContent>
    </Flex>
  )
}

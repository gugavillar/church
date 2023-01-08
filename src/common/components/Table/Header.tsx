import { generate } from 'short-uuid'

import { Thead, Tr, Th } from '@chakra-ui/react'

type HeaderProps = {
  columns: Array<{
    headerLabel: string
    accessorData: string
  }>
}

export const Header = ({ columns }: HeaderProps) => {
  return (
    <Thead>
      <Tr>
        {columns.map(({ headerLabel }) => (
          <Th
            borderColor='gray.500'
            key={generate()}
            color='black'
          >
            {headerLabel}
          </Th>
        ))}
      </Tr>
    </Thead>
  )
}

import { generate } from 'short-uuid'

import { Tbody, Tr, Td } from '@chakra-ui/react'

type RowProps = {
  columns: Array<{
    headerLabel: string
    accessorData: string
  }>
  rows: Array<{
    [key: string]: any
  }>
}

export const Row = ({ columns, rows }: RowProps) => {
  return (
    <Tbody>
      {rows.map((row) => (
        <Tr key={generate()}>
          {columns.map(({ accessorData }) => (
            <Td
              border='none'
              key={`${accessorData}-${generate()}`}
            >
              {row[accessorData]}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  )
}

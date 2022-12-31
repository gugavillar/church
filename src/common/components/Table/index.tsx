import { TableContainer, Table as ChakraTable } from '@chakra-ui/react'

import { Header } from './Header'
import { Row } from './Row'

type TableProps = {
  columns: Array<{
    headerLabel: string
    accessorData: string
  }>
  rows: Array<{
    [key: string]: any
  }>
}

export const Table = ({ columns, rows }: TableProps) => {
  return (
    <TableContainer>
      <ChakraTable>
        <Header columns={columns} />
        <Row
          rows={rows}
          columns={columns}
        />
      </ChakraTable>
    </TableContainer>
  )
}

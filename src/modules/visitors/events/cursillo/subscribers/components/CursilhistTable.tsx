import { HighlightText, Table } from '@common/components'

const COLUMNS = [
  { headerLabel: 'Nome', accessorData: 'name' },
  { headerLabel: 'Crachá', accessorData: 'likeToBeCalled' },
  { headerLabel: 'Status pagamento', accessorData: 'payment' }
]

const ROWS = [
  { name: 'Gustavo Villar', likeToBeCalled: 'Guga Villar', payment: <HighlightText text='Aberto' /> },
  { name: 'Dayane Martins', likeToBeCalled: 'Day Martins', payment: <HighlightText text='Pagamento presencial' /> }
]

export const CursilhistTable = () => {
  return (
    <Table
      rows={ROWS}
      columns={COLUMNS}
    />
  )
}

import { HighlightPaymentMethod, HighlightPaymentStatus, Table } from '@common/components'

import { Cursilhists } from '@pages/eventos/cursilho/[gender]/listar'

const COLUMNS = [
  { headerLabel: 'Nome', accessorData: 'name' },
  { headerLabel: 'Como chamar', accessorData: 'likeToBeCalled' },
  { headerLabel: 'Telefone', accessorData: 'phone' },
  { headerLabel: 'Forma de pagamento', accessorData: 'paymentMethod' },
  { headerLabel: 'Status de pagamento', accessorData: 'paymentStatus' }
]

type CursilhistTableProps = {
  cursilhists: Cursilhists
}

const formattedPayment = (cursilhists: Cursilhists) =>
  cursilhists?.map((cursilhist) => ({
    ...cursilhist,
    paymentMethod: <HighlightPaymentMethod text={cursilhist.paymentMethod} />,
    paymentStatus: <HighlightPaymentStatus text={cursilhist.paymentStatus} />
  }))

export const CursilhistTable = ({ cursilhists }: CursilhistTableProps) => {
  const formatted = formattedPayment(cursilhists)
  return (
    <Table
      rows={formatted}
      columns={COLUMNS}
    />
  )
}

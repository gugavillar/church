import { nextApi } from '@common/provider/nextApi'

interface CreditCardService {
  sessionId: string
}

export type CreditCardServiceBody = {
  line_items: Array<{
    price: string
    quantity: number
  }>
  ref: string
  email: string
}

export const creditCardService = async (body: CreditCardServiceBody): Promise<CreditCardService> => {
  const { data } = await nextApi.post('/payment', { ...body })
  return data
}

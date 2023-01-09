import { nextApi } from '@common/provider/nextApi'

interface CreditCardService {
  session: {
    url: string
  }
}

export const creditCardService = async (): Promise<CreditCardService> => {
  const { data } = await nextApi.post('/payment')
  return data
}

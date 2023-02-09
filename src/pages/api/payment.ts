import { NextApiRequest, NextApiResponse } from 'next'

import { stripeApi } from '@common/provider/stripeApi'
import { createCursilhistStripeId, CreditCardServiceBody, getCursilhistStripeId } from '@common/services'

const PaymentNext = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body,
    method,
    headers: { referer }
  } = req

  if (method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
  }

  const [url] = String(referer).split('?')

  const { line_items, ref, email } = body as CreditCardServiceBody

  try {
    const { data } = await getCursilhistStripeId(email)

    let stripeCustomerCreate

    if (!data.stripeId) {
      stripeCustomerCreate = await stripeApi.customers.create({
        email,
        name: data?.name
      })
      await createCursilhistStripeId(ref, stripeCustomerCreate.id)
    }

    const stripeCheckoutSession = await stripeApi.checkout.sessions.create({
      customer: stripeCustomerCreate?.id ?? data.stripeId,
      line_items,
      mode: 'payment',
      success_url: `${url}?user_id=${ref}&success=true`,
      cancel_url: `${url}?user_id=${ref}&success=false`
    })

    res.status(200).json({ sessionId: stripeCheckoutSession.id })
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message)
  }
}

export default PaymentNext

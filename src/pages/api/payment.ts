import { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'

import { createCursilhistStripeId, CreditCardServiceBody, getCursilhistStripeId } from '@common/services'

const stripe: Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

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

    if (!data.stripe_id) {
      stripeCustomerCreate = await stripe.customers.create({
        email
      })
      await createCursilhistStripeId(ref, stripeCustomerCreate.id)
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerCreate?.id ?? data.stripe_id,
      line_items,
      mode: 'payment',
      success_url: `${url}?user_id=${ref}&success=true`,
      cancel_url: `${url}?user_id=${ref}&success=false`
    })

    res.status(200).json({ session })
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message)
  }
}

export default PaymentNext

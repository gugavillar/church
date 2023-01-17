import { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'

import { getCursilhistStripeId } from '@common/services'

const stripe: Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const StatusPaymentNext = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req

  if (method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { data } = await getCursilhistStripeId(body.email)
    const { status } = await stripe.paymentIntents.retrieve(data.stripe_id)
    console.log(status)

    res.status(200).json({ status })
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message)
  }
}

export default StatusPaymentNext

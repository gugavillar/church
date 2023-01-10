import { NextApiRequest, NextApiResponse } from 'next'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ message: 'Method not allowed' })
  }
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1MO0MgAC1Ps8hlakVJh4bb7r',
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel'
    })
    res.status(200).json({ session })
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message)
  }
}

import { CursilhistDatabase } from '@common/@types/cursilhists'
import { faunaAPI, faunaQ } from '@common/provider/faunaApi'
import { Cursilhist } from '@visitors/events/cursillo/form/components/ReviewData'

export const createCursilhist = (cursilhist: Cursilhist) =>
  faunaAPI.query<CursilhistDatabase>(
    faunaQ.Create(faunaQ.Collection('cursilhists'), {
      data: cursilhist
    })
  )

export const getCursilhist = (ref: string) =>
  faunaAPI.query<CursilhistDatabase>(faunaQ.Get(faunaQ.Ref(faunaQ.Collection('cursilhists'), ref)))

type CreatePaymentConfirmationParams = {
  method: 'pix' | 'money' | 'credit'
  cursilhistRef: string
  status: boolean
  gender: 'masculino' | 'feminino'
}

export const createCursilhistPaymentConfirmation = (payment: CreatePaymentConfirmationParams) =>
  faunaAPI.query(
    faunaQ.Create(faunaQ.Collection('payments'), {
      data: {
        ...payment,
        cursilhistRef: faunaQ.Ref(faunaQ.Collection('cursilhists'), payment.cursilhistRef)
      }
    })
  )

export const createCursilhistStripeId = (ref: string, stripe_id: string) =>
  faunaAPI.query(
    faunaQ.Update(faunaQ.Ref(faunaQ.Collection('cursilhists'), ref), {
      data: {
        stripe_id
      }
    })
  )

export const getCursilhistStripeId = (email: string) =>
  faunaAPI.query<CursilhistDatabase>(
    faunaQ.Get(faunaQ.Match(faunaQ.Index('cursilhist_by_email'), faunaQ.Casefold(email)))
  )

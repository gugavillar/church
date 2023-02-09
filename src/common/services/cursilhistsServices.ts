import { Gender, PaymentMethods, PaymentStatus } from '@common/@types'
import { AllCursilhistsDatabase, CursilhistDatabase } from '@common/@types/cursilhists'
import { faunaAPI, faunaQ } from '@common/provider/faunaApi'
import { Cursilhist } from '@modules/visitors/events/cursillo/form'

export const createCursilhist = (cursilhist: Cursilhist) =>
  faunaAPI.query<CursilhistDatabase>(
    faunaQ.Create(faunaQ.Collection('cursilhists'), {
      data: cursilhist
    })
  )

export const getCursilhist = (ref: string) =>
  faunaAPI.query<CursilhistDatabase>(faunaQ.Get(faunaQ.Ref(faunaQ.Collection('cursilhists'), ref)))

export const getAllCursilhists = (gender: Gender) =>
  faunaAPI.query<AllCursilhistsDatabase>(
    faunaQ.Map(
      faunaQ.Paginate(faunaQ.Match(faunaQ.Index('cursilhists_by_gender'), gender)),
      faunaQ.Lambda('cursilhistRef', faunaQ.Get(faunaQ.Var('cursilhistRef')))
    )
  )

type CreatePaymentConfirmationParams = {
  paymentMethod: PaymentMethods
  cursilhistRef: string
  paymentStatus: PaymentStatus
}

export const createCursilhistPaymentConfirmation = ({ cursilhistRef, ...rest }: CreatePaymentConfirmationParams) =>
  faunaAPI.query(
    faunaQ.Update(faunaQ.Ref(faunaQ.Collection('cursilhists'), cursilhistRef), {
      data: {
        ...rest
      }
    })
  )

export const createCursilhistStripeId = (ref: string, stripeId: string) =>
  faunaAPI.query(
    faunaQ.Update(faunaQ.Ref(faunaQ.Collection('cursilhists'), ref), {
      data: {
        stripeId
      }
    })
  )

export const getCursilhistStripeId = (email: string) =>
  faunaAPI.query<CursilhistDatabase>(
    faunaQ.Get(faunaQ.Match(faunaQ.Index('cursilhist_by_email'), faunaQ.Casefold(email)))
  )

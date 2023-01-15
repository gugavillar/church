import { AllCursilhistsDatabase, CursilhistDatabase } from '@common/@types/cursilhists'
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

export const getAllCursilhists = (gender: 'masculino' | 'feminino') =>
  faunaAPI.query<AllCursilhistsDatabase>(
    faunaQ.Map(
      faunaQ.Paginate(faunaQ.Match(faunaQ.Index('cursilhists_by_gender'), gender)),
      faunaQ.Lambda('cursilhistRef', faunaQ.Get(faunaQ.Var('cursilhistRef')))
    )
  )

type CreatePaymentConfirmationParams = {
  method: 'pix' | 'money' | 'credit'
  cursilhistRef: string
}

export const createCursilhistPaymentConfirmation = ({ cursilhistRef, method }: CreatePaymentConfirmationParams) =>
  faunaAPI.query(
    faunaQ.Update(faunaQ.Ref(faunaQ.Collection('cursilhists'), cursilhistRef), {
      data: {
        method
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

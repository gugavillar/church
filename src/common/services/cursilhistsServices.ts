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

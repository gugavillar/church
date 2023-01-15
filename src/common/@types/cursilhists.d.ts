import { Cursilhist } from '@visitors/events/cursillo/form/components/ReviewData'

export interface CursilhistDatabase {
  ref: {
    value: {
      id: string
    }
  }
  data: {
    stripe_id: string
  } & Cursilhist
}

export interface AllCursilhistsDatabase {
  data: Array<CursilhistDatabase>
}

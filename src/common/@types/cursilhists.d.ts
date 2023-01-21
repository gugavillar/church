import { MARITAL_STATUS, OCCUPATIONS, EDUCATION_LEVEL, BRAZILIAN_STATES } from '@common/constants'

import { PaymentMethods, PaymentStatus } from '.'

type Cursilhist = {
  name: string
  likeToBeCalled: string
  birthDate: number
  phone: number
  email: string
  maritalStatus: typeof MARITAL_STATUS[number]['value']
  zipCode: number
  street: string
  number: string
  neighborhood: string
  city: string
  state: typeof BRAZILIAN_STATES[number]['value']
  referencePoint?: string
  spouse?: {
    name: string
    phone: number
    numberOfChildren: number
  }
  closeRelative?: {
    name: string
    phone: number
  }
  religion: string
  church: string
  education?: typeof EDUCATION_LEVEL[number]['value']
  occupation?: typeof OCCUPATIONS[number]['value']
  workplace?: string
  workplacePhone?: number
  hasHealthProblems: boolean
  healthProblems?: string
  hasDietOrFoodRestriction: boolean
  dietOrFoodRestriction?: string
  wish: string
  paymentMethod: PaymentMethods
  stripeId: string
  paymentStatus: PaymentStatus
}

export interface CursilhistDatabase {
  ref: {
    value: {
      id: string
    }
  }
  data: Cursilhist
}

export interface AllCursilhistsDatabase {
  data: Array<CursilhistDatabase>
}

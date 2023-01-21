import { isFuture, differenceInDays } from 'date-fns'

import { Configurations } from '@common/@types/configurations'
import { faunaAPI, faunaQ } from '@common/provider/faunaApi'

const TODAY = new Date()

const hasCursilloSubscriptionOpen = ({ data }: Configurations) => {
  const dateOfNextMaleCursillo = data?.cursillo.endDateForMaleSubscription?.find((endMaleDate) =>
    isFuture(new Date(endMaleDate))
  )
  const dateOfNextFemaleCursillo = data?.cursillo.endDateForFemaleSubscription?.find((endFemaleDate) =>
    isFuture(new Date(endFemaleDate))
  )

  if (!dateOfNextMaleCursillo && !dateOfNextFemaleCursillo) {
    return {
      isOpenMaleSubscription: false,
      isOpenFemaleSubscription: false
    }
  }

  const daysToOpenMaleSubscription = dateOfNextMaleCursillo
    ? differenceInDays(new Date(dateOfNextMaleCursillo), TODAY)
    : -1
  const daysToOpenFemaleSubscription = dateOfNextFemaleCursillo
    ? differenceInDays(new Date(dateOfNextFemaleCursillo), TODAY)
    : -1

  const hasDaysToOpenMaleSubscription = daysToOpenMaleSubscription <= 30 && daysToOpenMaleSubscription >= 1
  const hasDaysToOpenFemaleSubscription = daysToOpenFemaleSubscription <= 30 && daysToOpenFemaleSubscription >= 1

  const isOpenMaleSubscription = daysToOpenMaleSubscription === -1 ? false : hasDaysToOpenMaleSubscription
  const isOpenFemaleSubscription = daysToOpenFemaleSubscription === -1 ? false : hasDaysToOpenFemaleSubscription
  return {
    isOpenMaleSubscription,
    isOpenFemaleSubscription
  }
}

export const getIsOpenCursilloSubscription = async () => {
  const response = await faunaAPI.query<Configurations>(
    faunaQ.Get(faunaQ.Documents(faunaQ.Collection('configurations')))
  )
  return hasCursilloSubscriptionOpen(response)
}

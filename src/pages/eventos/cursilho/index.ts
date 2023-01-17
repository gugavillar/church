import { differenceInDays, isFuture } from 'date-fns'
import { GetServerSideProps } from 'next'

import { Configurations } from '@common/@types/configurations'
import { getConfigurations } from '@common/services/configurationsServices'

export { default } from '@visitors/events/cursillo'

const TODAY = new Date()

const formatConfigurations = ({ data }: Configurations) => {
  const dateOfNextMaleCursillo = data?.cursillo.male?.find((male) => isFuture(new Date(male)))
  const dateOfNextFemaleCursillo = data?.cursillo.female?.find((female) => isFuture(new Date(female)))

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

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await getConfigurations()
  const formattedConfig = formatConfigurations(response)
  return {
    props: { ...formattedConfig }
  }
}

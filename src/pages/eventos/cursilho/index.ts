import { differenceInDays, isFuture } from 'date-fns'
import { GetServerSideProps } from 'next'

import { Configurations } from '@common/@types/configurations'
import { getConfigurations } from '@common/services/configurationsServices'

export { default } from '@visitors/events/cursillo'

const TODAY = new Date()

const formatConfigurations = ({ data }: Configurations) => {
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await getConfigurations()
    const formattedConfig = formatConfigurations(response)
    return {
      props: { ...formattedConfig }
    }
  } catch {
    return {
      redirect: {
        destination: '/?configurations=true',
        permanent: false
      }
    }
  }
}

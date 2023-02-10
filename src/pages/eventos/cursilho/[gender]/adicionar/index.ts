import { format } from 'date-fns'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { CursilhistDatabase } from '@common/@types/cursilhists'
import { fieldFormatCelPhone, fieldFormatPhone, fieldFormatZipCode } from '@common/formatters'
import { getCursilhist } from '@common/services'
import { getIsOpenCursilloSubscription } from '@common/services/configurationsServices'

export { default } from '@modules/visitors/events/cursillo/form'

const formattedResponse = ({ data: { stripeId, ...restValues } }: CursilhistDatabase) => {
  const isWorkplacePhone = Boolean(restValues?.workplacePhone)
  const workplacePhoneLength = String(restValues?.workplacePhone)?.length

  return {
    ...restValues,
    birthDate: format(restValues.birthDate, 'dd/MM/yyyy'),
    phone: fieldFormatCelPhone(String(restValues.phone)),
    zipCode: fieldFormatZipCode(String(restValues.zipCode)),
    ...(restValues.maritalStatus !== 'Casado(a)'
      ? {
          closeRelative: {
            ...restValues.closeRelative,
            phone: fieldFormatCelPhone(String(restValues.closeRelative?.phone))
          }
        }
      : {
          spouse: {
            ...restValues.spouse,
            phone: fieldFormatCelPhone(String(restValues.spouse?.phone))
          }
        }),
    hasHealthProblems: restValues.hasHealthProblems ? '1' : '0',
    hasDietOrFoodRestriction: restValues.hasDietOrFoodRestriction ? '1' : '0',
    ...(isWorkplacePhone && {
      workplacePhone:
        workplacePhoneLength === 11
          ? fieldFormatCelPhone(String(restValues.workplacePhone))
          : fieldFormatPhone(String(restValues.workplacePhone))
    })
  }
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query, resolvedUrl } = ctx

  const isMaleSubscription = query.gender === 'masculino'
  const isFemaleSubscription = query.gender === 'feminino'

  try {
    const { isOpenFemaleSubscription, isOpenMaleSubscription } = await getIsOpenCursilloSubscription()

    if (isMaleSubscription && !isOpenMaleSubscription) {
      return {
        redirect: {
          destination: '/eventos/cursilho?isOpenMaleSubscription=false',
          permanent: false
        }
      }
    }

    if (isFemaleSubscription && !isOpenFemaleSubscription) {
      return {
        redirect: {
          destination: '/eventos/cursilho?isOpenFemaleSubscription=false',
          permanent: false
        }
      }
    }
  } catch {
    return {
      redirect: {
        destination: '/eventos/cursilho',
        permanent: false
      }
    }
  }

  if (!query?.user_id) {
    return {
      props: {
        stepProgress: 'formSubscription'
      }
    }
  }

  const [url] = resolvedUrl.split('?')

  try {
    const response = await getCursilhist(String(query?.user_id))
    const data = formattedResponse(response)
    return {
      props: {
        cursilhist: data,
        stepProgress: 'reviewSubscription'
      }
    }
  } catch {
    return {
      redirect: {
        destination: url,
        permanent: false
      }
    }
  }
}

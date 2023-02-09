import { format } from 'date-fns'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { CursilhistDatabase } from '@common/@types/cursilhists'
import { fieldFormatCelPhone, fieldFormatPhone, fieldFormatZipCode } from '@common/formatters'
import { getCursilhist } from '@common/services'
import { getIsOpenCursilloSubscription } from '@common/services/configurationsServices'

export { default } from '@modules/visitors/events/cursillo/form'

const formattedResponse = ({ data, ref }: CursilhistDatabase) => {
  return {
    ...data,
    id: ref.value.id,
    birthDate: format(data.birthDate, 'dd/MM/yyyy'),
    phone: fieldFormatCelPhone(String(data.phone)),
    zipCode: fieldFormatZipCode(String(data.zipCode)),
    ...(data.maritalStatus !== 'Casado(a)'
      ? {
          closeRelative: {
            ...data.closeRelative,
            phone: fieldFormatCelPhone(String(data.closeRelative?.phone))
          }
        }
      : {
          spouse: {
            ...data.spouse,
            phone: fieldFormatCelPhone(String(data.spouse?.phone))
          }
        }),
    hasHealthProblems: data.hasHealthProblems ? '1' : '0',
    hasDietOrFoodRestriction: data.hasDietOrFoodRestriction ? '1' : '0',
    ...(data?.workplacePhone && String(data?.workplacePhone).length === 11
      ? { workplacePhone: fieldFormatCelPhone(String(data.workplacePhone)) }
      : { workplacePhone: fieldFormatPhone(String(data.workplacePhone)) })
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

import { format } from 'date-fns'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { CursilhistDatabase } from '@common/@types/cursilhists'
import { fieldFormatCelPhone, fieldFormatZipCode } from '@common/formatters'
import { getCursilhist } from '@common/services'

export { default } from '@visitors/events/cursillo/form'

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
    hasDietOrFoodRestriction: data.hasDietOrFoodRestriction ? '1' : '0'
  }
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query, resolvedUrl } = ctx

  if (!query?.user_id) {
    return {
      props: {}
    }
  }

  const [url] = resolvedUrl.split('?')

  try {
    const response = await getCursilhist(String(query?.user_id))
    const data = formattedResponse(response)
    return {
      props: {
        cursilhist: data
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

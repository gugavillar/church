import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { Gender } from '@common/@types'
import { AllCursilhistsDatabase } from '@common/@types/cursilhists'
import { fieldFormatCelPhone } from '@common/formatters'
import { getAllCursilhists } from '@common/services'

export { default } from '@visitors/events/cursillo/subscribers'

const formattedResponse = ({ data }: AllCursilhistsDatabase) =>
  data?.map((cursilhist) => {
    return {
      name: cursilhist.data.name,
      likeToBeCalled: cursilhist.data.likeToBeCalled,
      phone: fieldFormatCelPhone(String(cursilhist.data?.phone)),
      paymentMethod: cursilhist.data.paymentMethod,
      paymentStatus: cursilhist.data.paymentStatus
    }
  })

export type Cursilhists = ReturnType<typeof formattedResponse>

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { params } = ctx

  if (!params?.gender) {
    return {
      redirect: {
        destination: '/eventos/cursilho',
        permanent: false
      }
    }
  }

  try {
    const response = await getAllCursilhists(params?.gender as Gender)
    const data = formattedResponse(response)
    return {
      props: {
        cursilhists: data
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
}

import { GetServerSideProps } from 'next'

import { getIsOpenCursilloSubscription } from '@common/services/configurationsServices'

export { default } from '@modules/visitors/events/cursillo'

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const isOpenCursilloSubscription = await getIsOpenCursilloSubscription()
    return {
      props: { ...isOpenCursilloSubscription }
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

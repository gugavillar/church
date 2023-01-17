import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useToast } from '@chakra-ui/react'

import { ERROR_TOAST } from '@common/constants'

export const useRouterChange = () => {
  const [isChangingRoute, setIsChangingRoute] = useState(false)

  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsChangingRoute(true)
    })
    router.events.on('routeChangeComplete', () => {
      setIsChangingRoute(false)
    })
    router.events.on('routeChangeError', () => {
      toast({
        ...ERROR_TOAST,
        title: 'Ocorreu uma falha',
        description: 'Falha ao realizar a navegação'
      })
      setIsChangingRoute(false)
    })
  }, [router.events, toast])

  return isChangingRoute
}

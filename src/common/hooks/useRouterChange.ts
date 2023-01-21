import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useRouterChange = () => {
  const [isChangingRoute, setIsChangingRoute] = useState(false)

  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsChangingRoute(true)
    })
    router.events.on('routeChangeComplete', () => {
      setIsChangingRoute(false)
    })
    router.events.on('routeChangeError', () => {
      setIsChangingRoute(false)
    })
  }, [router.events])

  return isChangingRoute
}

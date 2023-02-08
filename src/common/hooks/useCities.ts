import { useState, useCallback, useEffect } from 'react'

import { useToast } from '@chakra-ui/react'

import { BRAZILIAN_STATES, ERROR_TOAST } from '@common/constants'
import { GetCitiesReturn, getCities } from '@common/services'

type State = typeof BRAZILIAN_STATES[number]['value'] | undefined

export const useCities = (state: State) => {
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [citiesFromUF, setCitiesFromUF] = useState<Array<GetCitiesReturn>>([])

  const toast = useToast()

  const handleGetCities = useCallback(
    async (uf: State) => {
      if (!uf) return
      setIsLoadingCities(true)
      try {
        const response = await getCities(uf)
        setCitiesFromUF(response)
      } catch {
        toast({
          ...ERROR_TOAST,
          title: 'Ocorreu uma falha',
          description: 'Falha ao carregar as cidades'
        })
      } finally {
        setIsLoadingCities(false)
      }
    },
    [toast]
  )

  useEffect(() => {
    state && handleGetCities(state)
  }, [handleGetCities, state])

  return { isLoadingCities, citiesFromUF, handleGetCities }
}

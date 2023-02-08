import { useState, useCallback } from 'react'

import { useToast } from '@chakra-ui/react'

import { ERROR_TOAST } from '@common/constants'
import { getAddressFromZipCode, GetAddressFromZipCodeReturn } from '@common/services'

export const useAddress = () => {
  const [addressResponse, setAddressResponse] = useState<GetAddressFromZipCodeReturn>()

  const toast = useToast()

  const handleGetAddressData = useCallback(
    async (zipCode: string) => {
      if (zipCode.length < 9) return
      const formatZipCode = zipCode.replace(/-/, '')
      try {
        const response = await getAddressFromZipCode(formatZipCode)
        if (response.error) {
          return toast({
            ...ERROR_TOAST,
            title: 'Cep não encontrado',
            description: 'Caso esteja correto preencher os dados manualmente'
          })
        }
        setAddressResponse(response)
      } catch {
        toast({
          ...ERROR_TOAST,
          title: 'Ocorreu uma falha',
          description: 'Falha ao pegar os dados do cep'
        })
      }
    },
    [toast]
  )

  return { handleGetAddressData, addressResponse }
}

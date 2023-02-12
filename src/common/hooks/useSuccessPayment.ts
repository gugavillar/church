import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useToast } from '@chakra-ui/react'

import { INFO_TOAST } from '@common/constants'

type UseErrorParams = {
  key: string
  description: string
}

export const useSuccessPayment = ({ key, description }: UseErrorParams) => {
  const toast = useToast()
  const id = 'info-toast'
  const { push, query, pathname } = useRouter()

  useEffect(() => {
    if (query[key]) {
      if (!toast.isActive(id)) {
        toast({
          id,
          ...INFO_TOAST,
          title: 'Pagamento em análise',
          description
        })
      }
      push(pathname, undefined, { shallow: true })
    }
  }, [description, key, pathname, push, query, toast])
}

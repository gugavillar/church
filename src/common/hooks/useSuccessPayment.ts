import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useToast } from '@chakra-ui/react'

import { INFO_TOAST, SUCCESS_TOAST } from '@common/constants'

type UseErrorParams = {
  key: string
  description: string
}

const generateToastConfiguration = (isMoneyPayment: boolean) => {
  if (isMoneyPayment) {
    return {
      ...INFO_TOAST,
      title: 'Pagamento em análise'
    }
  } else {
    return {
      ...SUCCESS_TOAST,
      title: 'Pagamento confirmado'
    }
  }
}

export const useSuccessPayment = ({ key, description }: UseErrorParams) => {
  const toast = useToast()
  const id = 'info-toast'
  const { push, query, pathname } = useRouter()
  const toastConfiguration = generateToastConfiguration(query[key] === 'money')

  useEffect(() => {
    if (query[key]) {
      if (!toast.isActive(id)) {
        toast({
          id,
          ...toastConfiguration,
          description
        })
      }
      push(pathname, undefined, { shallow: true })
    }
  }, [description, key, pathname, push, query, toast, toastConfiguration])
}

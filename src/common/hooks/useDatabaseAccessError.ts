import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useToast } from '@chakra-ui/react'

import { ERROR_TOAST } from '@common/constants'

type UseErrorParams = {
  key: string
  description: string
}

export const useDatabaseAccessError = ({ key, description }: UseErrorParams) => {
  const toast = useToast()
  const id = 'error-toast'
  const { push, query, pathname } = useRouter()

  useEffect(() => {
    if (query[key]) {
      if (!toast.isActive(id)) {
        toast({
          ...ERROR_TOAST,
          title: 'Ocorreu uma falha',
          description
        })
      }
      push(pathname, undefined, { shallow: true })
    }
  }, [description, key, pathname, push, query, toast])
}

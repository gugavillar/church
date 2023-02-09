import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { useToast, Box } from '@chakra-ui/react'

import { Gender, PaymentMethods } from '@common/@types'
import { BRAZILIAN_STATES, EDUCATION_LEVEL, ERROR_TOAST, MARITAL_STATUS, OCCUPATIONS } from '@common/constants'
import { timestampDate, formatToNumber } from '@common/formatters'
import { getStripeJs } from '@common/provider/stripeJSApi'
import { createCursilhist, creditCardService } from '@common/services'
import { newCursilhistFormValidation } from '@common/validations/events/cursillo'

export type NewCursilhistForm = {
  id?: string
  name: string
  likeToBeCalled: string
  birthDate: string
  phone: string
  email: string
  maritalStatus: typeof MARITAL_STATUS[number]['value'] | undefined
  zipCode: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: typeof BRAZILIAN_STATES[number]['value'] | undefined
  referencePoint?: string
  spouse?: {
    name: string
    phone: string
    numberOfChildren: number | null
  }
  closeRelative?: {
    name: string
    phone: string
  }
  religion: string
  church: string
  education?: typeof EDUCATION_LEVEL[number]['value']
  occupation?: typeof OCCUPATIONS[number]['value']
  workplace?: string
  workplacePhone?: string
  hasHealthProblems?: '1' | '0'
  healthProblems?: string
  hasDietOrFoodRestriction?: '1' | '0'
  dietOrFoodRestriction?: string
  wish: string
  paymentMethod?: PaymentMethods
}

type FormProps = {
  children: ReactNode
  cursilhist: NewCursilhistForm
}

const formatDataToDatabase = (values: NewCursilhistForm, gender: Gender) => {
  return {
    ...values,
    gender,
    birthDate: timestampDate(values.birthDate),
    hasDietOrFoodRestriction: Boolean(Number(values.hasDietOrFoodRestriction)),
    hasHealthProblems: Boolean(Number(values.hasHealthProblems)),
    phone: formatToNumber(values.phone),
    zipCode: formatToNumber(values.zipCode),
    ...(values?.workplacePhone && { workplacePhone: formatToNumber(values?.workplacePhone) }),
    ...(values?.spouse?.phone && { spouse: { ...values?.spouse, phone: formatToNumber(values?.spouse?.phone) } }),
    ...(values?.closeRelative?.phone && {
      closeRelative: { ...values?.closeRelative, phone: formatToNumber(values?.closeRelative?.phone) }
    })
  }
}

export type FormattedCursilhist = ReturnType<typeof formatDataToDatabase>

export const defaultFormValues = {
  name: '',
  likeToBeCalled: '',
  birthDate: '',
  phone: '',
  email: '',
  maritalStatus: undefined,
  zipCode: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: undefined,
  referencePoint: undefined,
  religion: '',
  church: '',
  education: undefined,
  occupation: undefined,
  workplace: undefined,
  workplacePhone: undefined,
  hasHealthProblems: undefined,
  healthProblems: undefined,
  hasDietOrFoodRestriction: undefined,
  dietOrFoodRestriction: undefined,
  wish: ''
}

export const Form = ({ children, cursilhist }: FormProps) => {
  const methods = useForm({
    resolver: yupResolver(newCursilhistFormValidation),
    defaultValues: cursilhist ?? defaultFormValues
  })
  const toast = useToast()
  const { push, query } = useRouter()
  const onSubmit = async (values: NewCursilhistForm) => {
    const formattedData = formatDataToDatabase(values, query.gender as Gender)
    try {
      const { ref } = await createCursilhist(formattedData)
      if (formattedData?.paymentMethod === 'credit') {
        try {
          const { sessionId } = await creditCardService({
            line_items: [{ price: process.env.NEXT_PUBLIC_CURSILHO_INSCRICAO as string, quantity: 1 }],
            ref: String(ref?.value?.id),
            email: String(formattedData?.email)
          })
          const stripe = await getStripeJs()
          await stripe?.redirectToCheckout({ sessionId })
        } catch {
          toast({
            ...ERROR_TOAST,
            title: 'Ocorreu uma falha',
            description: 'Falha ao redirecionar para o pagamento'
          })
        }
      }
    } catch {
      toast({
        ...ERROR_TOAST,
        title: 'Ocorreu uma falha',
        description: 'Falha ao tentar salvar. Tente novamente'
      })
    } finally {
      push('/eventos/cursilho')
    }
  }
  return (
    <FormProvider {...methods}>
      <Box
        as='form'
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </Box>
    </FormProvider>
  )
}

import * as yup from 'yup'

import {
  BRAZILIAN_STATES,
  EDUCATION_LEVEL,
  MARITAL_STATUS,
  MARRIED_PERSON,
  OCCUPATIONS,
  SINGLE_PERSON
} from '@common/constants'
import { customValidateDate, customValidatePhone } from '@common/validations/customFunctions'

yup.setLocale({
  mixed: { required: 'Campo obrigatório.' },
  string: { email: 'E-mail inválido.' }
})

export const newCursilhistFormValidation = yup.object({
  name: yup.string().required(),
  likeToBeCalled: yup.string().required(),
  birthDate: yup
    .string()
    .test('is-valid-date', 'Data inválida.', (value) => customValidateDate(String(value)))
    .required(),
  phone: yup
    .string()
    .test('is-valid-phone', 'Telefone inválido.', (value) => customValidatePhone(String(value), 'celPhone'))
    .required(),
  email: yup.string().email().required(),
  maritalStatus: yup
    .string()
    .oneOf([...MARITAL_STATUS.map((status) => status.value)])
    .required(),
  closeRelative: yup.object().when('maritalStatus', {
    is: (maritalStatus: typeof MARITAL_STATUS[number]['value']) => SINGLE_PERSON.includes(maritalStatus),
    then: yup.object({
      name: yup.string().required(),
      phone: yup
        .string()
        .test('is-valid-phone', 'Telefone inválido.', (value) => customValidatePhone(String(value), 'celPhone'))
        .required()
    }),
    otherwise: yup.object().default(undefined)
  }),
  spouse: yup.object().when('maritalStatus', {
    is: (maritalStatus: typeof MARITAL_STATUS[number]['value']) => MARRIED_PERSON.includes(maritalStatus),
    then: yup.object({
      name: yup.string().required(),
      phone: yup
        .string()
        .test('is-valid-phone', 'Telefone inválido.', (value) => customValidatePhone(String(value), 'celPhone'))
        .required(),
      numberOfChildren: yup
        .number()
        .typeError('O número deve ser 0 ou maior que 0.')
        .min(0, 'O número deve ser 0 ou maior que 0.')
        .required()
    }),
    otherwise: yup.object().default(undefined)
  }),
  zipCode: yup
    .string()
    .test('is-valid-cep', 'Cep inválido.', (value) => (value ? value.length === 9 : true))
    .required(),
  street: yup.string().required(),
  number: yup.string().required(),
  neighborhood: yup.string().required(),
  city: yup.string().required(),
  state: yup
    .string()
    .oneOf([...BRAZILIAN_STATES.map((states) => states.value)])
    .required(),
  referencePoint: yup.string().nullable(),
  religion: yup.string().required(),
  church: yup.string().required(),
  education: yup
    .string()
    .default('')
    .oneOf(['', ...EDUCATION_LEVEL.map((education) => education.value)]),
  occupation: yup
    .string()
    .default('')
    .oneOf(['', ...OCCUPATIONS.map((occupation) => occupation.value)]),
  workplace: yup.string().default(undefined),
  workplacePhone: yup
    .string()
    .test('is-valid-phone', 'Telefone inválido', (value) =>
      value ? customValidatePhone(String(value), 'both') : true
    ),
  hasHealthProblems: yup.string().oneOf(['0', '1']).required(),
  healthProblems: yup
    .string()
    .default(undefined)
    .when('hasHealthProblems', {
      is: (hasHealthProblems: '0' | '1') => hasHealthProblems === '1',
      then: yup.string().required()
    }),
  hasDietOrFoodRestriction: yup.string().oneOf(['0', '1']).required(),
  dietOrFoodRestriction: yup
    .string()
    .default(undefined)
    .when('hasDietOrFoodRestriction', {
      is: (hasDietOrFoodRestriction: '0' | '1') => hasDietOrFoodRestriction === '1',
      then: yup.string().required()
    }),
  wish: yup.string().required(),
  paymentMethod: yup.string().oneOf(['pix', 'credit', 'money']).default(undefined)
})

import * as yup from 'yup'

import { BRAZILIAN_STATES, EDUCATION_LEVEL, MARITAL_STATUS, OCCUPATIONS } from '@common/constants'
import { customValidateDate, customValidatePhone } from '@common/validations/customFunctions'

yup.setLocale({
  mixed: { required: 'Campo obrigatório' },
  string: { email: 'E-mail inválido' }
})

export const newCursilhistFormValidation = yup.object({
  name: yup.string().required(),
  likeToBeCalled: yup.string().required(),
  birthDate: yup
    .string()
    .nullable()
    .test('is-valid-date', 'Data inválida', (value) => customValidateDate(String(value)))
    .required(),
  phone: yup
    .string()
    .nullable()
    .test('is-valid-phone', 'Telefone inválido', (value) => customValidatePhone(String(value), 'celPhone'))
    .required(),
  email: yup.string().nullable().email(),
  maritalStatus: yup
    .string()
    .oneOf([...MARITAL_STATUS.map((status) => status.value)])
    .required(),
  closeRelative: yup
    .object()
    .when('maritalStatus', {
      is: (maritalStatus: typeof MARITAL_STATUS[number]['value']) => maritalStatus !== 'Casado(a)',
      then: yup.object({
        name: yup.string().required(),
        phone: yup
          .string()
          .nullable()
          .test('is-valid-phone', 'Telefone inválido', (value) => customValidatePhone(String(value), 'celPhone'))
          .required()
      })
    })
    .notRequired()
    .default(undefined),
  spouse: yup
    .object()
    .when('maritalStatus', {
      is: (maritalStatus: typeof MARITAL_STATUS[number]['value']) => maritalStatus === 'Casado(a)',
      then: yup.object({
        name: yup.string().required(),
        phone: yup
          .string()
          .nullable()
          .test('is-valid-phone', 'Telefone inválido', (value) => customValidatePhone(String(value), 'celPhone'))
          .required(),
        numberOfChildren: yup
          .number()
          .typeError('O número deve ser 0 ou maior que 0')
          .nullable()
          .min(0, 'O número deve ser 0 ou maior que 0')
          .required()
      })
    })
    .notRequired()
    .default(undefined),
  zipCode: yup.string().nullable().required(),
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
  education: yup.string().oneOf(['', ...EDUCATION_LEVEL.map((education) => education.value)]),
  occupation: yup.string().oneOf(['', ...OCCUPATIONS.map((occupation) => occupation.value)]),
  workplace: yup.string().nullable(),
  workplacePhone: yup
    .string()
    .nullable()
    .test('is-valid-phone', 'Telefone inválido', (value) =>
      value ? customValidatePhone(String(value), 'both') : true
    ),
  healthProblems: yup.string().nullable(),
  hasDietOrFoodRestriction: yup.string().oneOf(['0', '1']).required(),
  dietOrFoodRestriction: yup
    .string()
    .nullable()
    .when('hasDietOrFoodRestriction', {
      is: (hasDietOrFoodRestriction: '0' | '1') => hasDietOrFoodRestriction === '1',
      then: yup.string().required()
    }),
  wish: yup.string().required()
})

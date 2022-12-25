import { AxiosResponse } from 'axios'

import { zipCodeApi } from '@common/provider/zipCodeApi'

interface ValidateZipCodeReturn {
  cep: string
  logradouro: string
  complemento: string | null
  bairro: string
  localidade: string
  uf: string
}

export const validateZipCode = (cep: string): Promise<AxiosResponse<ValidateZipCodeReturn>> =>
  zipCodeApi.get(`/${cep}/json`)

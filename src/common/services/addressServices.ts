import { BRAZILIAN_STATES } from '@common/constants'
import { citiesApi } from '@common/provider/citiesApi'
import { zipCodeApi } from '@common/provider/zipCodeApi'

export interface GetCitiesReturn {
  label: string
  value: string
}

export const getCities = async (uf: string): Promise<Array<GetCitiesReturn>> => {
  const { data } = await citiesApi.get(`/localidades/estados/${uf}/municipios`)
  return data.map((city: { nome: string }) => ({ label: city.nome, value: city.nome }))
}

export interface GetAddressFromZipCodeReturn {
  street: string
  neighborhood: string
  city: string
  state: typeof BRAZILIAN_STATES[number]['value']
  add_on: string | null
  error: boolean
}

export const getAddressFromZipCode = async (cep: string): Promise<GetAddressFromZipCodeReturn> => {
  const { data } = await zipCodeApi.get(`/${cep}/json`)

  return {
    street: data.logradouro,
    neighborhood: data.bairro,
    city: data.localidade,
    state: data.uf,
    add_on: data.complemento,
    ...(data?.erro && { error: Boolean(data?.erro) })
  }
}

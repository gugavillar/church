import { citiesApi } from '@common/provider/citiesApi'
import { zipCodeApi } from '@common/provider/zipCodeApi'

interface GetCitiesReturn {
  label: string
  value: string
}

export const getCities = async (uf: string): Promise<Array<GetCitiesReturn>> => {
  const { data } = await citiesApi.get(`/localidades/estados/${uf}/municipios`)
  return data.map((city: { nome: string }) => ({ label: city.nome, value: city.nome }))
}

interface GetAddressFromZipCodeReturn {
  street: string
  neighborhood: string
  city: string
  state: string
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

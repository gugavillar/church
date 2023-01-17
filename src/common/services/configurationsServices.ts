import { Configurations } from '@common/@types/configurations'
import { faunaAPI, faunaQ } from '@common/provider/faunaApi'

export const getConfigurations = () =>
  faunaAPI.query<Configurations>(faunaQ.Get(faunaQ.Documents(faunaQ.Collection('configurations'))))

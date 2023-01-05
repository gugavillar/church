import { parse, differenceInYears } from 'date-fns'

export const calculateAge = (birthDate: string) => {
  const birth = parse(birthDate, 'dd/MM/yyyy', new Date())
  return differenceInYears(new Date(), birth)
}

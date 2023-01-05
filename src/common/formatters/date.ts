import { parse, differenceInYears } from 'date-fns'

export const calculateAge = (birthDate: string) => {
  const birth = parse(birthDate, 'dd/MM/yyyy', new Date())
  return differenceInYears(new Date(), birth)
}

export const timestampDate = (date: string) => {
  const [day, month, year] = date.split('/')
  return new Date(`${year}-${month}-${day}`).setHours(24, 0, 0)
}

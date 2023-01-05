export const formatToNumber = (value: string) => (!value ? null : Number(value?.replace(/\D/g, '')))

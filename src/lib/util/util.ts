import { DateArg, format } from 'date-fns'
import z from 'zod'

export function formatDate(date: DateArg<Date>) {
  return format(date, 'dd MMM yyyy h:mm a')
}

export const requiredString = (fieldString: string) =>
  z.string({ message: `${fieldString} is required` }).min(1, `${fieldString} is required`)

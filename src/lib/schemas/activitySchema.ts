import { z } from 'zod'

const requiredString = (fieldString: string) => z.string({ message: `${fieldString} is required` }).min(1, `${fieldString} is required`)

export const activitySchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Description'),
  category: requiredString('Category'),
  date: requiredString('Date'),
  city: requiredString('City'),
  venue: requiredString('Venue'),
})

export type ActivitySchema = z.infer<typeof activitySchema>

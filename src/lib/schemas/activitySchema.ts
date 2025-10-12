import { z } from 'zod'

const requiredString = (fieldString: string) =>
  z.string({ message: `${fieldString} is required` }).min(1, `${fieldString} is required`)

export const activitySchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Description'),
  category: requiredString('Category'),
  date: z.coerce.date(),
  location: z.object({
    venue: requiredString('Venue'),
    city: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  }),
})

export type ActivitySchema = z.infer<typeof activitySchema>

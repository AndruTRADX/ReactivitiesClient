import z from "zod";

const requiredString = (fieldString: string) =>
  z.string({ message: `${fieldString} is required` }).min(1, `${fieldString} is required`)

export const UpdateActivity = z.object({
  id: requiredString('Id'),
  title: requiredString('Title'),
  date: z.coerce.date(),
  description: requiredString('Date'),
  category: requiredString('Category'),
  city: requiredString('City'),
  venue: requiredString('Venue'),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export type UpdateActivitySchema = z.infer<typeof UpdateActivity>;
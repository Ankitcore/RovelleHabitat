import { z } from 'zod'

export const enquirySchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Please provide your full name (minimum 2 characters).' })
    .max(100, { message: 'Name cannot exceed 100 characters.' })
    .trim(),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'Please provide a valid email address.' })
    .max(120, { message: 'Email address cannot exceed 120 characters.' }),
  phone: z
    .string()
    .max(25, { message: 'Phone number cannot exceed 25 characters.' })
    .optional()
    .or(z.literal(''))
    .refine(
      (val) => {
        if (!val) return true
        // Allow optional +, digits, spaces, hyphens, and parenthesis
        return /^(\+?[0-9\s\-\(\)]{7,25})$/.test(val)
      },
      { message: 'Please enter a valid telephone number format.' }
    ),
  propertySlug: z.string().optional().or(z.literal('')),
  propertyName: z.string().optional().or(z.literal('')),
  enquiryType: z.enum(['viewing', 'floor_plan', 'general', 'specification'], {
    errorMap: () => ({ message: 'Please select an enquiry category.' }),
  }),
  preferredDate: z.string().optional().or(z.literal('')),
  message: z
    .string()
    .min(10, { message: 'Please provide a message with at least 10 characters.' })
    .max(2000, { message: 'Message cannot exceed 2000 characters.' })
    .trim(),
  hpWebsite: z.string().max(0, { message: 'Automated submission detected.' }).optional().or(z.literal('')),
})

export type EnquirySchemaType = z.infer<typeof enquirySchema>

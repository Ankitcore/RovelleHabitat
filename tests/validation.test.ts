import { describe, it, expect } from 'vitest'
import { enquirySchema } from '../src/lib/validation'

describe('Enquiry Form Validation Schema', () => {
  it('accepts valid enquiry input', () => {
    const input = {
      fullName: 'Elena Rostova',
      email: 'elena@example.com',
      phone: '+1 415 555 2671',
      propertySlug: 'the-monolith-residence',
      propertyName: 'The Monolith Residence',
      enquiryType: 'viewing',
      preferredDate: '2026-11-01',
      message: 'Interested in scheduling a private architectural tour on Saturday afternoon.',
      hpWebsite: '',
    }

    const result = enquirySchema.safeParse(input)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.email).toBe('elena@example.com')
      expect(result.data.fullName).toBe('Elena Rostova')
    }
  })

  it('rejects invalid email addresses', () => {
    const input = {
      fullName: 'Elena Rostova',
      email: 'not-an-email',
      enquiryType: 'general',
      message: 'Please send complete details.',
    }

    const result = enquirySchema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      const emailError = result.error.errors.find((e) => e.path.includes('email'))
      expect(emailError).toBeDefined()
    }
  })

  it('rejects short messages below 10 characters', () => {
    const input = {
      fullName: 'Marcus Vance',
      email: 'marcus@example.com',
      enquiryType: 'general',
      message: 'Hi',
    }

    const result = enquirySchema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      const msgError = result.error.errors.find((e) => e.path.includes('message'))
      expect(msgError).toBeDefined()
    }
  })

  it('rejects submissions with bot honeypot populated', () => {
    const input = {
      fullName: 'Bot User',
      email: 'bot@spammer.org',
      enquiryType: 'general',
      message: 'Buy cheap watches now!',
      hpWebsite: 'https://spam.website.com',
    }

    const result = enquirySchema.safeParse(input)
    expect(result.success).toBe(false)
  })

  it('normalizes email to lowercase and trims whitespace', () => {
    const input = {
      fullName: '  Sophia Chen  ',
      email: '  SOPHIA.CHEN@DOMAIN.COM  ',
      enquiryType: 'floor_plan',
      message: 'Requesting high-resolution CAD floor plans for architectural analysis.',
    }

    const result = enquirySchema.safeParse(input)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.fullName).toBe('Sophia Chen')
      expect(result.data.email).toBe('sophia.chen@domain.com')
    }
  })
})

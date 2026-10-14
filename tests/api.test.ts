import { describe, it, expect } from 'vitest'
import { POST } from '../src/app/api/enquiry/route'
import { NextRequest } from 'next/server'

function createJsonRequest(body: unknown, headers: Record<string, string> = {}): NextRequest {
  const url = 'http://localhost:3000/api/enquiry'
  return new NextRequest(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  })
}

describe('Enquiry API Route (/api/enquiry)', () => {
  it('successfully accepts and logs a valid enquiry', async () => {
    const req = createJsonRequest({
      fullName: 'Julian Alvarez',
      email: `julian.${Date.now()}@architecture.org`,
      phone: '+1 415 890 1234',
      propertySlug: 'the-monolith-residence',
      propertyName: 'The Monolith Residence',
      enquiryType: 'viewing',
      preferredDate: '2026-11-15',
      message: 'Requesting an accompanied walkthrough of the primary pavilion.',
    })

    const res = await POST(req)
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.success).toBe(true)
    expect(data.enquiryId).toBeDefined()
    expect(data.enquiryId).toMatch(/^ENQ-/)
  })

  it('rejects invalid inputs with 422 and structured field errors', async () => {
    const req = createJsonRequest({
      fullName: '',
      email: 'not-valid',
      enquiryType: 'viewing',
      message: 'short',
    })

    const res = await POST(req)
    expect(res.status).toBe(422)
    const data = await res.json()
    expect(data.success).toBe(false)
    expect(data.errors).toBeDefined()
    expect(data.errors.fullName).toBeDefined()
    expect(data.errors.email).toBeDefined()
    expect(data.errors.message).toBeDefined()
  })

  it('rejects spam bots when honeypot field is filled with 400', async () => {
    const req = createJsonRequest({
      fullName: 'Spam Bot',
      email: 'bot@spam.com',
      enquiryType: 'general',
      message: 'Special discounts on real estate marketing.',
      hpWebsite: 'http://spam-link.com',
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.success).toBe(false)
  })

  it('flags immediate duplicate submissions with 429', async () => {
    const uniqueEmail = `duplicate.${Date.now()}@example.com`
    const payload = {
      fullName: 'Arthur Pendelton',
      email: uniqueEmail,
      enquiryType: 'floor_plan',
      message: 'Please send complete structural floor plans for review.',
    }

    const firstReq = createJsonRequest(payload, { 'x-forwarded-for': '192.168.1.100' })
    const firstRes = await POST(firstReq)
    expect(firstRes.status).toBe(201)

    // Immediate second identical request
    const secondReq = createJsonRequest(payload, { 'x-forwarded-for': '192.168.1.100' })
    const secondRes = await POST(secondReq)
    expect(secondRes.status).toBe(429)
    const secondData = await secondRes.json()
    expect(secondData.success).toBe(false)
    expect(secondData.message).toContain('recent')
  })
})

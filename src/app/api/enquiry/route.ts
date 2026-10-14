import { NextRequest, NextResponse } from 'next/server'
import { enquirySchema } from '@/lib/validation'
import { siteConfig } from '@/data/siteConfig'

// In-memory rate limiting and deduplication store
interface SubmissionRecord {
  timestamp: number
  hash: string
}

const recentSubmissions = new Map<string, SubmissionRecord>()
// In-memory storage for demonstration inquiries that can be inspected
const loggedEnquiries: Array<{
  id: string
  receivedAt: string
  fullName: string
  email: string
  phone?: string
  propertySlug?: string
  propertyName?: string
  enquiryType: string
  preferredDate?: string
  message: string
}> = []

// Clean up old entries every 15 minutes
setInterval(() => {
  const cutoff = Date.now() - 15 * 60 * 1000
  recentSubmissions.forEach((value, key) => {
    if (value.timestamp < cutoff) {
      recentSubmissions.delete(key)
    }
  })
}, 15 * 60 * 1000)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 1. Honeypot check for spam bots
    if (body.hpWebsite && body.hpWebsite.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Submission rejected.' },
        { status: 400 }
      )
    }

    // 2. Server-side validation using Zod
    const validationResult = enquirySchema.safeParse(body)
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {}
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message
        }
      })
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid submission data. Please correct the highlighted fields.',
          errors: fieldErrors,
        },
        { status: 422 }
      )
    }

    const validData = validationResult.data

    // 3. Rate limiting and duplicate prevention
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'
    const submissionKey = `${clientIp}-${validData.email}`
    const submissionHash = `${validData.email}-${validData.enquiryType}-${validData.message.substring(0, 40)}`

    const existingRecord = recentSubmissions.get(submissionKey)
    const now = Date.now()

    if (existingRecord) {
      // Duplicate detection within 60 seconds
      if (existingRecord.hash === submissionHash && now - existingRecord.timestamp < 60000) {
        return NextResponse.json(
          {
            success: false,
            message: 'A matching enquiry was recently lodged. Please wait a moment before sending another request.',
          },
          { status: 429 }
        )
      }
      // Rate limit: max 1 submission every 10 seconds per IP/email
      if (now - existingRecord.timestamp < 10000) {
        return NextResponse.json(
          {
            success: false,
            message: 'Please wait a few seconds between submissions.',
          },
          { status: 429 }
        )
      }
    }

    recentSubmissions.set(submissionKey, {
      timestamp: now,
      hash: submissionHash,
    })

    // 4. Persistence / Dispatch
    const enquiryId = `ENQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    const record = {
      id: enquiryId,
      receivedAt: new Date().toISOString(),
      fullName: validData.fullName,
      email: validData.email,
      phone: validData.phone || undefined,
      propertySlug: validData.propertySlug || undefined,
      propertyName: validData.propertyName || undefined,
      enquiryType: validData.enquiryType,
      preferredDate: validData.preferredDate || undefined,
      message: validData.message,
    }

    loggedEnquiries.push(record)

    // Optional environment variable dispatch logging
    const targetEmail = process.env.ENQUIRY_NOTIFICATION_EMAIL || siteConfig.contact.email
    console.log(`[Rovelle Habitat] New Enquiry [${enquiryId}] routed to ${targetEmail}:`, {
      from: validData.email,
      name: validData.fullName,
      type: validData.enquiryType,
      property: validData.propertyName || 'General Inquiry',
    })

    return NextResponse.json(
      {
        success: true,
        message: `Your enquiry (${enquiryId}) has been successfully lodged. Our advisory team will respond within one business day.`,
        enquiryId,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[Rovelle Habitat] Enquiry API Error:', err)
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected server error occurred while processing your enquiry. Please email itsankitkumar405@gmail.com directly.',
      },
      { status: 500 }
    )
  }
}

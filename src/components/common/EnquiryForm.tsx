'use client'

import React, { useState } from 'react'
import { enquirySchema } from '@/lib/validation'
import { EnquiryType } from '@/types/enquiry'
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react'

interface EnquiryFormProps {
  propertySlug?: string
  propertyName?: string
  defaultType?: EnquiryType
  onSuccess?: () => void
}

export function EnquiryForm({
  propertySlug = '',
  propertyName = '',
  defaultType = 'general',
  onSuccess,
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertySlug: propertySlug,
    propertyName: propertyName,
    enquiryType: defaultType,
    preferredDate: '',
    message: '',
    hpWebsite: '', // honeypot
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverStatus, setServerStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field-level error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerStatus({ type: null, message: '' })

    // Client-side validation using Zod
    const validation = enquirySchema.safeParse(formData)
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {}
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors)
        }
        setServerStatus({
          type: 'error',
          message: data.message || 'Unable to record enquiry. Please verify details and try again.',
        })
        return
      }

      setServerStatus({
        type: 'success',
        message: data.message || 'Thank you. Your enquiry has been received by our architectural advisory team.',
      })

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        propertySlug: propertySlug,
        propertyName: propertyName,
        enquiryType: defaultType,
        preferredDate: '',
        message: '',
        hpWebsite: '',
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch {
      setServerStatus({
        type: 'error',
        message: 'A network error occurred. Please contact our advisory team directly at ankit.vzn@gmail.com.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot hidden input for spam bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hpWebsite">Leave this field blank</label>
        <input
          type="text"
          id="hpWebsite"
          name="hpWebsite"
          value={formData.hpWebsite}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Server Status Feedback */}
      {serverStatus.type === 'success' && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xs border border-green-200 bg-green-50/80 p-4 text-sm text-green-800"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
          <div>
            <p className="font-semibold">Enquiry Lodged Successfully</p>
            <p className="mt-0.5 text-xs text-green-700">{serverStatus.message}</p>
          </div>
        </div>
      )}

      {serverStatus.type === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xs border border-red-200 bg-red-50/80 p-4 text-sm text-red-800"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
          <div>
            <p className="font-semibold">Submission Error</p>
            <p className="mt-0.5 text-xs text-red-700">{serverStatus.message}</p>
          </div>
        </div>
      )}

      {/* Property Context Notice if applicable */}
      {propertyName && (
        <div className="rounded-xs border border-rovelle-border bg-rovelle-tint-blue/60 p-3 text-xs text-rovelle-charcoal">
          <span className="font-semibold">Selected Residence:</span> {propertyName}
        </div>
      )}

      {/* Name and Email Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Katherine Shaw"
            required
            className={`w-full rounded-xs border px-3.5 py-2.5 text-sm text-rovelle-charcoal placeholder:text-rovelle-muted/60 transition-colors focus:outline-none focus:ring-1 focus:ring-rovelle-slate ${
              errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-rovelle-border bg-white hover:border-rovelle-muted'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600" id="fullName-error">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="katherine@example.com"
            required
            className={`w-full rounded-xs border px-3.5 py-2.5 text-sm text-rovelle-charcoal placeholder:text-rovelle-muted/60 transition-colors focus:outline-none focus:ring-1 focus:ring-rovelle-slate ${
              errors.email ? 'border-red-400 bg-red-50/30' : 'border-rovelle-border bg-white hover:border-rovelle-muted'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600" id="email-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone and Enquiry Type Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal mb-1.5">
            Telephone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className={`w-full rounded-xs border px-3.5 py-2.5 text-sm text-rovelle-charcoal placeholder:text-rovelle-muted/60 transition-colors focus:outline-none focus:ring-1 focus:ring-rovelle-slate ${
              errors.phone ? 'border-red-400 bg-red-50/30' : 'border-rovelle-border bg-white hover:border-rovelle-muted'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600" id="phone-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiryType" className="block text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal mb-1.5">
            Enquiry Category <span className="text-red-500">*</span>
          </label>
          <select
            id="enquiryType"
            name="enquiryType"
            value={formData.enquiryType}
            onChange={handleChange}
            className="w-full rounded-xs border border-rovelle-border bg-white px-3.5 py-2.5 text-sm text-rovelle-charcoal transition-colors hover:border-rovelle-muted focus:outline-none focus:ring-1 focus:ring-rovelle-slate"
          >
            <option value="viewing">Schedule Private Viewing</option>
            <option value="floor_plan">Request Complete Floor Plans</option>
            <option value="specification">Architectural Specifications</option>
            <option value="general">General Enquiry</option>
          </select>
        </div>
      </div>

      {/* Preferred Date if viewing */}
      {formData.enquiryType === 'viewing' && (
        <div>
          <label htmlFor="preferredDate" className="block text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal mb-1.5">
            Preferred Viewing Window
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            className="w-full rounded-xs border border-rovelle-border bg-white px-3.5 py-2.5 text-sm text-rovelle-charcoal transition-colors hover:border-rovelle-muted focus:outline-none focus:ring-1 focus:ring-rovelle-slate"
          />
          <span className="mt-1 block text-[11px] text-rovelle-muted">
            Private viewings are scheduled between Monday and Saturday with 24-hour advance coordination.
          </span>
        </div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal mb-1.5">
          Message or Spatial Requirements <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please outline any specific requirements, timing considerations, or architectural questions."
          required
          className={`w-full rounded-xs border px-3.5 py-2.5 text-sm text-rovelle-charcoal placeholder:text-rovelle-muted/60 transition-colors focus:outline-none focus:ring-1 focus:ring-rovelle-slate ${
            errors.message ? 'border-red-400 bg-red-50/30' : 'border-rovelle-border bg-white hover:border-rovelle-muted'
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600" id="message-error">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xs bg-rovelle-charcoal px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-150 hover:bg-rovelle-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Verifying &amp; Lodging Enquiry...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Transmit Enquiry</span>
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-rovelle-muted">
        Your information is handled strictly according to our{' '}
        <a href="/privacy-policy" className="underline hover:text-rovelle-charcoal">
          Privacy Policy
        </a>
        . We do not sell or distribute personal data.
      </p>
    </form>
  )
}

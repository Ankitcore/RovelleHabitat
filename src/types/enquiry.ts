export type EnquiryType = 'viewing' | 'floor_plan' | 'general' | 'specification'

export interface EnquiryInput {
  fullName: string
  email: string
  phone?: string
  propertySlug?: string
  propertyName?: string
  enquiryType: EnquiryType
  preferredDate?: string
  message: string
  hpWebsite?: string // honeypot anti-spam field
}

export interface EnquiryResponse {
  success: boolean
  message: string
  enquiryId?: string
  errors?: Record<string, string>
}

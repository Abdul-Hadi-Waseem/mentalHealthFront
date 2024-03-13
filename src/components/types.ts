export interface DoctorDetails {
  appointment_fees: number
  city: string
  clinic_address: string
  clinic_experience: number
  clinic_name: string
  country: string
  created_date: string
  day: string
  description: string
  doctor_id: string
  end_time: string
  name: string
  specialities: string[]
  start_time: string
  state: string
  uid: string
  updated_date: string
  zip_code: string
  phone: string
  certificates: string[]
}
export interface paymentApiParams {
  amount: number
  patient_uid: string
  doctor_uid: string
  isInsured: boolean
  currency: string
}
export interface BookAppointmentParams {
  isInsured: boolean
  stripe_payment_id: string
  insuranceCompany?: string
  insuranceNumber?: string
  insuranceExpiry?: Date
}
export interface InsuranceInformation {
  insuranceCompany: string
  insuranceNumber: string
  expiryDate: string
}

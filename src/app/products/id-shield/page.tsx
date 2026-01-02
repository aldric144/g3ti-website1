'use client'

import { ProductDetailPage } from '@/components/ProductDetailPage'
import { Shield } from 'lucide-react'

export default function IDShieldPage() {
  return (
    <ProductDetailPage
      name="ID SHIELD™"
      tagline="Identity Protection Ecosystem"
      icon={Shield}
    />
  )
}

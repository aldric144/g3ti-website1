'use client'

import { ProductDetailPage } from '@/components/ProductDetailPage'
import { Heart } from 'lucide-react'

export default function HeartGuardAIPage() {
  return (
    <ProductDetailPage
      name="HeartGuard AI™"
      tagline="Domestic Violence Prevention Intelligence"
      icon={Heart}
    />
  )
}

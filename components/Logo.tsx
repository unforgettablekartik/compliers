import Image from 'next/image'
import React from 'react'

type Props = {
  size?: 'small' | 'medium' | 'large' | number
  className?: string
  alt?: string
}

export default function Logo({ size = 'medium', className = '', alt = 'Compliers logo' }: Props) {
  const presetSizes: Record<string, number> = { small: 40, medium: 64, large: 96 }
  const px = typeof size === 'number' ? size : (presetSizes[size] ?? presetSizes.medium)

  return (
    <div className={`site-logo ${className}`} style={{ width: px, height: px, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        src="/logo.png"
        alt={alt}
        width={px}
        height={px}
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  )
}

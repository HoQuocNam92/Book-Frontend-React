import React from 'react'

const IconFooter = ({ icon, text }: {
  icon: React.ReactNode
  text: string
}) => {
  return (
    <div className="flex min-w-0 items-start gap-3 sm:items-center">
      <span className="shrink-0 pt-0.5 sm:pt-0">{icon}</span>
      <span className="min-w-0 text-balance font-medium leading-snug">{text}</span>
    </div>
  )
}

export default IconFooter



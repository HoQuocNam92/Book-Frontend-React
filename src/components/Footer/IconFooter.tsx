import React from 'react'

const IconFooter = ({ icon, text }: {
  icon: React.ReactNode
  text: string
}) => {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  )
}

export default IconFooter



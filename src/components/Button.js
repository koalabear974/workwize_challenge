import React from 'react'
import { Button as FlowbiteButton } from 'flowbite-react'

const Button = ({ children, icon: Icon, ...props }) => {
  const iconWithClass = Icon ? <Icon className="Button--icon" /> : null
  return (
    <FlowbiteButton icon={iconWithClass} {...props}>
      {iconWithClass ? (
        <>
          <span className="hidden md:block">
            {children}
          </span>
          {iconWithClass}
        </>
      ) : children}
    </FlowbiteButton>
  )
}

export default Button

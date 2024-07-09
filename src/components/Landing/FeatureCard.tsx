import React from 'react'
interface Iprops {
  active?: boolean,
  title: string,
  description: string,
  icon?: any
}
const FeatureCard = ({ active, title, description, icon }: Iprops) => {
  return (
    <div className={"feature__card"}>
      {icon}
      <h3 className='mt-4'>{title}</h3>
      <p className='landing-page-p'>{description}</p>
    </div>
  )
}

export default FeatureCard
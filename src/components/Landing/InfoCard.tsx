import React from 'react'
interface Iprops{
    title:string,
    description:string,
}
const InfoCard = ({title,description}:Iprops) => {
  return (
    <div className='info__card'>
      <h3>{title}</h3>
      <p className='landing-page-p'>{description}</p>
    </div>
  )
}

export default InfoCard
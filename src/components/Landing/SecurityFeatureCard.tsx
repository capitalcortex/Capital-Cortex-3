import Image from 'next/image'
import React from 'react'
interface Iprops {
    img: string,
    title: string,
    description: string,
}
const SecurityFeatureCard = ({ img, title, description }: Iprops) => {
    return (
        <div className='security__feature__card'>
            <figure><Image src={img} height={70} width={70} alt="icon" /></figure>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default SecurityFeatureCard
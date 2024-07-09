import NiceModal from '@ebay/nice-modal-react';
import Image from 'next/legacy/image';
import React, { useState } from 'react';
import AdvisoryBoardMemberDetailModal from '@/components/Modals/AdvisoryBoardMemberDetailModal/AdvisoryBoardMemberDetailModal';

interface IProps {
    id?:string,
    img?: any,
    name?: string,
    about?: string,
    linksAbout?:any,
}
const BoardCard = ({ id, img, name, about , linksAbout}: IProps) => {
    return (
        <div className='board__card'>
            <figure>
                <Image layout="fill" src={img} alt={name ? name : "advisory board member"} className='object-cover' quality={100} placeholder='blur' blurDataURL={img}/>
            </figure>
            <div className="p-4">
                <h3>{name}</h3>
                <div className="post__board__card">
                    <p>{about}</p>
                    {linksAbout}
                    <button onClick={() => NiceModal.show(AdvisoryBoardMemberDetailModal, { id:id, name: name, img: img, about: about , linksAbout:linksAbout})}>Read More</button>
                </div>
            </div>
        </div>
    );
}
export default BoardCard;

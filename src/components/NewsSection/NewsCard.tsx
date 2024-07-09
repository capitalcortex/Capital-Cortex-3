import Image from "next/legacy/image";
import React, { useEffect } from "react";
import { ClockIcon, ExportLinearIcon } from "../Icons";
import Link from "next/link";
import { motion } from "framer-motion";
interface Iprops {
  newsDetails?: any;
  page?: any;
}
const NewsCard = ({ newsDetails, page }: Iprops) => {

  return (
    <>
    {
      newsDetails?.urls.map((article: any, i: number) => (
        (i >= (page*12) - 12  && i < (page * 12)) && <motion.div
          layout
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity:0 }}
          key={i}
        >
          <Link href={article} target="_blank">
          <article className="card card__news__and__updates newsCard bg-no-repeat w-full  grid grid-cols-12 gap-3">
            <div className="card__body newsCard__body col-span-9">
              <h4 className="card__title newsCard__body__title !text-black" data-title={newsDetails['titles'][i]}>{newsDetails['titles'][i]}</h4>
              <Link href={article} target="_blank" data-title={article}>
                <ExportLinearIcon className="flex-shrink-0 relative w-3 h-3" />
                <span className="truncate !text-black !text-sm">{article}</span>
              </Link>
            </div>
            <figure className={`newsCard__figure col-span-3`}>
              {newsDetails['thumbnails'][i]?<Image src={newsDetails['thumbnails'][i]} layout="fill" placeholder="blur" blurDataURL={`/_next/image?url=${newsDetails['thumbnails'][i]}&w=16&q=1`} alt="news cover" className="rounded-r-xl w-full object-cover relative"/>:
                <Image src={"/images/dummy/image-placeholder.jpg"} layout="fill" placeholder="blur" blurDataURL={"/images/dummy/image-placeholder.jpg"} alt="news cover" className="h-full rounded-r-xl w-full object-cover relative" />
              }
            </figure>
          </article>
          </Link>
        </motion.div>
      ))
    }
    </>
    
  );
};

export default NewsCard;

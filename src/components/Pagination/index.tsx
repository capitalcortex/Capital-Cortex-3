import React, {useState, useEffect} from 'react'
import { FaArrowLeft,FaArrowRight} from "react-icons/fa";
import ReactPaginate from 'react-paginate';

const Pagination = ({newsDetails, page, setPage}: any) => {

  const size = Math.round(newsDetails?.urls.length / 12)
  const [arr, setArr] = useState([1])

  useEffect(() => {
    let items = []
    for (let i = 0; i < size; i++) {
      items.push(i)
    }
    setArr(items)
  }, [])

  const handlePageClick = (event: any) => {
    setPage(event.selected + 1)
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<FaArrowRight className={`${page == arr.length && 'opacity-50 cursor-default'}`}/>}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={size}
      previousLabel={<FaArrowLeft className={`${page == 1 && 'opacity-50 cursor-default'}`}/>}
      renderOnZeroPageCount={null}
      className='flex gap-3 paginated-items'
      activeClassName='active-paginated-item'
    />
  )
}

export default Pagination
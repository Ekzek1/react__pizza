import React from 'react';
import ReactPaginate from 'react-paginate';

import cl from './Pagination.module.scss';

const Pagination = () => {
  return (
    <ReactPaginate
    className={cl.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(e) => console.log(e)}
    pageRangeDisplayed={4}
    pageCount={3}
    // forcePage={currentPage - 1}
  />
  )
}

export default Pagination
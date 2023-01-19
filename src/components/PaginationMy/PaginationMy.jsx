import React from 'react';
import cl from './PaginationMy.module.scss';

import { setPage, setPageNext, setPageBack } from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const PaginationMy = ({count}) => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.filter);

  const switchPage = (idx) => {
    dispatch(setPage(idx))
  }

  const back = () => {
    page === 1 ? dispatch(setPage(count)) : dispatch(setPageBack());
  }

  const next = () => {
    page === count ? dispatch(setPage(1)) : dispatch(setPageNext());
  }

  return (
    <ul className={cl.list}>
      <li className={cl.list__item} onClick = {back}>{'<'}</li>
      {[...new Array(count)].map((item, i ) => 
        <li className={page - 1 === i ? cl.list__item_active : cl.list__item } onClick={() => switchPage(i + 1)} key={i}>{i + 1}</li>
      )}
      <li className={cl.list__item} onClick = {next}>{'>'}</li>
    </ul>
  )
}

export default PaginationMy
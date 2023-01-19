import React from 'react';

import { setCategoryId, setPage} from '../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

const Categories = ({value}) => {

  const dispatch = useDispatch();

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const onChangeCategory = (i) => {
    dispatch(setCategoryId(i));
    dispatch(setPage(1));
  }

  return (
    <div className="categories">
    <ul>
      {categories.map((categoryName, i) =>
        <li 
          onClick={() => onChangeCategory(i)} 
          className={value === i ? 'active' : ''} 
          key={i} 
        >{categoryName}</li>
      )}
    </ul>
  </div>
  )
}

export default Categories
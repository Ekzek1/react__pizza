import React from 'react';

import { setCategoryId, setPage} from '../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

type CategoriesProps = {
  value: number;
};

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories: React.FC <CategoriesProps> = ({value}) => {

  const dispatch = useDispatch();

  const onChangeCategory = (i: number):void => {
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
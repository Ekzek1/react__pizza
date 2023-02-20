import React , {useRef, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';

import { useAppDispatch } from '../../redux/hooks';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('')
  const inputEl = React.useRef<HTMLInputElement>(null);


  const debounceSearch = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value))
    },250),
    [],
  );

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    debounceSearch(e.target.value)
  }
  
  const buttonClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue('');
    dispatch(setSearchValue(''))
    inputEl.current?.focus();
  }

  return (
    <div className={styles.root}>
      <svg className={styles.search} enableBackground="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32"  xmlns="http://www.w3.org/2000/svg"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/></svg>
      <input  
        value = {value} 
        onChange = {updateValue}
        className={styles.input} 
        placeholder = 'Поиск пиццы ...' 
        ref={inputEl}
      />
      {value && 
        <button className={styles.close} onClick={buttonClear}>
          <svg  viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs></defs><title/><g id="cross"><line className={styles.cross} x1="7" x2="25" y1="7" y2="25"/><line className={styles.cross} x1="7" x2="25" y1="25" y2="7"/></g></svg>
        </button>
      }
    </div>
  )
}

export default Search
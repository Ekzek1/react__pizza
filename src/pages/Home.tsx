import React , { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PaginationMy from '../components/PaginationMy/PaginationMy';

import { useAppSelector,useAppDispatch } from '../redux/hooks';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSLice';

import { list } from '../components/Sort';


const Home: React.FC = () => { 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const {categoryId, searchValue, sort, page } = useAppSelector((state) => state.filter);
  const { items, status } = useAppSelector((state) => state.pizza);
  const [countPage, setCountPage] = useState(0);

  // get Pizza
  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';

    dispatch(
      //@ts-ignore
      fetchPizzas({page,sortBy, order, category, search}));
  };

  //urlNavigate 
  const url = useEffect(()=> {
    if(isMounted.current){
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        page
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty , searchValue, page]);

  //parsing params
  const parsing = useEffect(() => {
    if(window.location.search){
      const params: any = qs.parse(window.location.search.substring(1));
      
      const sort  = list.filter(item => item.sortProperty === params.sortProperty);
      params.sortProperty = sort[0];
      
      dispatch(setFilters({
        ...params,
      }));

      isSearch.current = true;
      if(params.categoryId == 0){
        isSearch.current = false;
      }
    }
  }, [])

  useEffect(() => {
    if(!isSearch.current){
      getPizzas()
    };
    isSearch.current = false;
  }, [categoryId, sort.sortProperty , searchValue,page]);

  // allPageCount
  const allPageCount = useEffect(()=> {
    const category = categoryId > 0 ? `?category=${categoryId}` : '';
    axios.get(`https://639f29c27aaf11ceb8940d63.mockapi.io/items${category}`)
    .then((res) => res.data)
    .then(arr => {
      setCountPage(Math.ceil(arr.length / 4));
    })
  },[categoryId])


  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj}/> );
  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i}/> );

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId}/>
        <Sort/>
      </div> 
      <h2 className="content__title">Все пиццы</h2>
      {
        status === "error" 
        ? <h1 className='content__error-info'><span>😕</span><br/>Ничего не найдено</h1>
        : <div className="content__items">{status === 'loading' ? skeletons: pizzas}</div>
      } 
      <PaginationMy count={countPage}/>
    </div>
  )
}

export default Home;
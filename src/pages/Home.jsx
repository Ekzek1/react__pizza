import React , { useState, useEffect, useContext, useRef} from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PaginationMy from '../components/PaginationMy/PaginationMy';
import { SearchContext } from '../App';

import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';

import { list } from '../components/Sort';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const {categoryId, sort, page } = useSelector((state) => state.filter);
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countPage, setCountPage] = useState(0);

  // get Pizza
  const fetchPizzas = () => {
    setIsLoading(true)
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';

    axios.get(`https://639f29c27aaf11ceb8940d63.mockapi.io/items?page=${page}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
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
      const params = qs.parse(window.location.search.substring(1));
      
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
      fetchPizzas()
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


  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/> );
  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i}/> );

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId}/>
        <Sort/>
      </div> 
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading 
          ? skeletons
          : pizzas
        }
      </div>
      <PaginationMy count={countPage}/>
    </div>
  )
}

export default Home;
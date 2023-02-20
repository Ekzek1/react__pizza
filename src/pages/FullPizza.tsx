import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    price: number
  }>();
  const { id } =  useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza(){
      try{
        const { data }  =  await axios.get(`https://639f29c27aaf11ceb8940d63.mockapi.io/items/${id}`);
        setPizza(data);
      }catch(e){
        navigate('/')
      }
    }
    fetchPizza()
  }, [])

  return (
    pizza ?
    <div className='container'>
      <img src={pizza.imageUrl} alt="PizzaImg" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
    : <h1>Загрузка...</h1>
  )
}

export default FullPizza;
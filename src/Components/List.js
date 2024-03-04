import React, { useState, useEffect } from 'react';

const List = () => {
  const [items, setItems] = useState([]);
  const [newDataAvailable, setNewDataAvailable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://makeup-api.herokuapp.com/api/v1/products.json');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(); 
    }, 60000); 

    return () => clearInterval(interval); 
  }, []); 

  
  useEffect(() => {
    if (newDataAvailable) {
      console.log('Novos dados disponíveis!');
      setNewDataAvailable(false); 
    }
  }, [newDataAvailable]);

  const fetchData = async () => {
    try {
      const response = await fetch('sua_api_aqui');
      const data = await response.json();
      setItems(data);
      setNewDataAvailable(true); 
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Itens</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
          <img src={item.image_link} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>Marca: {item.brand}</p>
            <p>Preço: {item.price} {item.currency}</p>
            <p>Descrição: {item.description}</p>
          </div>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
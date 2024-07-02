import './App.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ListItems />
      <AddItem />
    </div>
  )
}



export const ListItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name} - {item.description} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export const AddItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/items', { name, description, price })
      .then(response => {
        console.log('Item added:', response.data);
        setName('');
        setDescription('');
        setPrice('');
      })
      .catch(error => console.error('Error adding item:', error));
  };

  return (
    <div>
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default App

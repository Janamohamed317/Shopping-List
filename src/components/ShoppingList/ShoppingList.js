import React, { useState, useEffect } from 'react';
import ShoppingListItem from './ShoppingListItem';
import './ShoppingList.css';

function ShoppingList() {
    const [itemName, setName] = useState('');
    const [itemNumber, setNumber] = useState('');
    const [items, setItems] = useState([]);
    const [id, setID] = useState(1);

    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem('shoppingListItems')) || [];
        if (savedItems.length > 0) {
            setItems(savedItems);
            setID(savedItems[savedItems.length - 1].id + 1);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
    }, [items]);

    const handleNameChange = (e) => setName(e.target.value);

    const handleNumberChange = (e) => setNumber(parseInt(e.target.value) || 0);

    const handleList = () => {
        if (itemName.trim() !== '' && itemNumber > 0) {
            const newItem = { id, name: itemName, quantity: itemNumber, isChecked: false };
            setItems(prevItems => [...prevItems, newItem]);
            setID(prevID => prevID + 1);
            setName('');
            setNumber('');
        } else {
            let message = '';
            if (itemName.trim() === '' && itemNumber <= 0) message = 'Please Enter Item Name and its Number';
            else if (itemNumber <= 0) message = 'Please Enter Positive Number';
            else if (itemName.trim() === '') message = 'Please Enter Item Name';
            alert(message);
        }
    };

    const removeItem = (id) => {
        const filteredItems = items.filter(item => item.id !== id);
        const reorderedItems = filteredItems.map((item, index) => ({
            ...item,
            id: index + 1
        }));
        setItems(reorderedItems);
        setID(reorderedItems.length + 1);
    };

    const clearList = () => {
        setItems([]);
        setID(1);
    };

    const toggleChecked = (id) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, isChecked: !item.isChecked } : item
        ));
    };

    return (
        <div className='container'>
            <div className='container-content'>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-9'>
                        <h3 className='txt'>Shopping List</h3>
                        <div className='d-flex justify-content-around'>
                            <div className='input d-flex justify-content-center'>
                                <label>Item Name:</label>
                                <input type='text' className='input-name' onChange={handleNameChange} value={itemName} />
                            </div>
                            <div className='input d-flex justify-content-center'>
                                <label>Item Count:</label>
                                <input type='number' className='input-number' onChange={handleNumberChange} value={itemNumber} />
                            </div>
                        </div>
                        <div className='btns d-flex justify-content-center'>
                            <button className='btn1' onClick={handleList}>Add</button>
                            <button className='btn2' onClick={clearList}>Clear List</button>
                        </div>
                        <ul>
                            {items.map(item => (
                                <ShoppingListItem
                                    key={item.id}
                                    {...item}
                                    remove={removeItem}
                                    toggleChecked={toggleChecked}
                                />
                            ))}
                        </ul>
                        <span>Total Item Count : {items.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingList;

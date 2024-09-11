import React from 'react';
import './ShoppingListItem.css';

function ShoppingListItem({ id, name, quantity, isChecked, remove, toggleChecked }) {
    return (
        <div className='container'>
            <li className="d-flex justify-content-between" >
                <div className='d-flex justify-content-center align-items-center'>
                    <input type="checkbox" checked={isChecked} onChange={() => toggleChecked(id)} />
                    <span className='list-item' style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
                        {id}. {name} x{quantity}
                    </span>
                </div>
                <button className='del-btn' onClick={() => remove(id)}>remove</button>
            </li>
            <hr />
        </div>
    );
}

export default ShoppingListItem;

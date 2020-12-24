import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './toDoList.css'

import Product from '../Product/product.jsx'

class ToDoList extends Component {

    state = {
        name: '',
        description: '',
        price: '',
        todosData: []
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            name: '',
            description: '',
            price: '',
            todosData: [...this.state.todosData, {
                id: uuidv4(),
                name: this.state.name,
                description: this.state.description,
                price: this.state.price + '$'
            }]
        })
    }

    render() {
        const productsList = !this.state.todosData.length ? 'Not Products'
            : this.state.todosData.map(el => {
                return <Product key={el.id} name={el.name} price={el.price === '$' ? '0$' : el.price} description={el.description} />
            })
        return (
            <div>
                <form onSubmit={this.handleSubmit} className='form'>
                    <input
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder='name'
                    />
                    <input
                        name='description'
                        value={this.state.description}
                        onChange={this.handleChange}
                        placeholder='description'
                    />
                    <input
                        name='price'
                        value={this.state.price}
                        onChange={this.handleChange}
                        placeholder='price'
                    />
                    <button>Add Pruduct</button>
                </form>
                <div className='products'>
                    {productsList}
                </div>
            </div>
        )
    }
}
export default ToDoList
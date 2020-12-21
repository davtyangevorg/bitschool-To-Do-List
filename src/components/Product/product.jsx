import React, { Component } from 'react'
import './product.css'

import Name from './Contents/name.jsx'
import Price from './Contents/price.jsx'
import Description from './Contents/description.jsx'

class Product extends Component {
    render() {
        const { name, price, description } = this.props
        return (
            <div className='product'>
                <Name name={name} />
                <Description description={description} />
                <Price price={price} />
            </div>
        )
    }
}

export default Product
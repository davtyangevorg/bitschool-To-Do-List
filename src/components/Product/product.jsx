import React, { Component } from 'react'

import Name from './Contents/name.jsx'
import Price from './Contents/price.jsx'
import Description from './Contents/description.jsx'

class Product extends Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <div>
                <Name name={this.props.name} />
                <Price price={this.props.price} />
                <Description description={this.props.description} />
            </div>
        )
    }
}

export default Product
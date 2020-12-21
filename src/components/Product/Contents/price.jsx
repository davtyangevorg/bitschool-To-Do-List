import React, { Component } from 'react'

class Price extends Component {
    constructor(props) {
        super(props)
        this.state = {
            price: props.price,
            signName: 'dram(Armenian)'
        }
    }

    changeCurrency = () => {
        const sign = this.state.price[this.state.price.length - 1]
        const priceNumber = +this.state.price.split('').slice(0, -1).join('')

        if (sign === '$') {
            this.setState({
                price: (priceNumber * 500).toString() + '֏',
                signName: 'dollar(USD)'
            })  
        }
        if (sign === '֏') {
            this.setState({
                price: (priceNumber / 500).toString() + '$',
                signName: 'dram(Armenian)'
            })
        }
    }

    render() {
        return (
            <div>
                <span style={{ marginRight: '10px' }}>
                    {this.state.price}
                </span>
                <button onClick={this.changeCurrency} style={{ cursor: 'pointer', padding: '5px' }}>
                    Change the currency in {this.state.signName}
                </button>
            </div>
        )
    }
}

export default Price
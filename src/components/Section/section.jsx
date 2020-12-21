import React from 'react'
import './section.css'

import Product from '../Product/product.jsx'

const Section = () => {
    return (
        <section className='section'>
            <Product name='Phone' price='15$' description='This phone was manufactured in China' />
        </section>
    )
}

export default Section

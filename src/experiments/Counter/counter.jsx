import React from 'react'

import ShowCount from './showCount.jsx'
import SetCount from './setCount.jsx'

const Counter = () => {
    return (
        <div style={{padding:'20px'}}>
            <ShowCount/>
            <SetCount/>
        </div>
    )
}

export default Counter

import React from 'react'

import Increment from '../increment.jsx'
import Decrement from '../decrement.jsx'

const SetCount = () => {
    return (
        <div style={{display:'flex'}}>
            <Increment/>
            <Decrement/>
        </div>
    )
}

export default SetCount

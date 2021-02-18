import React from 'react'
import { connect } from 'react-redux'

const Increment = (props) => {

    return (
        <div style={{ marginRight: '20px' }}>
            <button onClick={props.increment}>Increment</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch({ type: 'INCREMENT' })
    }
}

export default connect(null, mapDispatchToProps)(Increment)


import React from 'react'
import { connect } from 'react-redux'

const Decrement = (props) => {
    return (
        <div>
            <button onClick={props.decrement}>Decrement</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        decrement: () => dispatch({ type: 'DECREMENT' })
    }
}

export default connect(null, mapDispatchToProps)(Decrement)


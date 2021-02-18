import React from 'react'
import { connect } from 'react-redux'

const ShowCount = (props) => {

    return (
        <div style={{ marginBottom: '20px' }}>
            count {props.count}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}

export default connect(mapStateToProps)(ShowCount)

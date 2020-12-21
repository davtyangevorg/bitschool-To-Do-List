import React, { Component } from 'react'

class Name extends Component {

    render() {
        return (
            <div style={{ marginBottom: '10px' }}>
                {this.props.name}
            </div>
        )
    }
}

export default Name
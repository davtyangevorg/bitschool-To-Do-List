import React, { Component } from 'react'

class Description extends Component {

    render() {
        return (
            <div style={{ marginBottom: '10px' }}>
                {this.props.description}
            </div>
        )
    }
}

export default Description
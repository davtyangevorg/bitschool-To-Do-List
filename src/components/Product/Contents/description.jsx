import React, { Component } from 'react'

class Description extends Component {

    render() {
        return (
            <div>
                description: {this.props.description}
            </div>
        )
    }
}

export default Description
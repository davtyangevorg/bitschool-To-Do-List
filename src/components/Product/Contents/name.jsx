import React, { Component } from 'react'

class Name extends Component {

    render() {
        return (
            <div>
                name: {this.props.name}
            </div>
        )
    }
}

export default Name
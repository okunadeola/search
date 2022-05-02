import React, { Component } from 'react'

export default class Test extends Component {

  constructor(){
    super()
    this.state = {
      data: "info"
    }
  }

  componentDidMount(){
    console.log(this.state.data)
  }








  render() {
    return (
      <div>Test</div>
    )
  }
}

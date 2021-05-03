import { PureComponent, Component } from 'react'

class Greeting extends Component {
  componentDidUpdate () {
    console.log('child componentDidUpdate')
  }
  componentDidMount () {
    console.log('child componentDidMount')
  }
  render () {
    console.log('child render')
    return (<h1>Hello world {this.props.loading}</h1>)
  }
}
export default Greeting
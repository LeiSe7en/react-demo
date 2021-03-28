import { PureComponent } from 'react'

class Greeting extends PureComponent {
    componentDidUpdate () {
        console.log('child componentDidUpdate')
    }
    componentDidMount () {
        console.log('child componentDidMount')
    }
    render () {
        return (<h1>Hello world {this.props.loading}</h1>)
    }
}
export default Greeting
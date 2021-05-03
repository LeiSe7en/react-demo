import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, useParams } from 'react-router-dom'
import Greeting from '../components/Greeting.js'
// import { useSelector } from 'react-redux'
import { increment } from '../actions'
import { connect } from 'react-redux'
import request from '../utils/request'
import User from '../components/User'
class Home extends Component {
    state = {
      loading: 2000,
      hello: 'Hello everyone',
      users: []
    }
    constructor (props) {
      super(props)
      console.log('dsdss')
      const { match, location, history } = this.props;
      console.log(match, location, history)
    }
    pushQuery () {
      console.log(this.props.history)
    }

    dispatchAction () {
      this.setState({
        hello: 'Hello Nelson'
      })
    }

    render() {
      // 每次修改展示相关的内容：例如this.state.hello，都会触发render函数
      console.log('render')
      const counter = this.props.state
      const { users } = this.state
      return (
        <div>
          {counter}
          <button onClick={this.dispatchAction.bind(this)}>+</button>
          { this.state.loading }
          { this.state.hello }
          <Greeting loading={this.state.loading}></Greeting>
          {
            users.map(user => (
              <User {...user}></User>
            ))
          }
        </div>
      )
    }
    
    async componentDidMount () {
      // 子组件先点用componentDidMount，然后父组件调用
      console.log('parent componentDidMount')
      const users = await request.get('/')
      this.setState({
        users: users.results
      })
    }
}

const mapStateToProps = function (state) {
  return {
    counter: state.counter
  }
}

export default connect(mapStateToProps)(Home)
// export default withRouter(Home)

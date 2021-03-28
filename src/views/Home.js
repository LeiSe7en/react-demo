import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, useParams } from 'react-router-dom'
import Greeting from '../components/Greeting.js'
// import { useSelector } from 'react-redux'
import { increment } from '../actions'
import { connect } from 'react-redux'
class Home extends Component {
    state = {
        loading: 2000
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
    render() {
        const counter = this.props.state
        return (
            <div>
                {counter}
                <button onClick={this.pushQuery.bind(this)}>+</button>
                {this.state.loading}
                <Greeting loading={this.state.loading}></Greeting>
            </div>
        )
    }
    
}

const mapStateToProps = function (state) {
  return {
      counter: state.counter
  }
}

// export default connect(mapStateToProps)(Home)
export default withRouter(Home)

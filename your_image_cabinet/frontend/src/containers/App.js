import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as UserActionCreators from '../actions/user'
import Header from '../components/Header'
import Home from '../components/Home'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import ImageCabinet from '../components/ImageCabinet'

function Entry () {
  return (
    <div className="welcome">
      <button className="welcome__button">Your Image Cabinet</button>
    </div>
  )
}

class Application extends Component {
  static propTypes = {
    userLoggedIn: PropTypes.bool.isRequired
  }

  componentWillMount() {
    if (sessionStorage.getItem('userLoggedIn') == 'true') {
      const action = UserActionCreators.logInUser()
      const { dispatch } = this.props
      dispatch(action)
    }
  }

  render() {
    const { dispatch, userLoggedIn } = this.props
    const logInUser = bindActionCreators(UserActionCreators.logInUser, dispatch)
    const logOutUser = bindActionCreators(UserActionCreators.logOutUser, dispatch)

    return (
      <BrowserRouter>
        <div>
        <Header userLoggedIn={userLoggedIn} logOutUser={logOutUser}/>
        <Switch>
          <Route exact path='/cabinet/' component={ImageCabinet} />
          <Route exact path='/signup/' render={() => <Signup logInUser={logInUser} />} />
          <Route exact path='/signin/' render={() => <Signin logInUser={logInUser} />} />
          <Route path='/' component={Home}/>
        </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  userLoggedIn: state.loggedIn
})

export default connect(mapStateToProps)(Application)

// let xhr = new XMLHttpRequest()
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === XMLHttpRequest.DONE) {
//     console.log(xhr.responseText)
//   }
// }
// xhr.open('GET', '/index/')
// xhr.send()

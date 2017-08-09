import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Signup from './components/Signup'
import Signin from './components/Signin'
import ImageCabinet from './components/ImageCabinet'

function Entry () {
  return (
    <div className="welcome">
      <button className="welcome__button">Your Image Cabinet</button>
    </div>
  )
}

function Application () {
  return (
    <BrowserRouter>
      <div>
      <Header />
      <Switch>
        <Route exact path='/signup/' component={Signup} />
        <Route exact path='/signin/' component={Signin} />
        <Route exact path='/cabinet/' component={ImageCabinet} />
        <Route path='/' component={Home}/>
      </Switch>
      </div>
    </BrowserRouter>
  )
}


ReactDOM.render(<Application />, document.getElementById('container'))

let xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    console.log(xhr.responseText)
  }
}
xhr.open('GET', '/index/')
xhr.send()

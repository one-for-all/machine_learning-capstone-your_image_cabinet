import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Navigation from './Navigation'
import ImageUpload from './ImageUpload'
import ImageStream from './ImageStream'

function Home () {
  return (
    <div>
    <Navigation />
    <Route exact path='/' render={ () => <Redirect to='/image-upload/' /> } />
    <Route exact path='/image-upload/' component={ImageUpload} />
    <Route exact path='/image-stream/' component={ImageStream} />
    </div>
  )
}

export default Home

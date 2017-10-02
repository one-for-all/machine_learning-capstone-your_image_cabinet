import React, { Component } from 'react'
import axios from 'axios'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class ImageStream extends Component {
  state = JSON.parse(localStorage.getItem('imageStreamState')) || {
    images: [],
    stage: 'loading' // 'loaded', 'error', 'checkingUpdate'
  }

  texts = {}

  componentWillMount() {
    this.setState({
      stage: this.state.images.length ? 'checkingUpdate' : 'loading'
    })
    axios.get('/api/v1/image_stream/')
    .then(response => {
      this.setState({
        images: response.data.images,
        stage: 'loaded'
      })
    }).catch(error => {
      console.log(error)
      this.setState({
        'stage': 'error'
      })
    })
  }

  componentWillUnmount() {
    localStorage.setItem('imageStreamState', JSON.stringify(this.state))
  }

  onSubmit = (img_id) => {
    const images = this.state.images.filter(image => {
      return image.id != img_id
    })
    this.setState({images: images})
    axios.post('/api/v1/describe_image/', {
      'text': this.texts[img_id].value,
      'image': img_id
    }).then(response => {
      console.log(response.data)
    }).catch(error => {
      console.log(error.response.data)
    })
  }


  render () {
    const imageStreamCards = this.state.images.map(image => {
      return (
        <div className='image-stream__card' key={image.id}>
          <img className='image-stream__img' src={image.image}></img>
          <textarea placeholder='description' ref={(input) => this.texts[image.id] = input}></textarea>
          <button onClick={() => this.onSubmit(image.id)}>Submit</button>
        </div>
      )
    })

    return (
      <ReactCSSTransitionGroup component='div' className='image-stream' transitionName='stream-card' transitionEnterTimeout={0} transitionLeaveTimeout={2000}>
        {imageStreamCards}
        {this.state.stage === 'loading' &&
          <p className='image-stream__placeholder'>
            Loading...
          </p>}
        {this.state.stage === 'checkingUpdate' &&
          <p className='image-stream__placeholder'>
            Checking For Updates...
          </p>}
        {this.state.stage === 'error' &&
          <p className='image-stream__placeholder'>
            Error...
          </p>}
        {this.state.stage === 'loaded' && this.state.images.length === 0 &&
          <p className='image-stream__placeholder'>
            No image stream available yet.
          </p>}
      </ReactCSSTransitionGroup>
    )
  }
}

export default ImageStream

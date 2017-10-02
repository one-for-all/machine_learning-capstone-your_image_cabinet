import React, { Component } from 'react'
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function ImageCabinetCard (props) {
  return (
    <div className='image-cabinet__card'>
      <img className='image-cabinet__img' src={props.url}></img>
      <p>{props.description}</p>
    </div>
  )
}


class ImageCabinet extends Component {
  state = JSON.parse(localStorage.getItem('imageCabinetState')) || {
    images: [],
    stage: 'loading' // 'loaded', 'error', 'checkingUpdate'
  }

  componentWillMount() {
    this.setState({
      stage: this.state.images.length ? 'checkingUpdate' : 'loading'
    })
    axios.get('/api/v1/image_cabinet/')
    .then(response => {
     this.setState({
       images: response.data.images,
       stage: 'loaded'
     })
    })
    .catch(error => {
     console.log(error.response.error)
     this.setState({
       stage: 'error'
     })
    })
  }

  componentWillUnmount() {
    localStorage.setItem('imageCabinetState', JSON.stringify(this.state))
  }

  render() {
    return (
      <div className='image-cabinet'>
        {this.state.images.map(image => {
          return <ImageCabinetCard url={image.image} description={image.description} key={image.id} />
        })}
        {this.state.stage === 'loading' &&
        <p className='image-cabinet__placeholder'>
          Loading...
        </p>}
        {this.state.stage === 'checkingUpdate' &&
        <p className='image-cabinet__placeholder'>
          Checking For Updates...
        </p>}
        {this.state.stage === 'error' &&
        <p className='image-cabinet__placeholder'>
          Error Occurred...
        </p>}
        {this.state.stage === 'loaded' && this.state.images.length === 0 &&
          <p className='image-cabinet__placeholder'>
            You haven't uploaded any images yet.
          </p>}
      </div>
    )
  }
}

export default ImageCabinet

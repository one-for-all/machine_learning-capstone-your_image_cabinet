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
  state = {
    images: []
  }

  componentDidMount() {
    axios.get('/api/v1/image_cabinet/')
         .then(response => {
           this.setState({
             images: response.data.images
           })
         })
         .catch(error => {
           console.log(error)
         })
  }

  render() {
    return (
      <div className='image-cabinet'>
        {this.state.images.map(image => {
          return <ImageCabinetCard url={image.image} description={image.description} key={image.id} />
        })}
        {this.state.images.length === 0 &&
          <p className='image-cabinet__placeholder'>
            You haven't uploaded any images yet.
          </p>}
      </div>
    )
  }
}

export default ImageCabinet

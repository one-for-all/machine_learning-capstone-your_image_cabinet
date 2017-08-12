import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class ImageUpload extends Component {
  state = {
    image: null,
    description: null,
    stage: 'initial', // 'predicting', 'predicted', 'error'
  }

  onSelect = (e) => {
    this.fileSelect.click()
  }

  onChange = (e) => {
    let file = this.fileSelect.files[0]
    let reader = new FileReader()
    reader.addEventListener('load', (e) => {
      this.setState({
        image: reader.result
      })
    }, false)
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file)
    }
  }

  onConfirm = (e) => {
    if (this.state.image) {
      let file = this.fileSelect.files[0]
      let formData = new FormData()
      formData.append('image', file, file.name)
      axios.post('/api/v1/image_upload/' ,formData)
      .then(response => {
        console.log(response.data)
        this.setState({
          stage: 'predicted',
          description: response.data.description
        })
      })
      .catch(error => {
        console.log(error.response.data)
        this.setState({
          stage: 'error',
          description: error.response.data
        })

      })
      this.setState({
        stage: 'predicting'
      })
    }
  }

  render() {
    const image = this.state.image
    const description = this.state.description
    const stage = this.state.stage

    return (
      <div className='image-upload'>
        {image ?
          <img className='image-upload__img' src={image}></img>
          :
          <img className='image-upload__img' src="/assets/images/placeholder.png"></img>
        }
        {stage === 'initial' && <button className='image-upload__button' onClick={this.onSelect}>Select</button>}
        <input
          type='file' style={{display: 'none'}}
          accept='image/*'
          onChange={this.onChange}
          ref={(input) => this.fileSelect = input}></input>
        {stage === 'initial' && <button className='image-upload__button' onClick={this.onConfirm}>Confirm</button>}
        {stage === 'predicting' && <p className='image-upload__p'>Predicting...</p>}
        {stage === 'predicted' && <p className='image-upload__p'>{description}</p>}
        {stage === 'error' && <p className='image-upload__p'>{description}</p>}
        {(stage === 'predicted' || stage === 'error') &&
         <button className='image-upload__button' onClick={
           () => this.setState({image: null, stage: 'initial'})}>Upload Another
         </button>}
      </div>
    )
  }
}

export default ImageUpload

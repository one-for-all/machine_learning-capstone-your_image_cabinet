import React from 'react'

function ImageUpload() {
  return (
    <div className='image-upload'>
      <img className='image-upload__img' src="/assets/images/placeholder.png"></img>
      <button className='image-upload__button'>Select</button>
      <button className='image-upload__button'>Confirm</button>
    </div>
  )
}

export default ImageUpload

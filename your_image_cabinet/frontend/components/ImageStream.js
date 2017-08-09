import React from 'react'

function ImageStream() {
  return (
    <div className='image-stream'>
      <div className='image-stream__card'>
        <img className='image-stream__img' src="/assets/images/placeholder.png"></img>
        <textarea placeholder='description'></textarea>
        <button>Submit</button>
      </div>
      <div className='image-stream__card'>
        <img className='image-stream__img' src="/assets/images/placeholder.png"></img>
        <textarea placeholder='description'></textarea>
        <button>Submit</button>
      </div>
    </div>
  )
}

export default ImageStream

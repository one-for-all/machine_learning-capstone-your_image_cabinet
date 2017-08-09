function Entry () {
  return (
    <div className="welcome">
      <button className="welcome__button">Your Image Cabinet</button>
    </div>
  )
}

function Header () {
  return (
    <header className="header">
      <h1 className="header__heading">Your Image Cabinet</h1>
      <img className="header__icon" src="assets/images/cabinet_icon.svg"></img>
      <ul className="header__nav">
        <li>Sign Up</li>
        <li>Sign In</li>
      </ul>
    </header>
  )
}

function Navigation () {
  return (
    <div className="main-nav">
      <ul className="main-nav__ul">
        <li className="main-nav__li--selected">Upload Image</li>
        <li className="main-nav__li">Image Stream</li>
      </ul>
    </div>
  )
}

function ImageUpload() {
  return (
    <div className='image-upload'>
      <img className='image-upload__img' src="assets/images/placeholder.png"></img>
      <button className='image-upload__button'>Select</button>
      <button className='image-upload__button'>Confirm</button>
    </div>
  )
}

function Application () {
  return (
    <div>
    <Header />
    <Navigation />
    <ImageUpload />
    </div>
  )
}


ReactDOM.render(<Application />, document.getElementById('container'))

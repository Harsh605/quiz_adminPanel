import React, { useState } from 'react'
import Footer from '../Components/Footer'
import Slider from '../Components/Home/Slider'
import Alert from '../Components/Alert'
import TextEditor from './Text'

const Home = () => {
     const [flag, setFlag] = useState(true);
  return (
    <>
      <Slider/>
      {/* <Alert flag={flag} setFlag={setFlag} errorType="success" message="Account Created"/> */}
    </>
  )
}

export default Home
import axios from "axios";
import React from 'react'

export default async function sendImage_(formData, over){
    console.log("params", formData)
    over(true);
    const reqOpts = {
      method : 'POST',
      body: formData
    }
    const res = fetch(`http://127.0.0.1:8000/send2`, reqOpts, {mode: 'cors'})
    .then(res => res.json())
    .then( function(response) {
      console.log("inside", response)
      over(false)
      return response.message
    })
    .catch((e) => console.log("error:  ",e));
    return res;
    /*axios.defaults.headers.common['content-type'] = `text/json`;
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/send2`,
      withCredentials: false,
      credentials: 'same-origin',
      formData
    }).then(e => {
      console.log("response",e)
      //setOverlayPresent(true)
      over(true)
      th =  true
    }).catch((e) => console.log("error:  ",e));
    return th*/

  }
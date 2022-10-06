import axios from "axios";
import React from 'react'

export default async function sendImage_(files, over){
    const params = {
      'name': files[0].name,
      'file': "text"

    }
    let th = false
    axios.defaults.headers.common['content-type'] = `text/json`;
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/send2`,
      mode: 'no-cors',
      withCredentials: false,
      credentials: 'same-origin',
      params
    }).then(e => {
      console.log(e)
      //setOverlayPresent(true)
      over(true)
      th =  true
    }).catch((e) => console.log("error:  ",e));
    return th

  }
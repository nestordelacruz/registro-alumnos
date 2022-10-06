import axios from "axios";
import React from 'react'

export default async function sendImage(files){
    console.log("file",files[0])
    const url = files[0].preview; 
    const params = {
      'name': files[0].name,
      'file': "text"

    }
    
    axios.defaults.headers.common['content-type'] = `text/json`;
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/send2`,
      mode: 'no-cors',
      withCredentials: false,
      credentials: 'same-origin',
      params
    }).catch((e) => console.log("error:  ",e));
    return true

  }
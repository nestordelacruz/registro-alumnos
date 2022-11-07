import axios from "axios";
import React from 'react'

export default async function sendImage_(formData, over, idType){
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
      return response
    })
    .catch((e) => {
      console.log("error:  ",e)
      return e;
    });
    return res;

  }
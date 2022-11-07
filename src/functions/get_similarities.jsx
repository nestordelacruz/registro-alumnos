import axios from "axios";
import React from 'react'

export default async function get_similarities_( user_data){
    console.log("JSON sent", JSON.stringify({"data": user_data}))
    const reqOpts = {
      method : 'POST',
      body: JSON.stringify({'data': user_data})
    }
    const res = fetch(`http://127.0.0.1:8000/similarity`, reqOpts, {mode: 'cors'})
    .then(res => res.json())
    .then( function(response) {
      console.log("inside", response)
      return response
    })
    .catch((e) => {
      console.log("error:  ",e)
      return e;
    });
    return res;

  }
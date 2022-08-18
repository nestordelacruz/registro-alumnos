import React, {useEffect, useState, useCallback} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Popup from './IdPopup';
import {useDropzone} from 'react-dropzone';

function Home(props) {

  let navigate = useNavigate();
  const location = useLocation();
  console.log(location); 

  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    if (location.state===null ||  
      location.state.isLogged === false){
      return navigate('/')
    }
  });

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div>
      <h1>This is the home page</h1>
      <div className='home-page'>

        <button className="id-type-box" onClick={() => setButtonPopup(true)}> temporal</button>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>Popup</h3>
          <p>In here add dragable space to upload files</p>
          <p>In here add button : "Subir archivo"</p>
          <div className='dnd-box'>
            <div className='dnd-upload-bound' {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop some files here, or click to select files</p>
              }
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
  
  
}

export default Home;

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

  const [files, setFiles] = useState([]);

  const [showText, setShowText] = useState(true);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
      'image/jpg' : ['.jpg']
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      )

      //hide divs and p within  
      setShowText(false);
    }

  })

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img className="file-Image" src={file.preview} alt="preview"/>
      </div>
    </div>
  ))

  return (
    <div>
      <h1>This is the home page</h1>
      <div className='home-page'>

        <button className="id-type-box" onClick={() => setButtonPopup(true)}> temporal</button>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>Popup</h3>
          <p>In here add dragable space to upload files</p>
          <p>In here add button : "Subir archivo"</p>

          <div className='dnd-upload-bound' {...getRootProps()}>
            
     
            <input {...getInputProps()} /> 
            {showText ? 
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            : null}
            
            <div>{images}</div>
          </div>
          
          
        </Popup>
      </div>
    </div>
  );
  
  
}

export default Home;

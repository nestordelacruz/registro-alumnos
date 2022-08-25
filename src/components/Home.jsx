import React, {useEffect, useState, useCallback} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Popup from './IdPopup';
import {useDropzone} from 'react-dropzone';
import UserRegistrationStatus from './UserRegistrationStatus';
import ExpiredIDPopup from './ExpiredIDPopup';
  // Variables para seleccion de tipo de identificacion

function Home(props) {


  let navigate = useNavigate();
  const location = useLocation();
  console.log(location); 

  const [buttonPopup, setButtonPopup] = useState(false);
  const [idType, setIdType] = useState('')
  const [isRegistered, setIsRegistered] = useState(false);
  const [expiredPopup, setExpiredPopup] = useState(false);
  
  const availableIDTypes = {"ine": "INE", "pasaporte-mexicano": "Pasaporte Mexicano", "passport-book": "Passport Book (USA)",
    "passport-card" : "Passport Card (USA)", "extranjero": "Extranjero (Pasaporte)"};



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
      
      if (acceptedFiles.length === 1) {
        setFiles(
          acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file)
          }))
        )

        //hide divs and p within  
        setShowText(false);
      }

    }

  })

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img className="file-Image" src={file.preview} alt="preview"/>
      </div>
    </div>
  ))

  function idTypeChange(idType) {
    setIdType(idType);
  }

  return (
    <div>
      <h1>Hola, X</h1>  
      <UserRegistrationStatus userStatus={isRegistered}></UserRegistrationStatus>
      <h2>Selecciona tu tipo de identificacion: </h2>  

      <div className='home-page'>

        <button className="id-type-box" id="btn-ine" onClick={() => {setButtonPopup(true); idTypeChange("ine")}}>INE</button>
        <button className="id-type-box" id="btn-pasaporte-mexicano" onClick={() => {setButtonPopup(true); idTypeChange("pasaporte-mexicano")}}>Pasaporte Mexicano</button>
        <button className="id-type-box" id="btn-passport-book" onClick={() => {setButtonPopup(true); idTypeChange("passport-book")}}>Passport Book (USA)</button>
        <button className="id-type-box" id="btn-passport-card" onClick={() => {setButtonPopup(true); idTypeChange("passport-card")}}>Passport Card (USA) </button>
        <button className="id-type-box" id="btn-extranjero" onClick={() => {setButtonPopup(true); idTypeChange("extranjero")}}>Extranjero (pasaporte)</button>
        {/*<ExpiredIDPopup trigger={expiredPopup} setTrigger={setExpiredPopup}>
          La identificación ingresada está expirada. Favor de ingresar una identificación valida. 
        </ExpiredIDPopup> */}
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <p>{idType}</p>
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

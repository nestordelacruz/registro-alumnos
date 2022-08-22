import React, {useEffect, useState, useCallback} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Popup from './IdPopup';
import {useDropzone} from 'react-dropzone';
import UserRegistrationStatus from './UserRegistrationStatus';
  // Variables para seleccion de tipo de identificacion

function Home(props) {


  let navigate = useNavigate();
  const location = useLocation();
  console.log(location); 

  const [buttonPopup, setButtonPopup] = useState(false);
  const [idType, setIdType] = useState('')
  const [isRegistered, setIsRegistered] = useState(false);
  
  const availableIDTypes = {"ine": "INE", "pasaporte-mexicano": "Pasaporte Mexicano", "passport-book": "Passport Book (USA)",
    "passport-card" : "Passport Card (USA)", "extranjero": "Extranjero (Pasaporte)"};


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
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <p>{idType}</p>
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

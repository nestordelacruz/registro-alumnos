import React, {useEffect, useState} from 'react';
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
  const [files, setFiles] = useState([]);
  const [expiredPopup, setExpiredPopup] = useState(false);
  const [notAPic, setNotAPic] = useState(false);
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
      else{
        setNotAPic(true);
        // uncomment if idpopup should close after invalid file type
        //setButtonPopup(false)
      }
    }

  })

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img className="file-image" src={file.preview} alt="preview"/>
      </div>
    </div>
  ))

  function idTypeChange(idType) {
    setIdType(idType);
  }


  useEffect(() => {
    if (location.state===null ||  
      location.state.isLogged === false){
      return navigate('/')
    }
    if (buttonPopup===false){
      setFiles([])
      setShowText(true)
      setIdType('')
    }
  }, [buttonPopup, location, navigate]);

  return (
    <div>
      <h1>Hola, X</h1>  
      <UserRegistrationStatus userStatus={isRegistered}></UserRegistrationStatus>
      <h2>Selecciona tu tipo de identificacion: </h2>  

      <div className='home-page'>

        <button className="id-type-box" id="btn-ine" onClick={() => {setButtonPopup(true); idTypeChange("INE")}}>INE</button>
        <button className="id-type-box" id="btn-pasaporte-mexicano" onClick={() => {setButtonPopup(true); idTypeChange("pasaporte-mexicano")}}>Pasaporte Mexicano</button>
        <button className="id-type-box" id="btn-passport-book" onClick={() => {setButtonPopup(true); idTypeChange("passport-book")}}>Passport Book (USA)</button>
        <button className="id-type-box" id="btn-passport-card" onClick={() => {setButtonPopup(true); idTypeChange("passport-card")}}>Passport Card (USA) </button>
        <button className="id-type-box" id="btn-extranjero" onClick={() => {setButtonPopup(true); idTypeChange("extranjero")}}>Extranjero (pasaporte)</button>
        <ExpiredIDPopup trigger={expiredPopup} setTrigger={setExpiredPopup}>
          La identificación ingresada está expirada. Favor de ingresar una identificación valida. 
        </ExpiredIDPopup> 
        
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>

        <Popup trigger={notAPic} setTrigger={setNotAPic}>
            <div className="not-a-pic">
              Formato de archivo invalido, intentalo de nuevo
            </div>
            <div className='empty-div-continue'>
              <button className='btn-continue'>Continuar</button>  
            </div>
        </Popup>
    
          <div className='title'>
            <p>{idType}</p>
          </div>

          <div className='dnd-upload-bound' {...getRootProps()}>
            <input {...getInputProps()} /> 
            {showText ? 
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
                : <div>{buttonPopup === true &&  images}</div>}

          </div>

            <div className='empty-div-continue'>
              <button className='btn-continue'>Continuar</button>  
            </div>
          
        </Popup>
      </div>
    </div>
  );  
}


export default Home;

import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Popup from './IdPopup';
import {useDropzone} from 'react-dropzone';
import {imgSrcToBlob} from 'blob-util'
import axios from "axios";
import UserRegistrationStatus from './UserRegistrationStatus';
import ExpiredIDPopup from './ExpiredIDPopup';
import sendImage_ from '../functions/sendImage_model';

  // Variables para seleccion de tipo de identificacion

function Home(props) {
  let navigate = useNavigate();
  const location = useLocation(); 
  const [buttonPopup, setButtonPopup] = useState(false);
  const [idType, setIdType] = useState('')
  const [response, setResponse] = useState('')
  const [imgF, setImgF] = useState("https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif")
  const [isRegistered, setIsRegistered] = useState(false);
  const [files, setFiles] = useState([]);
  const [expiredPopup, setExpiredPopup] = useState(false);
  const [notAPic, setNotAPic] = useState(false);
  const [showText, setShowText] = useState(true);
  const reader = new FileReader();
  // need to set timeout
  const [overlayPresent, setOverlayPresent] = useState(false)

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
      'image/jpg' : ['.jpg']
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 1) {
        acceptedFiles.map((file) => {console.log("cosaa",file)})
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

  async function sendImage(){
    let blobUrl = files[0];
    let formData = new FormData()
    formData.append(
      "file", blobUrl, blobUrl.name
    )

    console.log(await sendImage_(formData, setOverlayPresent))
  }

  useEffect(() => {
    //console.log(location.state.isLogged)
    if (location.state===null ||  
      location.state.isLogged === false){
      return navigate('/')
    }
    if (buttonPopup===false){
      setFiles([])
      setShowText(true)
      setIdType('')
    }
    if (overlayPresent===true){
      setButtonPopup(false);
    }
  }, [buttonPopup, location, navigate, overlayPresent]);

  return (
    <div className='home-background'>
      <div className='home-innerContent'>
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
        </div>

        

      </div>
      <Popup trigger={overlayPresent} setTrigger={setOverlayPresent} botonOn={false}>
              <div className="div-overlay">
                <p className="overlay-text">Procesando archivo, por favor espera</p>
                <img src={imgF} alt="funny GIF" className='overlay'/>
              </div>
          </Popup>

          <Popup trigger={buttonPopup} setTrigger={setButtonPopup} botonOn={true}>

            <Popup trigger={notAPic} setTrigger={setNotAPic} botonOn={true}>
                <div className="not-a-pic">
                  Formato de archivo invalido, intentalo de nuevo
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
                <button className='btn-continue' onClick={async function cosa(){
                  sendImage()
                } } >Continuar</button>  
              </div>
            
          </Popup>
    </div>
  );  
}


export default Home;

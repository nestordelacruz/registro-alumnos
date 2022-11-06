import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Popup from './IdPopup';
import {useDropzone} from 'react-dropzone';
import {imgSrcToBlob} from 'blob-util'
import axios from "axios";
import UserRegistrationStatus from './UserRegistrationStatus';
import ExpiredIDPopup from './ExpiredIDPopup';
import sendImage_ from '../functions/sendImage_model';
import database_control from '../functions/database_controller'

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
  const [dataPreview, setDataPreview] = useState(false);
  const [userData, setUserData]= useState([]);
  const [logout, setLogOut] = useState(false);
  const [tempLocation, setTempLocation] = useState(location.state)
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

  const sistema = {
    'Matricula': 'id',
    'Nombre': 'name',
    'Segundo Nombre(s)': 'middle_names',
    'Apellido Paterno': 'last_name_father',
    'Apellido Materno': 'last_name_mother'
  }

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
    let response = await sendImage_(formData, setOverlayPresent)
    if ('message' in response){
      setDataPreview(true);
    }
    console.log('response',response);
    let vig = response.message.vigencia;
    setExpiredPopup(vig<=2022)
  }

  async function database_comm(){
    let response = await database_control(location.state.matricula);
    setUserData(response[0])
    //console.log('user', userData)
  }
  
  function log_out(){
    //console.log(logout, tempLocation)
    if (logout===true ||tempLocation===null ||  
      tempLocation.isLogged === false) {
        setTempLocation(null)
        return navigate('/')
      }
    
  }

  useEffect(() => {
    console.log(location)
    if (logout===true || tempLocation===null ||  
      tempLocation.isLogged === false){
        setFiles([])
        setShowText(true)
        setIdType('')
        setTempLocation(null)

        //console.log(logout, tempLocation)
      return navigate('/')
    }
    if (expiredPopup===true){
      setButtonPopup(false)
      setOverlayPresent(false)
      setDataPreview(false)
    }
    if (buttonPopup===false){
      setFiles([])
      setShowText(true)
      setIdType('')
      //setDataPreview(false)
    }
    if (overlayPresent===true){
      setButtonPopup(false);
    }
    database_comm()
  }, [buttonPopup, location, navigate, overlayPresent, logout, tempLocation, expiredPopup]);

  return (
    <div className='home-background' onLoad={log_out()}>
      <div className='home-innerContent'>
      <div className="greet_n_out">
          <h1>Hola, {userData['name']}</h1>
          <button className="logout" onClick={() => {setLogOut(true)}}>Salir</button>
        </div>

        <UserRegistrationStatus userStatus={isRegistered}></UserRegistrationStatus>
        <h2>Selecciona tu tipo de identificacion: </h2>  

        <div className='home-page'>
          <button className="id-type-box" id="btn-ine" onClick={() => {setButtonPopup(true); idTypeChange("INE")}}>INE</button>
          <button className="id-type-box" id="btn-pasaporte-mexicano" onClick={() => {setButtonPopup(true); idTypeChange("Pasaporte Mexicano")}}>Pasaporte Mexicano</button>
        </div>

      </div>
      <ExpiredIDPopup trigger={expiredPopup} setTrigger={setExpiredPopup}>
            La identificación ingresada está expirada. Favor de ingresar una identificación valida. 
          </ExpiredIDPopup> 
      <Popup trigger={overlayPresent} setTrigger={setOverlayPresent} botonOn={false}>
          <div className="div-overlay">
            <p className="overlay-text">Procesando archivo, por favor espera</p>
            <img src={imgF} alt="funny GIF" className='overlay'/>
          </div>
      </Popup>

      <Popup trigger={dataPreview} setTrigger={setDataPreview} botonOn={true}>
          <div className="div-preview">
            <div className="escolar">
              <div>
                <p>Matricula</p><p>{ userData['id'] }</p>
              </div>
              <div>
                <p>Nombre</p><p>{ userData['name'] }</p>
              </div>
              <div>
                <p>Segundo(s) nombre(s)</p><p>{ userData['middle_names'] }</p>
              </div>
              <div>
                <p>Apellido Paterno</p><p>{ userData['last_name_father'] }</p>
              </div>
              <div>
                <p>Apellido Materno</p><p>{ userData['last_name_mother'] }</p>
              </div>
            </div>
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
              <p>Suelta los archivos aqui ...</p> :
              <p>Selecciona tu archivo de imagen aqui, es posible arrastrar y soltar.</p>
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

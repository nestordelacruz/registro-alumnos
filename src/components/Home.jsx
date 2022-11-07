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
import get_similarities_ from '../functions/get_similarities'

  // Variables para seleccion de tipo de identificacion

function Home(props) {
  let navigate = useNavigate();
  const location = useLocation(); 
  const [buttonPopup, setButtonPopup] = useState(false);
  const [idType, setIdType] = useState('')
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
  const [title_preview, setTitle_prview] = useState(null);
  const [success_preview, setSuccessPreview] = useState(false);
  const [responseData, setResponseData] = useState([])
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

  function check_response_data(response_){
    let user_data = (({ last_name_father, last_name_mother,  middle_names, name }) => ({ last_name_father, last_name_mother, middle_names, name }))(userData);;    
    //console.log(user_data)
    let res = {
      'name': false,
      'middle_names': false,
      'last_name_father' : false,
      'last_name_mother' : false
    }
    
    let temp_r = response_['message']['data'];//["INSTITUTO NACIONAL ELECTORAL","MÉXICO","CREDENCIAL PARA VOTAR","FECHA De NaCIMIENTO","NOMBRE","07/07/1996","Cuz","Equivl","SEXO","Elin Jabier","DOMICILIO","C SOCIALISMO 95","COL DIEGO LUCERO 31123","CHIHUAHUA; CHIH.","CLAVE DE ELECTOR","CLMRKR96O7O7O8MOOO","CAMK96O7O7MCHLRROS","AÑO DE rEGISTRO   2014 00","CURP","ESTADO","08","MUNICIPIO  019","SECCIÓN","0702","LOCALIDAD","0001","EMISIÓN","2014","VIGENCIA","2024",";"]
    //response_['message']['data']
    for (let i = 0; i < temp_r.length; i++) {
      for (const item in user_data) {
        //console.log(user_data[item].toLowerCase(), cosa['data'][i].toLowerCase())
        if (temp_r[i].toLowerCase().includes(user_data[item].toLowerCase())){
          res[item] = true;
        }
      }
    }
    const areTrue = Object.values(res).every(
      value => value === true
    );
    console.log(areTrue)
    return areTrue;
  }

  async function similarities(response_model){
    let res = response_model['message']['data'];//["INSTITUTO NACIONAL ELECTORAL","MÉXICO","CREDENCIAL PARA VOTAR","FECHA De NaCIMIENTO","NOMBRE","07/07/1996","Cuz","Esquivl","SEXO","Elin Jabier","DOMICILIO","C SOCIALISMO 95","COL DIEGO LUCERO 31123","CHIHUAHUA; CHIH.","CLAVE DE ELECTOR","CLMRKR96O7O7O8MOOO","CAMK96O7O7MCHLRROS","AÑO DE rEGISTRO   2014 00","CURP","ESTADO","08","MUNICIPIO  019","SECCIÓN","0702","LOCALIDAD","0001","EMISIÓN","2014","VIGENCIA","2024",";"]
    //response_model['message']['data'];
    let data = {"model_response":res, "user_data":userData, 'idType': idType}
    console.log('INSIDE SIMILARITIES', data)
    let response_ = await get_similarities_(data)
    let failed_detections = response_['failed_detections'];
    let wrong_detected_data = {
      'name': failed_detections[0],
      'middle_names': failed_detections[1],
      'last_name_father' : failed_detections[2],
      'last_name_mother' : failed_detections[3]
    }
    console.log('WRONG1', wrong_detected_data)
    setResponseData(wrong_detected_data)
    console.log('WRONG1', responseData)
  }

  async function sendImage(){
    let blobUrl = files[0];
    let formData = new FormData()
    formData.append(
      "file", blobUrl, blobUrl.name
    )
    let response = await sendImage_(formData, setOverlayPresent, idType)
    if ('message' in response){
      let vig = response.message.vigencia_ine;
      if( idType === 'Pasaporte Mexicano'){
        vig = response.message.vigencia_pass;
      }
      if (vig <= 2022){
        setExpiredPopup(true)
        return;
      }
      
      let res = check_response_data(response)
      if (res === true){
        setSuccessPreview(true)
        setTitle_prview('La identificación ha sido aceptada exitosamente')
        setIsRegistered(true)
        console.log(isRegistered)
      }
      else{
        setSuccessPreview(false)
        similarities(response)
        setTitle_prview('Los datos obtenidos no coinciden con los previamente registrados en Escolar. \nFavor de utilizar otra identificación u otra foto')
      }
      setDataPreview(true);
    }
    console.log('response',response);

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
    //console.log(location)
    if (logout===true || tempLocation===null ||  
      tempLocation.isLogged === false){
        setFiles([])
        setShowText(true)
        setIdType('')
        setTempLocation(null)
        setIsRegistered(false)

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
          <button className="id-type-box" id="btn-ine" disabled={isRegistered} onClick={() => {setButtonPopup(true); idTypeChange("INE")}}>INE</button>
          <button className="id-type-box" id="btn-pasaporte-mexicano" disabled={isRegistered} onClick={() => {setButtonPopup(true); idTypeChange("Pasaporte Mexicano")}}>Pasaporte Mexicano</button>
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
            <h3>{ title_preview }</h3>
            
            <div>
              <p>Matricula</p><p>{ userData['id'] }</p>
            </div>
              <div className="escolar-preview">
                <h4>Datos en escolar</h4>
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
            {! success_preview
              ? <div className="modelo-unsuccessful">
                <h4>Datos reconocidos</h4>
                  <div>
                    <p>Nombre</p><p>{ responseData['name'] }</p>
                  </div>
                  <div>
                    <p>Segundo(s) nombre(s)</p><p>{ responseData['middle_names'] }</p>
                  </div>
                  <div>
                    <p>Apellido Paterno</p><p>{ responseData['last_name_father'] }</p>
                  </div>
                  <div>
                    <p>Apellido Materno</p><p>{ responseData['last_name_mother'] }</p>
                  </div>
                </div>
              : null
            }
            <button className="btn-aceptar" onClick={() => setDataPreview(false)}>Aceptar</button>
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

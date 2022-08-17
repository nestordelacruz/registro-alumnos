import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Popup from './IdPopup';


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

  return (
    <div>
      <h1>This is the home page</h1>
      <div className='home-page'>

        <button className="id-type-box" onClick={() => setButtonPopup(true)}> temporal</button>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>Popup</h3>
          <p>In here add dragable space to upload files</p>
          <p>In here add button : "Subir archivo"</p>
        </Popup>
      </div>
    </div>
  );
  
  
}

export default Home;

import React, {useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function Home(props) {

  let navigate = useNavigate();
  
  const location = useLocation();

  console.log(location)

  useEffect(() => {
    if (location.state===null ||  
      location.state.isLogged === false){
      return navigate('/')
    }
  });

  return (
    <div>
      <h1>This is the home page</h1>

    </div>
  );
  
  
}

export default Home;

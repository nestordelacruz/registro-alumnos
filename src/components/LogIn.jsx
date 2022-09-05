import React, {useState} from 'react';
import Logo from './Logo';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogIn(props) {
    let navigate = useNavigate();
    const [pass, setPass] = useState('')
    const [user, setUser] = useState('')
    const [isLogged, setIsLogged] = useState(false)

    async function canProcede(){
        const params = {
            'Username': user,
            'Password': pass
          }
          let path = '/home';
          axios.post('https://ws.cetys.mx/Accounts/autenticarLDAP/v1/Alumnos', params)
            .then(response => {
              if (response.data===true){
                console.log('response', response.data)
                navigate(path, {state: {
                    isLogged : true
                  }})
              }
              /// handle error popup
            }
          )
    }

    function handleUser(event){
        setUser(event.target.value)
    }

    function handlePass(event){
        setPass(event.target.value)
    }

    /*
    function handleKeyDown(textAreaRef){
        textAreaRef.style.height = "0px";
        const scrollHeight = textAreaRef.scrollHeight;
        textAreaRef.style.height = scrollHeight + "px";
    }
    */

    return (
        <div className='App'>
            <div className='login-page'>
                <Logo/>
                
                <div className="login-form">
                    <div className='log-user'>
                        <p>Usuario</p>
                        <input type="text" value={user} onChange={handleUser}/>
                    </div>
                    <div className='log-user'>
                        <p>Contraseña</p>
                        <input type="text" value={pass} onChange={handlePass}  />
                    </div>
                    <div className='log-user'>
                        <button onClick={canProcede} className='btn-login' > Log In</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default LogIn


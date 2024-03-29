import React, {useState} from 'react';
import Logo from './Logo';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import LogInErrorPopup from './LogInErrorPopup';
import Home from './Home';


function LogIn(props) {
    let navigate = useNavigate();
    const [user, setUser] = useState('')
    const [can, setCan] = useState(false)
    const [logInPopup, setLogInPopup] = useState(false);
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
      });

    async function canProcede(){
        const params = {
            'Username': user.toLowerCase(),
            'Password': values.password

          }
          let path = '/home';
          axios.post('https://ws.cetys.mx/Accounts/autenticarLDAP/v1/Alumnos', params)
            .then(response => {
              console.log(response)
              if (response.data===true){
                console.log('response', response.data)
                navigate(path, {state: {
                    isLogged : true,
                    matricula: user
                  }})
              }
              else {
                setLogInPopup(true);
              }
              
            }
          ).catch((e) => {
            setLogInPopup(true);
            })
    }

    function handleUser(event){
        setUser(event.target.value.toLowerCase())
    }

    /*
    function handleKeyDown(textAreaRef){
        textAreaRef.style.height = "0px";
        const scrollHeight = textAreaRef.scrollHeight;
        textAreaRef.style.height = scrollHeight + "px";
    }
    */
    
        
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
      
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      
      const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    return (
         ! can ? <div className='App'>
            <div className='login-page'>
                <Logo/>
                
                <div className="login-form">
                    <div className='log-user'>
                        <p>Matrícula</p>
                        <Input className='input-password'
                            type={ "text"}
                            onChange={handleUser}
                            value={user}
                        />
                    </div>
                    <div className='log-user'>
                        <p>Contraseña</p>
                        <Input className='input-password'
                            type={values.showPassword ? "text" : "password"}
                            onChange={handlePasswordChange("password")}
                            value={values.password}
                            endAdornment={
                            <InputAdornment position="end" className='password-adonrment'>
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </div>
                    <div className='log-user'>
                        <button onClick={canProcede} className='btn-login' > Iniciar sesión</button>
                    </div>
                    <LogInErrorPopup trigger={logInPopup} setTrigger={setLogInPopup}>
                      Matricula y/o contraseña invalida.
                      <div className='empty-div-continue'>
                      <button className='btn-continue' onClick={() => setLogInPopup(false) } >Aceptar</button>  
                    </div>
                  </LogInErrorPopup> 
                </div>
            </div>
            
        </div>:<Home/>
    )
}

export default LogIn


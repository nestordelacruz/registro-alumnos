import React, {useState} from 'react';
import Logo from './Logo';
import { useNavigate } from "react-router-dom";

function LogIn(props) {
    let navigate = useNavigate();
    const [pass, setPass] = useState('')
    const [user, setUser] = useState('')
    const [isLogged, setIsLogged] = useState(false)

    async function canProcede(){
        let path = '/home';
        await handleIsLogged()
        navigate(path, {state: {
            isLogged : true
        }})
    }

    function handleIsLogged(){
        setIsLogged(true)
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
                        <p>{isLogged}</p>
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HandleSubmit(e) {
    console.log([...e])
    const params = {
      'Username': e[0],
      'Password': e[1]
    }
    let navigate = useNavigate();
    let path = '/home';
    axios.post('https://ws.cetys.mx/Accounts/autenticarLDAP/v1/Alumnos', params)
      .then(response => {
        console.log('response', response.data)
        navigate(path, {state: {
          isLogged : true
        }})
      }
    )
  }

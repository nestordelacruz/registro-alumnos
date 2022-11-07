export default async function database_control(data){
    try {
        const response = await fetch('http://127.0.0.1:8080/api/alumnos/'+data, {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = await response.json();
        return result;
      } catch (err) {
        //console.log(err);
        return err
      }
  }
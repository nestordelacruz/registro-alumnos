export default async function create_record(data){
    data = JSON.stringify(data)
    console.log("JSON sent", data)

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
      };
      let res = await fetch('http://localhost:8080/api/alumnos/', options)
        .then(response => response.json())
        .then(response => {return response})
        .catch(err => console.error(err));
    return res;
} 


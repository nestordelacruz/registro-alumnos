# Proyecto CENEVAL -  Registro de Alumnos

## Integrantes
- Cruz Esquivel Elian Javier
- De La Cruz Escalante Nestor
- Navarro Payan Enrique 
- Velez del Callejo Marco Alejandro

# Pasos previos

El código esta compuesto por una integración entre Python y React, junto a la DB de PostgreSQL. 
Para instalar los modulos de Python hacer lo siguiente:
- En la raíz del repo, ejecutar lo siguiente
```console
pip install -r requirements.txt
```

Para instalar los modulos de NodeJs y React, ejecutar lo siguiente:
```console
npm install
```

La versión de PostgreSQL utilizadas es **15**
Para cambiar usuarios y contraseñas, modificar el archivo _.\registro-alumnos\src\database\db.config.js_

- La instancia de la base de datos puede ser recuperada al agregar el script de SQL a PostgreSQL y ejecutarlo, localizado en: _.\registro-alumnos\src\database\db_backup.sql_
  - O bien, puede ser recuperada desde la terminal con lo siguiente:
  ```console
    psql -U postgres -f registro-alumnos\src\database\db_backup.sql
  ```

### Puertos requeridos
- PostgreSQL debe estar configurado en el puerto **5433**
- La API de comunicación con PostgreSQL estará en **8080**
- El localhost de React estará en **3000**

# Ejecución
## API modelo-React
Ejecutar lo siguiente:
```console
cd src\API
uvicorn model_api:app --reload
```

## API React-PostgreSQL
```console
cd src\database
node postgres_comm.js
```

## Iniciar React
```console
npm start
```

# Información general del proyecto
- Módulo queue: Para procesar los archivos excel sin bloquear la memoria, se implementó una abstracción de un módulo de queue. Se dejó todo listo para el día de mañana reemplazar la implementacion por algo robusto sin tener que refactorear el resto.
- Procesamiento excel: Se usa xlsx (libreria muy famosa con mantenimiento constante), para procesar el excel y pasarlo a json

# Base de datos
Base de datos mongo con 2 collections: 
- jobs: son los trabajos de procesamiento que se van poniendo en cola
- statejobs: estados de los trabajos

# Endpoints
- POST /api/v0/job/
    Crea un job y lo pone en cola.
    - Parámetros
        - file: archivo excel
        - mappingFormat: formato de mappeo. Ejemplo: { "A": {"name": "name", "type":"string"}, "B": {"name": "age", "type":"number"}, "C": {"name": "teaswtas", "type":"number"} }
    - Respuesta: id y datos del job creado
- GET /api/v0/job/{idJob}?
    Devuelve un job dado su id
    - Parámetros: 
        - path param: id del job
        - query param opcional: 
            - excelJson: booleano para definir si debe retornar el excel en formato json o no. Consideré agregarla porque la respuesta se relentiza al traer un json muy grande, y este endpoint se usaría mas para averiguar el estado del job
    - Respuesta: datos del job, incluido estado, errores de procesamiento y excel en formato json

# Dependencias relevantes
- async: sistema de queue
- xlsx: procesar excel a json
- multer: necesaria para pasar el archivo excel al servicio

# Instalación y uso
1. npm install
2. npm start
3. mongorestore -d koibanxdb --dir others/koibanxdb-dump/
En 'others' hay un excel de ejemplo
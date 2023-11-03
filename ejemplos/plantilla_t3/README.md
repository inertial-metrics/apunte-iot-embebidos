## Plantilla T3

### Integrantes

- Nombre y Apellido
- Nombre y Apellido
- Nombre y Apellido

---

## Desripción de la tarea

_Aqui por favor agregar una descripción de la tarea_

## Introducción

La siguiente plantilla está diseñada para integrar las siguientes tecnologías:

- Aplicación React construida mediante Vite, proporcionando un entorno más rápido y sencillo para el desarrollo web moderno.

- Aplicación FastAPI, un marco moderno y rápido para construir APIs con Python basado en tipos estándar.

- Base de datos Postgres (La misma que en tareas anteriores).


# Consideraciones importantes

- **Docker**: Se recomienda encarecidamente utilizar Docker para el desarrollo de esta tarea. Todo está configurado para ejecutarse con el comando `docker compose up`, simplificando el proceso de puesta en marcha.

- **Ejecución local**: Si opta por ejecutar localmente, asegúrese de instalar los requisitos del backend y contar con node y npm. Posteriormente, ejecute `npm install` en el directorio frontend.

  - Nota: Para ejecutar el backend localmente, no basta con solo ejecutar main.py. En su lugar, desde el directorio del backend, ejecute:
  ```bash
  uvicorn src.main:app --reload --host "0.0.0.0" --port 8000
  ```

- **Estilización CSS**: Existen varias estrategias para agregar CSS a los componentes:

  - **TailwindCSS (Recomendado)**: Esta herramienta ya está integrada en la plantilla. Su aprendizaje y aplicación pueden ser beneficiosos dada su simplicidad y reconocimiento en la industria.

  - **Módulos CSS**: Importe un archivo CSS en el componente y úselo como un objeto JS. Generalmente, se crea un archivo CSS para cada componente, denominado `componente.module.css`.

  - **CSS global**: Modificar el archivo `index.css` para agregar estilos globales, aunque no es la opción más recomendada.

- **Configuración de la API**: Modifique la URL de la API en `frontend/src/utils/api.js` para apuntar a FastAPI. Por defecto, se encuentra en `http://localhost:8000`, pero en Raspberry Pi, es necesario actualizarlo con el hostname o IP correspondiente.

- **Conexión a la Base de Datos**: Asegúrese de actualizar la conexión a la base de datos en `backend/src/main.py` según sea necesario.

## Comandos esenciales de Docker

Para interactuar con Docker, aquí hay algunos comandos útiles:

- **Acceder a un contenedor**:
  ```bash
  docker compose run <nombre del servicio> /bin/sh
  ```
  Ejemplo para el backend:
  ```bash
  docker compose run backend /bin/sh
  ```

  Con esto podran acceder a la terminal del contenedor y ejecutar comandos como si estuvieran en una máquina virtual, y asi
  instalar dependencias, ejecutar comandos de python, etc.

  Por ejemplo dentro de la terminal del frontend

  ```bash
  npm install <nombre de la dependencia>
  ```

- **Otros comandos útiles**:
  - `docker compose down`: Detiene y elimina todos los contenedores.
  - `docker compose up`: Inicia y ejecuta la aplicación con servicios asociados.
  - `docker compose up -d`: Ejecuta los servicios en segundo plano.

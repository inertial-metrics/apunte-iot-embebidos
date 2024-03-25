---
title: "Auxiliar 3 - Interfaz (React + FastAPI)"
description: ""
date: 2023-10-16T12:35:18Z
lastmod: 2023-10-16T12:35:18Z
draft: false
images: []
weight: 220
---

_Universidad de Chile_
_Facultad de Ciencias Físicas y Matemáticas Departamento de Ciencias de la computacion_
_CC5326 – Diseño de Internet de las Cosas_

---

**Profesor:** Luciano Radrigan F.
**Auxiliar:** Alberto Abarzua P.

## Objetivos a cumplir

- [ ] Creacion del proyecto (React + FastAPI)
- [ ] Como agregar un endpoint
- [ ] Como crear un componente
- [ ] Como usar un componente con un endpoint

## Creacion del proyecto (React + FastAPI)

Esta parte es unicamente para que sepan que se hizo para generar la siguiente plantilla (La misma de la tarea 3)

- [Plantilla](https://github.com/inertial-metrics/apunte-iot-embebidos/tree/main/ejemplos/plantilla_t3.zip)

En esta plantilla tenemos:

- Un proyecto de React usando Vite
- Un proyecto de FastAPI

Para generar esta plantilla se siguieron los siguientes pasos:

### Depenedencias

Para esto hay dos rutas, usando solo docker (lo que se hizo aqui) o usando las instalaciones locales de node y python.

A modo de resumen, las dependencias son:

- Node
- Python
- Docker Desktop

### Creacion del proyecto de React

Para esto se siguieron los siguientes pasos:

#### Crear el proyecto de React

```bash
npm create vite@latest nombre_del_proyecto --template react
```

Esto nos genera un proyecto de React usando Vite como bundler.

- [Mas info de Vite](https://vitejs.dev/guide/)

Luego a este proyecto de react se le agrego tailwindcss, para esto se siguieron los siguientes pasos:

- [Instalacion de tailwindcss](https://tailwindcss.com/docs/installation)

#### Para la creacion del proyecto de FastAPI se siguieron los siguientes pasos:

```bash
pip install fastapi
pip install uvicorn
```

Luego lo basico para tener un proyecto funcional de fastapi es:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/ejemplo/")
async def get_items():
    return {"message": "Hello World"}

```

## Como agregar un endpoint

Para agregar un endpoint a FastAPI se debe de agregar una funcion con el decorador `@app.get` o `@app.post` dependiendo del metodo que se quiera usar.

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/ejemplo/")
async def get_items():
    return {"message": "Hello World"}

```

Aqui se agrega un endpoint en la ruta `/ejemplo/` que retorna un json con el mensaje `Hello World`.

Los endpoints tipo `get` se usan para obtener informacion, mientras que los endpoints tipo `post` se usan para enviar informacion.

Para la creacion de un endpoint tipo `post` se debe de usar el decorador `@app.post` y se debe de definir un modelo unsando `BaseModel` de pydantic.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = None


@app.post("/items/")
async def create_item(item: Item):
    name = item.name
    price = item.price
    if item.is_offer:
        price = price - 1
    return item
```

En este caso se agrega un endpoint en la ruta `/items/` que recibe un json con los campos `name`, `price` y `is_offer` y retorna el mismo json.

## Como crear un componente

Para crear un componente en React se debe de crear un archivo con la extension `.jsx` o `.tsx` en la carpeta `src/components/`.

Por ejemplo, para crear un componente llamado `Ejemplo` se debe de crear el archivo `src/components/Ejemplo.jsx` con el siguiente contenido:

```javascript
const Ejemplo = () => {
  return (
    <div>
      <h1>Ejemplo</h1>
    </div>
  );
};

export default Ejemplo;
```

Como pueden ver un componente es una funcion que retorna un elemento JSX. (JSX es una extension de javascript que permite escribir codigo html dentro de javascript)

Para usar este componente en otro componente se debe de importar y usar como si fuera una etiqueta html.

```javascript
import Ejemplo from "../components/Ejemplo";

const App = () => {
  return (
    <div>
      <Ejemplo />
    </div>
  );
};
```

## Como usar un componente con un endpoint

Para por ejemplo crear un componente el cual en su renderizado haga una peticion a un endpoint se debe de usar el hook `useEffect` de React.

Para realizar peticiones a un endpoint usaremos la libreria `axios`.

```bash
# Asi se instala axios, en la plantilla ya esta instalado
npm install axios
```

Para usar axios se debe de importar y usar de la siguiente manera:

```javascript
import axios from "axios";
import { useEffect } from "react";

const Ejemplo = () => {
  useEffect(() => {
    const get = async () => {
      const response = await axios.get("http://localhost:8000/ejemplo/");
      console.log(response.data);
    };
    });
  }, []);

  return (
    <div>
      <h1>Ejemplo</h1>
    </div>
  );
};
```

En otros casos tal vez queremos que se llame algun endpoint cuando se haga click en algun boton, para esto se puede usar el hook `useState` de React.

```javascript

import axios from "axios";
import { useEffect, useState } from "react";

const Ejemplo = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const get = async () => {
      const response = await axios.get("http://localhost:8000/ejemplo/");
      setData(response.data);
    };
    });
  }, []);

  return (
    <div>
      <h1>Ejemplo</h1>
      <button onClick={get}>Get</button>
      <p>{data}</p>
    </div>
  );
};
```

## Actividad

1. Crear un enpoint que reciba el metodo post y get, este se debe tener la ruta '/config/' y debe de recibir un json con los campos 'ssid' y 'password' y debe de retornar el mismo json.

2. Crear un componente que tenga un input para el ssid y otro para el password, ademas de un boton que al hacer click haga una peticion post al endpoint creado en el punto 1.

3. Crear un componente que tenga un boton que al hacer click haga una peticion get al endpoint creado en el punto 1 y muestre el resultado en un parrafo.

**Notas** :

Para el input pueden usar la libreria `react-hook-form` para facilitar el manejo de formularios.

- [react-hook-form](https://react-hook-form.com/)

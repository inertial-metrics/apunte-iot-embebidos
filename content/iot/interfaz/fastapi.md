---
title: "FastAPI"
description: ""
date: 2023-11-03T00:35:05Z
lastmod: 2023-11-03T00:35:05Z
draft: false
images: []
weight: 30
---

### ¿Qué es FastAPI?

FastAPI es un framework web moderno y de alto rendimiento para construir APIs con Python 3.7+ que se basa en la tipificación estándar de Python. Está diseñado para crear APIs de forma rápida y sencilla, optimizando al máximo la eficiencia y la velocidad.

### Características Principales:

- **Tipificación Estándar**: FastAPI utiliza las anotaciones de tipo estándar de Python, lo que facilita la lectura y el desarrollo.
- **Documentación Automática**: Basado en los estándares OpenAPI y JSON Schema, FastAPI genera automáticamente una interfaz de usuario interactiva para la API.
- **Validación Automática**: Los datos entrantes se validan automáticamente basándose en las anotaciones de tipo.

### ¿Por qué se usa?

FastAPI ha ganado popularidad debido a varias razones:

1. **Alta Performance**: Es uno de los frameworks más rápidos disponibles, solo superado por NodeJS y Go en ciertos benchmarks.
2. **Desarrollo Rápido**: Reduce el tiempo y la complejidad al desarrollar, gracias a las funcionalidades integradas como la validación automática y la documentación.
3. **Seguridad Integrada**: Proporciona herramientas para la autenticación, la autorización y la protección contra ataques comunes.

### ¿Por qué es tan simple?

La simplicidad de FastAPI radica en la combinación de Python moderno y las anotaciones de tipo. Estas anotaciones permiten a FastAPI manejar muchas tareas automáticamente, como la serialización, la validación de datos y la generación de documentación.

### Ejemplo de endpoint simple:

El siguiente código demuestra cómo crear un endpoint simple que responde a una solicitud GET:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

### Ejemplo de endpoint con parámetros:

Los endpoints pueden recibir parámetros a través de la URL o como parámetros de consulta:

```python
@app.get("/items/{item_id}")
def read_item(item_id: int, query_param: str = None):
    return {"item_id": item_id, "query_param": query_param}
```

### Ejemplo de endpoint usando Pydantic y BaseModel:

Pydantic es una biblioteca de validación y serialización de datos que se integra perfectamente con FastAPI. Permite definir modelos y validar automáticamente los datos entrantes:

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.post("/items/")
def create_item(item: Item):
    return item
```

### Dependencias y Gestión de Bases de Datos:

FastAPI tiene un sistema de dependencias integrado que permite inyectar funciones o clases en los endpoints. Esto es especialmente útil para gestionar conexiones a bases de datos:

```python
from peewee import PostgresqlDatabase
from fastapi import Depends

db = PostgresqlDatabase(
    'iot_db',
    user='postgres',
    password='postgres',
    host='db',
    port='5432'
)

def get_database():
    db.connect()
    try:
        yield db
    finally:
        if not db.is_closed():
            db.close()

@app.get("/ejemplo/")
async def get_items(database: PostgresqlDatabase = Depends(get_database)):
    # Aquí pueden acceder a la base de datos y hacer las consultas que necesiten
    return {"message": "Hello World"}
```

El sistema de dependencias asegura que la conexión a la base de datos esté disponible en cada llamada al endpoint y que se cierre adecuadamente una vez finalizada la operación.

FastAPI continúa siendo una excelente opción para desarrollar APIs modernas, ofreciendo una combinación de rapidez, simplicidad y robustez. Con una comunidad activa y una documentación extensa, es una herramienta poderosa en el arsenal de cualquier desarrollador Python.

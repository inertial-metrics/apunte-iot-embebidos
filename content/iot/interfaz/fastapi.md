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

FastAPI es un moderno framework web para construir APIs con Python 3.7+ basado en estándares como OpenAPI y JSON Schema.

### ¿Por qué se usa?

FastAPI se utiliza por su rapidez, tanto en términos de performance como en el tiempo que lleva desarrollar con él, ya que proporciona herramientas para generar automáticamente la documentación de la API, validación de datos, autenticación y más.

### ¿Por qué es tan simple?

FastAPI es simple debido a su diseño basado en anotaciones de tipo Python, lo que permite la validación automática, el autocompletado en los editores, y la generación automática de la documentación sin necesidad de herramientas o librerías adicionales.

### Ejemplo de endpoint simple:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

### Ejemplo de endpoint con parámetros:

```python
@app.get("/items/{item_id}")
def read_item(item_id: int, query_param: str = None):
    return {"item_id": item_id, "query_param": query_param}
```

### Ejemplo de endpoint usando Pydantic y BaseModel:

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

### Ejemplo de dependencias:

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
    # Aqui pueden acceder a la base de datos y hacer las consultas que necesiten
    return {"message": "Hello World"}


```

En este ejemplo se muestra cómo se puede acceder a una base de datos desde un endpoint. Esto es posible gracias a las dependencias, que permiten inyectar objetos en los endpoints, de forma que en cada llamada exista una conexion a la base de datos.

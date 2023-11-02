from peewee import PostgresqlDatabase
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

# -------------------------
# Conexion a la base de datos
# -------------------------

db = PostgresqlDatabase(
    'iot_db',
    user='postgres',
    password='postgres',
    host='db',  # Si usan docker compose, el host es el nombre del servicio, si no, es localhost
    port='5432'
)


def get_database():
    db.connect()
    try:
        yield db
    finally:
        if not db.is_closed():
            db.close()

# -------------------------
# Creacion de la app
# -------------------------


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# Aqui pueden colocar sus endpoints
# -------------------------


class SetSetting(BaseModel):
    # Esto de ocupa para definir que recive un endpoint
    setting_id: int
    value: float


@app.get("/ejemplo/")
async def get_items(database: PostgresqlDatabase = Depends(get_database)):
    # Aqui pueden acceder a la base de datos y hacer las consultas que necesiten
    return {"message": "Hello World"}


@app.post("/ejemplo/")
async def create_item(setting: SetSetting, database: PostgresqlDatabase = Depends(get_database)):
    # aqui reciben un objeto de tipo Setting
    setting_dict = setting.dict()
    print(setting_dict)
    # Luego pueden usar la base de datos
    tables = database.get_tables()  # esto es solo un ejemplo
    print(tables)
    return {"message": "Hello World"}

import BaseGraph from "../components/graficos/BaseGraph";
import SettingsForm from "../components/settings/SettingsFrom";
import Comment from "../components/utiles/Comment";
import api from "../utils/api";

import { useState } from "react";

const MainView = () => {
  const datos = [
    {
      title: "Dataset 1",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      title: "Dataset 2",
      data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
    },
    {
      title: "Dataset 3",
      data: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  ];
  const [apiData, setApiData] = useState();

  const onClickGet = async () => {
    const res = await api.get("/ejemplo/");
    setApiData(res.data);
  };

  const postToApi = async () => {
    const res = await api.post("/ejemplo/", {
      data: "data",
    });
    // ESTO ES UN EJEMPLO DE COMO HACER UN POST (no funciona por que los campos no son los correctos aqui)
  };

  return (
    <>
      <h1 className="text-4xl m-4">Plantilla T3</h1>

      <div className="flex w-full h-full p-5">
        <div className="w-1/3 border rounded-md ">
          <h3 className="text-2xl p-2">Settings</h3>
          <SettingsForm></SettingsForm>

          <Comment
            comment={`Aqui deben de poner todos los settings para interactuar con la base de datos deben de ser todos`}
          ></Comment>
        </div>

        <div className="w-2/3 border rounded-md ">
          <h3 className="text-2xl p-2">Datos</h3>

          <BaseGraph datasets={datos} title="Grafico"></BaseGraph>

          <Comment
            comment={`Aquí se espera que puedan seleccionar qué datos se quieren graficar
              , y de qué dispositivo (Cuál de las dos ESP)`}
          ></Comment>

          <h3 className="text-2xl p-2">API</h3>
          <Comment comment={`Les puede ser util ir a localhost:8000/docs!`} />

          <button
            onClick={onClickGet}
            className="px-4 py-2 rounded hover:bg-blue-500 bg-blue-300 m-4 "
          >
            GET
          </button>

          <button
            onClick={() => setApiData()}
            className="px-4 py-2 rounded hover:bg-red-500 bg-red-300 m-4 "
          >
            CLEAR
          </button>
          <p>Resultados del GET:</p>
          <br />
          <p>{JSON.stringify(apiData)}</p>
          <br />
          <Comment
            comment={`Aqui jueguen modificando el enpoint en backend/src/main.py`}
          />
        </div>
      </div>
    </>
  );
};

export default MainView;

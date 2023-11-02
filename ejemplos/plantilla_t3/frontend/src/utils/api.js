import axios from "axios";

let backendUrl = "http://localhost:8000"; // Esto lo deben de modificar (idealmente una variable de entorno)

if (backendUrl && backendUrl.startsWith('"') && backendUrl.endsWith('"')) {
  backendUrl = backendUrl.slice(1, -1);
}

const api = axios.create({
  baseURL: backendUrl,
});

export default api;

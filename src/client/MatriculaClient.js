import axios from "axios";

// URL CORRECTA basada en lo que funciona en Postman
const BASE_URL = "http://localhost:8080/matricula/api/v1.0/estudiantes";
// Listar todos los estudiantes
const consultarTodos = async () => {
  console.log("Consultando todos los estudiantes desde:", `${BASE_URL}/todos`);
  try {
    const response = await axios.get(`${BASE_URL}/todos`);
    console.log("Respuesta GET todos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en consultarTodos:", error.response || error);
    throw error;
  }/////
};

// Consultar por ID
const consultarPorId = async (id) => {
  console.log(`Consultando estudiante ID ${id} desde: ${BASE_URL}/${id}`);
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Guardar nuevo estudiante
const guardar = async (body) => {
  console.log("Guardando estudiante en:", `${BASE_URL}/crear`);
  console.log("Datos a enviar:", JSON.stringify(body, null, 2));

  try {
    const response = await axios.post(`${BASE_URL}/crear`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Respuesta POST:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en guardar:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });
    throw error;
  }
};

// Alternativa para guardar que devuelve 201
const guardarConResponse = async (body) => {
  console.log("Guardando con response en:", `${BASE_URL}/crear`);
  const response = await axios.post(`${BASE_URL}/crear`, body);
  return response.data;
};

// Actualizar estudiante completo
const actualizar = async (id, body) => {
  console.log(
    `Actualizando estudiante ID ${id} en: ${BASE_URL}/actualizar/${id}`,
  );
  const response = await axios.put(`${BASE_URL}/actualizar/${id}`, body);
  return response.data;
};

// Actualización parcial
const actualizaParcial = async (id, body) => {
  console.log(
    `Actualizando parcialmente ID ${id} en: ${BASE_URL}/actualizarParcial/${id}`,
  );
  const response = await axios.patch(
    `${BASE_URL}/actualizarParcial/${id}`,
    body,
  );
  return response.data;
};

// Borrar estudiante
const borrar = async (id) => {
  console.log(`Borrando estudiante ID ${id} desde: ${BASE_URL}/borrar/${id}`);
  const response = await axios.delete(`${BASE_URL}/borrar/${id}`);
  return response.data;
};

// Consultar hijos de un estudiante
const consultarHijos = async (id) => {
  console.log(
    `Consultando hijos del estudiante ID ${id} desde: ${BASE_URL}/${id}/hijos`,
  );
  const response = await axios.get(`${BASE_URL}/${id}/hijos`);
  return response.data;
};

// Actualizar con response (similar a guardarConResponse)
const actualizarConResponse = async (id, body) => {
  console.log(
    `Actualizando con response estudiante ID ${id} en: ${BASE_URL}/actualizar/${id}`,
  );
  const response = await axios.put(`${BASE_URL}/actualizar/${id}`, body);
  return response.data;
};

/* ===== FACHADAS ===== */
export const consultarTodosFachada = async () => {
  return await consultarTodos();
};

export const consultarPorIdFachada = async (id) => {
  return await consultarPorId(id);
};

export const guardarFachada = async (body) => {
  return await guardar(body);
};

export const guardarConResponseFachada = async (body) => {
  return await guardarConResponse(body);
};

export const actualizarFachada = async (id, body) => {
  return await actualizar(id, body);
};

export const actualizaParcialFachada = async (id, body) => {
  return await actualizaParcial(id, body);
};

export const borrarFachada = async (id) => {
  return await borrar(id);
};

export const consultarHijosFachada = async (id) => {
  return await consultarHijos(id);
};

export const actualizarConResponseFachada = async (id, body) => {
  return await actualizarConResponse(id, body);
};

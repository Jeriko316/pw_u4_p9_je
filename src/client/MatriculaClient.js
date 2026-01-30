import axios from "axios";

// URL CORRECTA basada en lo que funciona en Postman
const BASE_URL = "/api/v1/matricula/estudiantes";

// Listar todos los estudiantes
const consultarTodos = async () => {
    console.log("Consultando todos los estudiantes desde:", BASE_URL);
    try {
        const response = await axios.get(`${BASE_URL}`);
        console.log("Respuesta GET todos:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error en consultarTodos:", error.response || error);
        throw error;
    }
}

// Consultar por ID
const consultarPorId = async (id) => {
    console.log(`Consultando estudiante ID ${id} desde: ${BASE_URL}/${id}`);
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
}

// Guardar nuevo estudiante
const guardar = async (body) => {
    console.log("Guardando estudiante en:", BASE_URL);
    console.log("Datos a enviar:", JSON.stringify(body, null, 2));
    
    try {
        const response = await axios.post(`${BASE_URL}`, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Respuesta POST:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error en guardar:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        });
        throw error;
    }
}

// Alternativa para guardar que devuelve 201
const guardarConResponse = async (body) => {
    console.log("Guardando con response en:", `${BASE_URL}/crear`);
    const response = await axios.post(`${BASE_URL}/crear`, body);
    return response.data;
}

// Actualizar estudiante completo
const actualizar = async (id, body) => {
    console.log(`Actualizando estudiante ID ${id} en: ${BASE_URL}/${id}`);
    const response = await axios.put(`${BASE_URL}/${id}`, body);
    return response.data;
}

// Actualización parcial
const actualizaParcial = async (id, body) => {
    console.log(`Actualizando parcialmente ID ${id} en: ${BASE_URL}/${id}`);
    const response = await axios.patch(`${BASE_URL}/${id}`, body);
    return response.data;
}

// Borrar estudiante
const borrar = async (id) => {
    console.log(`Borrando estudiante ID ${id} desde: ${BASE_URL}/${id}`);
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
}

/* ===== FACHADAS ===== */
export const consultarTodosFachada = async () => {
    return await consultarTodos();
}

export const consultarPorIdFachada = async (id) => {
    return await consultarPorId(id);
}

export const guardarFachada = async (body) => {
    return await guardar(body);
}

export const guardarConResponseFachada = async (body) => {
    return await guardarConResponse(body);
}

export const actualizarFachada = async (id, body) => {
    return await actualizar(id, body);
}

export const actualizaParcialFachada = async (id, body) => {
    return await actualizaParcial(id, body);
}

export const borrarFachada = async (id) => {
    return await borrar(id);
}
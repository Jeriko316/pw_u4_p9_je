import axios from "axios";

// Cambiamos a URL relativa para que funcione con el proxy de Vue
const URL = "/estudiantes";

// Listar todos
const consultarTodos = async () => {
    const response = await axios.get(`${URL}/todos`);
    return response.data;
}

// Consultar por ID
const consultarPorId = async (id) => {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
}

// Guardar nuevo estudiante
const guardar = async (body) => {
    const response = await axios.post(`${URL}/crear`, body);
    return response.data;
}

// Actualizar estudiante completo
const actualizar = async (id, body) => {
    const response = await axios.put(`${URL}/actualizar/${id}`, body);
    return response.data;
}

// Actualización parcial
const actualizaParcial = async (id, body) => {
    const response = await axios.patch(`${URL}/actualizarParcial/${id}`, body);
    return response.data;
}

// Borrar estudiante
const borrar = async (id) => {
    const response = await axios.delete(`${URL}/borrar/${id}`);
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

export const actualizarFachada = async (id, body) => {
    return await actualizar(id, body);
}

export const actualizaParcialFachada = async (id, body) => {
    return await actualizaParcial(id, body);
}

export const borrarFachada = async (id) => {
    return await borrar(id);
}

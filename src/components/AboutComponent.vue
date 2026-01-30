<template>
  <div>
    <h2>Gestión de Estudiantes</h2>

    <!-- Inputs para ID y Nombre -->
    <div style="margin-bottom: 10px;">
      <label>ID: </label>
      <input v-model="id" type="number" placeholder="ID estudiante">
      <label>Nombre: </label>
      <input v-model="nombre" type="text" placeholder="Nombre estudiante">
    </div>

    <div>
      <button @click="mostrarTodos">Mostrar Todos</button>
      <button @click="mostrarPorId">Mostrar por Id</button>
      <button @click="guardarEstudiante">Guardar</button>
      <button @click="actualizarEstudiante">Actualizar</button>
      <button @click="actualizarParcialEstudiante">Actualizar Parcial</button>
      <button @click="borrarEstudiante">Borrar</button>
    </div>

    <pre>{{ resultado }}</pre>
  </div>
</template>

<script>
import { 
  consultarTodosFachada, 
  consultarPorIdFachada, 
  guardarFachada, 
  actualizarFachada, 
  actualizaParcialFachada, 
  borrarFachada 
} from "../client/MatriculaClient";

export default {
  data() {
    return {
      id: "",
      nombre: "",
      resultado: null
    }
  },
  methods: {
    async mostrarTodos() {
      try {
        const data = await consultarTodosFachada();
        this.resultado = data;
        console.log("Todos los estudiantes:", data);
      } catch (error) {
        console.error("Error Axios al consultar todos:", error);
      }
    },

    async mostrarPorId() {
      if (!this.id) {
        console.warn("Debes ingresar un ID");
        return;
      }
      try {
        const data = await consultarPorIdFachada(this.id);
        this.resultado = data;
        console.log(`Estudiante con ID ${this.id}:`, data);
      } catch (error) {
        console.error(`Error Axios al consultar ID ${this.id}:`, error);
      }
    },

    async guardarEstudiante() {
      if (!this.nombre) {
        console.warn("Debes ingresar un nombre");
        return;
      }
      try {
        const body = { nombre: this.nombre };
        const data = await guardarFachada(body);
        this.resultado = data;
        console.log("Estudiante guardado:", data);
      } catch (error) {
        console.error("Error Axios al guardar estudiante:", error);
      }
    },

    async actualizarEstudiante() {
      if (!this.id || !this.nombre) {
        console.warn("Debes ingresar ID y nombre");
        return;
      }
      try {
        const body = { nombre: this.nombre };
        const data = await actualizarFachada(this.id, body);
        this.resultado = data;
        console.log(`Estudiante actualizado ID ${this.id}:`, data);
      } catch (error) {
        console.error(`Error Axios al actualizar ID ${this.id}:`, error);
      }
    },

    async actualizarParcialEstudiante() {
      if (!this.id || !this.nombre) {
        console.warn("Debes ingresar ID y nombre parcial");
        return;
      }
      try {
        const body = { nombre: this.nombre };
        const data = await actualizaParcialFachada(this.id, body);
        this.resultado = data || "Actualización parcial exitosa";
        console.log(`Estudiante parcialmente actualizado ID ${this.id}:`, body);
      } catch (error) {
        console.error(`Error Axios al actualizar parcialmente ID ${this.id}:`, error);
      }
    },

    async borrarEstudiante() {
      if (!this.id) {
        console.warn("Debes ingresar un ID");
        return;
      }
      try {
        const data = await borrarFachada(this.id);
        this.resultado = data || `Estudiante con ID ${this.id} eliminado`;
        console.log(`Estudiante eliminado ID ${this.id}:`, data);
      } catch (error) {
        console.error(`Error Axios al borrar ID ${this.id}:`, error);
      }
    }
  }
}
</script>

<style scoped>
button {
  margin: 5px;
  padding: 5px 10px;
}
pre {
  background: #f0f0f0;
  padding: 10px;
  margin-top: 10px;
  text-align: left;
}
input {
  margin: 0 5px 10px 5px;
  padding: 3px;
}
</style>

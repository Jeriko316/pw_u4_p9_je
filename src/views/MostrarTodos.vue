<template>
  <div>
    <h2>Todos los estudiantes</h2>
    <button @click="mostrarTodos">Cargar todos</button>
    <button @click="limpiar">Limpiar</button>
    
    <div v-if="estudiantes && estudiantes.length > 0">
      <h3>Resultados ({{ estudiantes.length }} estudiantes):</h3>
      <div v-for="estudiante in estudiantes" :key="estudiante.id" class="estudiante-card">
        <h4>{{ estudiante.name }} {{ estudiante.lastName }}</h4>
        <p><strong>ID:</strong> {{ estudiante.id }}</p>
        <p><strong>Email:</strong> {{ estudiante.email }}</p>
        <p><strong>Provincia:</strong> {{ estudiante.province }}</p>
        <p><strong>Género:</strong> {{ estudiante.gender }}</p>
        <p><strong>Fecha Nacimiento:</strong> {{ formatDate(estudiante.birthDay) }}</p>
      </div>
    </div>
    
    <div v-else-if="estudiantes && estudiantes.length === 0">
      <p>No hay estudiantes registrados.</p>
    </div>
    
    <div v-if="hijosVisibles">
      <h3>Hijos del estudiante {{ estudianteSeleccionado }}</h3>
      <div v-for="hijo in hijos" :key="hijo.id" class="hijo-card">
        <p>{{ hijo.name }} {{ hijo.lastName }}</p>
      </div>
      <button @click="ocultarHijos">Ocultar Hijos</button>
    </div>
  </div>
</template>

<script>
import { consultarTodosFachada, consultarHijosFachada } from "@/client/MatriculaClient";

export default {
  data() {
    return {
      estudiantes: null,
      hijos: [],
      hijosVisibles: false,
      estudianteSeleccionado: null
    }
  },
  methods: {
    async mostrarTodos() {
      try {
        const data = await consultarTodosFachada();
        this.estudiantes = data;
        console.log("Todos los estudiantes:", data);
      } catch (error) {
        console.error("Error al consultar todos:", error);
        this.estudiantes = [];
      }
    },
    
    async verHijos(studentId) {
      try {
        const data = await consultarHijosFachada(studentId);
        this.hijos = data;
        this.estudianteSeleccionado = studentId;
        this.hijosVisibles = true;
      } catch (error) {
        console.error("Error al consultar hijos:", error);
      }
    },
    
    ocultarHijos() {
      this.hijosVisibles = false;
      this.hijos = [];
    },
    
    limpiar() {
      this.estudiantes = null;
      this.hijos = [];
      this.hijosVisibles = false;
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES');
    }
  }
}
</script>

<style scoped>
.estudiante-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0;
  background-color: #f9f9f9;
}

.hijo-card {
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 10px;
  margin: 5px 0;
  background-color: #fff;
}

button {
  margin: 5px;
  padding: 8px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style>
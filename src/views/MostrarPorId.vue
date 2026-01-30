<template>
  <div>
    <h2>Buscar Estudiante por ID</h2>
    
    <div class="search-form">
      <input v-model="id" type="number" placeholder="ID del estudiante" min="1">
      <button @click="buscarPorId">Buscar</button>
      <button @click="limpiar">Limpiar</button>
    </div>
    
    <div v-if="estudiante" class="resultado-detalle">
      <h3>Información del Estudiante</h3>
      <p><strong>ID:</strong> {{ estudiante.id }}</p>
      <p><strong>Nombre:</strong> {{ estudiante.name }}</p>
      <p><strong>Apellido:</strong> {{ estudiante.lastName }}</p>
      <p><strong>Email:</strong> {{ estudiante.email }}</p>
      <p><strong>Provincia:</strong> {{ estudiante.province }}</p>
      <p><strong>Género:</strong> {{ estudiante.gender }}</p>
      <p><strong>Fecha Nacimiento:</strong> {{ formatDate(estudiante.birthDay) }}</p>
      
      <div v-if="estudiante.links && estudiante.links.length > 0">
        <h4>Enlaces:</h4>
        <ul>
          <li v-for="link in estudiante.links" :key="link.rel">
            <strong>{{ link.rel }}:</strong> {{ link.href }}
          </li>
        </ul>
      </div>
      
      <button @click="verHijos" v-if="estudiante.id">Ver Hijos</button>
    </div>
    
    <div v-if="hijos.length > 0" class="hijos-section">
      <h3>Hijos del Estudiante</h3>
      <div v-for="hijo in hijos" :key="hijo.id" class="hijo-item">
        <p>{{ hijo.name }} {{ hijo.lastName }}</p>
      </div>
    </div>
    
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { consultarPorIdFachada, consultarHijosFachada } from "@/client/MatriculaClient";

export default {
  data() {
    return {
      id: "",
      estudiante: null,
      hijos: [],
      error: null
    }
  },
  methods: {
    async buscarPorId() {
      if (!this.id) {
        this.error = "Por favor, ingresa un ID";
        return;
      }
      
      try {
        const data = await consultarPorIdFachada(this.id);
        this.estudiante = data;
        this.error = null;
        console.log("Estudiante encontrado:", data);
      } catch (error) {
        console.error("Error al consultar por ID:", error);
        this.estudiante = null;
        this.error = "Estudiante no encontrado o error en la consulta";
      }
    },
    
    async verHijos() {
      if (!this.estudiante || !this.estudiante.id) return;
      
      try {
        const data = await consultarHijosFachada(this.estudiante.id);
        this.hijos = data;
        console.log("Hijos encontrados:", data);
      } catch (error) {
        console.error("Error al consultar hijos:", error);
        this.hijos = [];
      }
    },
    
    limpiar() {
      this.id = "";
      this.estudiante = null;
      this.hijos = [];
      this.error = null;
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
.search-form {
  margin-bottom: 20px;
}

.search-form input {
  padding: 8px;
  margin-right: 10px;
  width: 200px;
}

.resultado-detalle {
  border: 1px solid #4CAF50;
  border-radius: 5px;
  padding: 20px;
  margin: 20px 0;
  background-color: #f0f8f0;
}

.hijos-section {
  border: 1px solid #2196F3;
  border-radius: 5px;
  padding: 15px;
  margin: 20px 0;
  background-color: #f0f8ff;
}

.hijo-item {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.hijo-item:last-child {
  border-bottom: none;
}

.error-message {
  color: #f44336;
  padding: 10px;
  border: 1px solid #f44336;
  border-radius: 5px;
  background-color: #ffebee;
}

button {
  margin: 5px;
  padding: 8px 15px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1976D2;
}
</style>

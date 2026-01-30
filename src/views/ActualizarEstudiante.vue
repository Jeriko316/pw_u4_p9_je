<template>
  <div>
    <h2>Actualizar Estudiante</h2>
    
    <div class="search-section">
      <h3>1. Buscar Estudiante</h3>
      <input v-model="idBusqueda" type="number" placeholder="ID del estudiante">
      <button @click="buscarParaActualizar" :disabled="!idBusqueda">Buscar</button>
    </div>
    
    <div v-if="estudiante" class="form-container">
      <h3>2. Editar Información</h3>
      
      <div class="form-group">
        <label>Nombre:</label>
        <input v-model="estudiante.name" type="text">
      </div>
      
      <div class="form-group">
        <label>Apellido:</label>
        <input v-model="estudiante.lastName" type="text">
      </div>
      
      <div class="form-group">
        <label>Email:</label>
        <input v-model="estudiante.email" type="email">
      </div>
      
      <div class="form-group">
        <label>Fecha de Nacimiento:</label>
        <input v-model="fechaFormateada" type="datetime-local">
      </div>
      
      <div class="form-group">
        <label>Provincia:</label>
        <select v-model="estudiante.province">
          <option value="Pichincha">Pichincha</option>
          <option value="Guayas">Guayas</option>
          <option value="Azuay">Azuay</option>
          <option value="Manabí">Manabí</option>
          <option value="Loja">Loja</option>
          <option value="Tungurahua">Tungurahua</option>
          <option value="El Oro">El Oro</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Género:</label>
        <select v-model="estudiante.gender">
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="O">Otro</option>
        </select>
      </div>
      
      <div class="button-group">
        <button @click="actualizarCompleto" :disabled="!formValido">Actualizar (PUT)</button>
        <button @click="actualizarConResponse" :disabled="!formValido">Actualizar (Con Response)</button>
        <button @click="cancelar">Cancelar</button>
      </div>
    </div>
    
    <div v-if="resultado" class="resultado">
      <h3>Resultado:</h3>
      <pre>{{ resultado }}</pre>
    </div>
    
    <div v-if="error" class="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script>
import { consultarPorIdFachada, actualizarFachada, actualizarConResponseFachada } from "@/client/MatriculaClient";

export default {
  data() {
    return {
      idBusqueda: "",
      estudiante: null,
      resultado: null,
      error: null
    }
  },
  computed: {
    formValido() {
      return this.estudiante && 
        this.estudiante.name && 
        this.estudiante.lastName && 
        this.estudiante.email;
    },
    
    fechaFormateada: {
      get() {
        if (!this.estudiante || !this.estudiante.birthDay) return '';
        const date = new Date(this.estudiante.birthDay);
        return date.toISOString().slice(0, 16);
      },
      set(value) {
        if (this.estudiante && value) {
          this.estudiante.birthDay = new Date(value).toISOString();
        }
      }
    }
  },
  methods: {
    async buscarParaActualizar() {
      try {
        const data = await consultarPorIdFachada(this.idBusqueda);
        this.estudiante = { ...data };
        this.error = null;
        console.log("Estudiante encontrado para actualizar:", data);
      } catch (error) {
        console.error("Error al buscar estudiante:", error);
        this.estudiante = null;
        this.error = "Estudiante no encontrado";
      }
    },
    
    async actualizarCompleto() {
      try {
        const data = await actualizarFachada(this.idBusqueda, this.estudiante);
        this.resultado = data;
        this.error = null;
        console.log("Estudiante actualizado:", data);
      } catch (error) {
        console.error("Error al actualizar:", error);
        this.error = error.message || "Error al actualizar el estudiante";
      }
    },
    
    async actualizarConResponse() {
      try {
        const data = await actualizarConResponseFachada(this.idBusqueda, this.estudiante);
        this.resultado = data;
        this.error = null;
        console.log("Estudiante actualizado con response:", data);
      } catch (error) {
        console.error("Error al actualizar:", error);
        this.error = error.message || "Error al actualizar el estudiante";
      }
    },
    
    cancelar() {
      this.estudiante = null;
      this.idBusqueda = "";
      this.resultado = null;
      this.error = null;
    }
  }
}
</script>

<style scoped>
.search-section {
  padding: 15px;
  border: 1px solid #2196F3;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: #f0f8ff;
}

.search-section input {
  padding: 8px;
  margin-right: 10px;
  width: 200px;
}

.form-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #FF9800;
  border-radius: 5px;
  background-color: #fff8e1;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:not(:disabled) {
  background-color: #2196F3;
  color: white;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #1976D2;
}

button:nth-child(2) {
  background-color: #FF9800;
}

button:nth-child(2):hover:not(:disabled) {
  background-color: #F57C00;
}

button:nth-child(3) {
  background-color: #f44336;
}

button:nth-child(3):hover:not(:disabled) {
  background-color: #d32f2f;
}

.resultado {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #4CAF50;
  border-radius: 5px;
  background-color: #f0f8f0;
}

.error {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #f44336;
  border-radius: 5px;
  background-color: #ffebee;
  color: #f44336;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
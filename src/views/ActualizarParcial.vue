<template>
  <div>
    <h2>Actualización Parcial de Estudiante</h2>
    
    <div class="search-section">
      <h3>1. Buscar Estudiante</h3>
      <input v-model="idBusqueda" type="number" placeholder="ID del estudiante">
      <button @click="buscarEstudiante" :disabled="!idBusqueda">Buscar</button>
    </div>
    
    <div v-if="estudianteOriginal" class="form-container">
      <h3>2. Campos Actuales</h3>
      <div class="current-info">
        <p><strong>Nombre:</strong> {{ estudianteOriginal.name }}</p>
        <p><strong>Apellido:</strong> {{ estudianteOriginal.lastName }}</p>
        <p><strong>Email:</strong> {{ estudianteOriginal.email }}</p>
        <p><strong>Provincia:</strong> {{ estudianteOriginal.province }}</p>
        <p><strong>Género:</strong> {{ estudianteOriginal.gender }}</p>
      </div>
      
      <h3>3. Campos a Actualizar (dejar en blanco para no cambiar)</h3>
      
      <div class="form-group">
        <label>Nuevo Nombre:</label>
        <input v-model="camposActualizacion.name" type="text" placeholder="Dejar vacío para no cambiar">
      </div>
      
      <div class="form-group">
        <label>Nuevo Apellido:</label>
        <input v-model="camposActualizacion.lastName" type="text" placeholder="Dejar vacío para no cambiar">
      </div>
      
      <div class="form-group">
        <label>Nuevo Email:</label>
        <input v-model="camposActualizacion.email" type="email" placeholder="Dejar vacío para no cambiar">
      </div>
      
      <div class="form-group">
        <label>Nueva Fecha Nacimiento:</label>
        <input v-model="camposActualizacion.birthDay" type="datetime-local">
      </div>
      
      <div class="form-group">
        <label>Nueva Provincia:</label>
        <select v-model="camposActualizacion.province">
          <option value="">No cambiar</option>
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
        <label>Nuevo Género:</label>
        <select v-model="camposActualizacion.gender">
          <option value="">No cambiar</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="O">Otro</option>
        </select>
      </div>
      
      <div class="button-group">
        <button @click="actualizarParcial" :disabled="!hayCambios">Actualizar Parcial (PATCH)</button>
        <button @click="cancelar">Cancelar</button>
      </div>
    </div>
    
    <div v-if="mensajeExito" class="success-message">
      <p>{{ mensajeExito }}</p>
    </div>
    
    <div v-if="error" class="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script>
import { consultarPorIdFachada, actualizaParcialFachada } from "@/client/MatriculaClient";

export default {
  data() {
    return {
      idBusqueda: "",
      estudianteOriginal: null,
      camposActualizacion: {
        name: "",
        lastName: "",
        email: "",
        birthDay: "",
        province: "",
        gender: ""
      },
      mensajeExito: null,
      error: null
    }
  },
  computed: {
    hayCambios() {
      return Object.values(this.camposActualizacion).some(value => 
        value !== "" && value !== null && value !== undefined
      );
    }
  },
  methods: {
    async buscarEstudiante() {
      try {
        const data = await consultarPorIdFachada(this.idBusqueda);
        this.estudianteOriginal = data;
        this.error = null;
        console.log("Estudiante encontrado:", data);
      } catch (error) {
        console.error("Error al buscar estudiante:", error);
        this.estudianteOriginal = null;
        this.error = "Estudiante no encontrado";
      }
    },
    
    async actualizarParcial() {
      try {
        // Filtrar solo los campos que tienen valores
        const datosParaEnviar = {};
        
        Object.keys(this.camposActualizacion).forEach(key => {
          if (this.camposActualizacion[key] !== "" && 
              this.camposActualizacion[key] !== null && 
              this.camposActualizacion[key] !== undefined) {
            
            // Formatear fecha si es necesario
            if (key === 'birthDay' && this.camposActualizacion[key]) {
              datosParaEnviar[key] = new Date(this.camposActualizacion[key]).toISOString();
            } else {
              datosParaEnviar[key] = this.camposActualizacion[key];
            }
          }
        });
        
        await actualizaParcialFachada(this.idBusqueda, datosParaEnviar);
        this.mensajeExito = "Estudiante actualizado parcialmente con éxito";
        this.error = null;
        console.log("Actualización parcial exitosa");
        
        // Limpiar después de 3 segundos
        setTimeout(() => {
          this.mensajeExito = null;
          this.buscarEstudiante(); // Refrescar datos
          this.camposActualizacion = {
            name: "",
            lastName: "",
            email: "",
            birthDay: "",
            province: "",
            gender: ""
          };
        }, 3000);
        
      } catch (error) {
        console.error("Error en actualización parcial:", error);
        this.error = error.message || "Error en la actualización parcial";
        this.mensajeExito = null;
      }
    },
    
    cancelar() {
      this.estudianteOriginal = null;
      this.idBusqueda = "";
      this.camposActualizacion = {
        name: "",
        lastName: "",
        email: "",
        birthDay: "",
        province: "",
        gender: ""
      };
      this.mensajeExito = null;
      this.error = null;
    }
  }
}
</script>

<style scoped>
.search-section {
  padding: 15px;
  border: 1px solid #9C27B0;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: #f3e5f5;
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
  border: 1px solid #9C27B0;
  border-radius: 5px;
  background-color: #fafafa;
}

.current-info {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
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
  background-color: #9C27B0;
  color: white;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #7B1FA2;
}

button:nth-child(2) {
  background-color: #f44336;
}

button:nth-child(2):hover:not(:disabled) {
  background-color: #d32f2f;
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #4CAF50;
  border-radius: 5px;
  background-color: #f0f8f0;
  color: #4CAF50;
}

.error {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #f44336;
  border-radius: 5px;
  background-color: #ffebee;
  color: #f44336;
}
</style>
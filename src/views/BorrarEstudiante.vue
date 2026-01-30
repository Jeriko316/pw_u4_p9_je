<template>
  <div>
    <h2>Eliminar Estudiante</h2>
    
    <div class="search-section">
      <h3>1. Buscar Estudiante</h3>
      <input v-model="idBusqueda" type="number" placeholder="ID del estudiante">
      <button @click="buscarEstudiante" :disabled="!idBusqueda">Buscar</button>
    </div>
    
    <div v-if="estudiante" class="estudiante-info">
      <h3>2. Confirmar Eliminación</h3>
      <div class="info-card">
        <p><strong>ID:</strong> {{ estudiante.id }}</p>
        <p><strong>Nombre:</strong> {{ estudiante.name }} {{ estudiante.lastName }}</p>
        <p><strong>Email:</strong> {{ estudiante.email }}</p>
        <p><strong>Provincia:</strong> {{ estudiante.province }}</p>
        <p><strong>Género:</strong> {{ estudiante.gender }}</p>
        
        <div class="warning-section">
          <p>⚠️ <strong>Advertencia:</strong> Esta acción no se puede deshacer.</p>
        </div>
        
        <div class="button-group">
          <button @click="confirmarEliminacion" class="delete-btn">Confirmar Eliminación</button>
          <button @click="cancelar" class="cancel-btn">Cancelar</button>
        </div>
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
import { consultarPorIdFachada, borrarFachada } from "@/client/MatriculaClient";

export default {
  data() {
    return {
      idBusqueda: "",
      estudiante: null,
      mensajeExito: null,
      error: null
    }
  },
  methods: {
    async buscarEstudiante() {
      try {
        const data = await consultarPorIdFachada(this.idBusqueda);
        this.estudiante = data;
        this.error = null;
        console.log("Estudiante encontrado:", data);
      } catch (error) {
        console.error("Error al buscar estudiante:", error);
        this.estudiante = null;
        this.error = "Estudiante no encontrado";
      }
    },
    
    async confirmarEliminacion() {
      if (!confirm(`¿Estás seguro de eliminar al estudiante ${this.estudiante.name} ${this.estudiante.lastName}?`)) {
        return;
      }
      
      try {
        const resultado = await borrarFachada(this.idBusqueda);
        
        if (resultado === true || resultado === 'true') {
          this.mensajeExito = `Estudiante ${this.estudiante.name} ${this.estudiante.lastName} eliminado exitosamente`;
          this.error = null;
          
          // Limpiar después de 3 segundos
          setTimeout(() => {
            this.mensajeExito = null;
            this.estudiante = null;
            this.idBusqueda = "";
          }, 3000);
          
        } else {
          this.error = "No se pudo eliminar el estudiante";
        }
        
        console.log("Resultado eliminación:", resultado);
      } catch (error) {
        console.error("Error al eliminar estudiante:", error);
        this.error = error.message || "Error al eliminar el estudiante";
        this.mensajeExito = null;
      }
    },
    
    cancelar() {
      this.estudiante = null;
      this.idBusqueda = "";
      this.mensajeExito = null;
      this.error = null;
    }
  }
}
</script>

<style scoped>
.search-section {
  padding: 15px;
  border: 1px solid #f44336;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: #ffebee;
}

.search-section input {
  padding: 8px;
  margin-right: 10px;
  width: 200px;
}

.estudiante-info {
  max-width: 600px;
  margin: 20px auto;
}

.info-card {
  padding: 20px;
  border: 2px solid #f44336;
  border-radius: 5px;
  background-color: #fff;
}

.info-card p {
  margin: 8px 0;
}

.warning-section {
  padding: 15px;
  border: 1px solid #ff9800;
  border-radius: 5px;
  margin: 20px 0;
  background-color: #fff8e1;
  color: #ff9800;
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
  flex: 1;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

.cancel-btn {
  background-color: #757575;
  color: white;
}

.cancel-btn:hover {
  background-color: #616161;
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
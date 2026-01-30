<template>
  <div>
    <h2>Registrar Nuevo Estudiante</h2>
    
    <div class="form-container">
      <div class="form-group">
        <label>Nombre: *</label>
        <input v-model="nuevoEstudiante.name" type="text" placeholder="Ej: Juan" required>
      </div>
      
      <div class="form-group">
        <label>Apellido: *</label>
        <input v-model="nuevoEstudiante.lastName" type="text" placeholder="Ej: Pérez" required>
      </div>
      
      <div class="form-group">
        <label>Email: *</label>
        <input v-model="nuevoEstudiante.email" type="email" placeholder="Ej: juan@example.com" required>
      </div>
      
      <div class="form-group">
        <label>Fecha de Nacimiento: *</label>
        <input v-model="fechaNacimiento" type="date" required>
        <small class="hint">Formato: YYYY-MM-DD</small>
      </div>
      
      <div class="form-group">
        <label>Provincia: *</label>
        <select v-model="nuevoEstudiante.province" required>
          <option value="">Seleccione provincia</option>
          <option value="Pichincha">Pichincha</option>
          <option value="Guayas">Guayas</option>
          <option value="Azuay">Azuay</option>
          <option value="Manabí">Manabí</option>
          <option value="Loja">Loja</option>
          <option value="Tungurahua">Tungurahua</option>
          <option value="El Oro">El Oro</option>
          <option value="Imbabura">Imbabura</option>
          <option value="Cotopaxi">Cotopaxi</option>
          <option value="Chimborazo">Chimborazo</option>
          <option value="Pastaza">Pastaza</option>
          <option value="Morona Santiago">Morona Santiago</option>
          <option value="Napo">Napo</option>
          <option value="Orellana">Orellana</option>
          <option value="Sucumbíos">Sucumbíos</option>
          <option value="Galápagos">Galápagos</option>
          <option value="Bolívar">Bolívar</option>
          <option value="Cañar">Cañar</option>
          <option value="Carchi">Carchi</option>
          <option value="Esmeraldas">Esmeraldas</option>
          <option value="Los Ríos">Los Ríos</option>
          <option value="Santa Elena">Santa Elena</option>
          <option value="Santo Domingo">Santo Domingo</option>
          <option value="Zamora Chinchipe">Zamora Chinchipe</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Género: *</label>
        <select v-model="nuevoEstudiante.gender" required>
          <option value="">Seleccione género</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="O">Otro</option>
          <option value="PND">Prefiero no decir</option>
        </select>
      </div>
      
      <div class="button-group">
        <button @click="guardarEstudiantePrincipal" :disabled="!formValido || loading" 
                class="btn-primary">
          <span v-if="loading">⌛ Guardando...</span>
          <span v-else>💾 Guardar (Endpoint Principal)</span>
        </button>
        
        <button @click="guardarEstudianteAlternativo" :disabled="!formValido || loading" 
                class="btn-secondary">
          <span v-if="loading">⌛ Guardando...</span>
          <span v-else>📝 Guardar (Alternativo con Response)</span>
        </button>
        
        <button @click="limpiarFormulario" class="btn-clear">
          🗑️ Limpiar
        </button>
      </div>
    </div>
    
    <div v-if="resultado" class="resultado success">
      <h3>✅ ¡Estudiante Guardado Exitosamente!</h3>
      <div class="resultado-info">
        <p><strong>ID:</strong> {{ resultado.id }}</p>
        <p><strong>Nombre:</strong> {{ resultado.name }} {{ resultado.lastName }}</p>
        <p><strong>Email:</strong> {{ resultado.email }}</p>
        <p><strong>Fecha Nacimiento:</strong> {{ formatDate(resultado.birthDay) }}</p>
        <p><strong>Provincia:</strong> {{ resultado.province }}</p>
        <p><strong>Género:</strong> {{ getGenderText(resultado.gender) }}</p>
      </div>
    </div>
    
    <div v-if="error" class="resultado error">
      <h3>❌ Error al Guardar</h3>
      <div class="error-details">
        <p><strong>Mensaje:</strong> {{ error }}</p>
        <p v-if="errorDetalles"><strong>Detalles:</strong> {{ errorDetalles }}</p>
        <p v-if="errorStatus"><strong>Código Error:</strong> {{ errorStatus }}</p>
        
        <div v-if="suggestions.length > 0" class="suggestions">
          <h4>💡 Sugerencias:</h4>
          <ul>
            <li v-for="(suggestion, index) in suggestions" :key="index">{{ suggestion }}</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="debug-info" v-if="debugMode">
      <h4>🔍 Información de Depuración:</h4>
      <p><strong>Fecha seleccionada:</strong> {{ fechaNacimiento }}</p>
      <p><strong>Datos a enviar:</strong></p>
      <pre>{{ datosParaEnviar }}</pre>
    </div>
    
    <button @click="debugMode = !debugMode" class="btn-debug">
      {{ debugMode ? '🔒 Ocultar Debug' : '🔓 Mostrar Debug' }}
    </button>
  </div>
</template>

<script>
import { guardarFachada, guardarConResponseFachada } from "@/client/MatriculaClient";

export default {
  data() {
    return {
      nuevoEstudiante: {
        name: "",
        lastName: "",
        email: "",
        birthDay: null,
        province: "",
        gender: ""
      },
      fechaNacimiento: "",
      resultado: null,
      error: null,
      errorDetalles: null,
      errorStatus: null,
      loading: false,
      debugMode: false,
      suggestions: []
    }
  },
  computed: {
    formValido() {
      return (
        this.nuevoEstudiante.name &&
        this.nuevoEstudiante.lastName &&
        this.nuevoEstudiante.email &&
        this.fechaNacimiento &&
        this.nuevoEstudiante.province &&
        this.nuevoEstudiante.gender
      );
    },
    
    datosParaEnviar() {
      return {
        ...this.nuevoEstudiante,
        birthDay: this.fechaNacimiento || null
      };
    }
  },
  methods: {
    async guardarEstudiantePrincipal() {
      await this.guardarEstudiante(false);
    },
    
    async guardarEstudianteAlternativo() {
      await this.guardarEstudiante(true);
    },
    
    async guardarEstudiante(usarAlternativo = false) {
      this.loading = true;
      this.error = null;
      this.errorDetalles = null;
      this.errorStatus = null;
      this.resultado = null;
      this.suggestions = [];
      
      try {
        console.log("📤 Enviando datos:", this.datosParaEnviar);
        
        let data;
        if (usarAlternativo) {
          console.log("📝 Usando endpoint /crear");
          data = await guardarConResponseFachada(this.datosParaEnviar);
        } else {
          console.log("🚀 Usando endpoint principal");
          data = await guardarFachada(this.datosParaEnviar);
        }
        
        console.log("✅ Respuesta recibida:", data);
        this.resultado = data;
        
        // Auto-limpiar después de 5 segundos
        setTimeout(() => {
          this.limpiarFormulario();
        }, 5000);
        
      } catch (error) {
        console.error("❌ Error completo:", error);
        
        this.error = error.message || "Error desconocido";
        this.errorStatus = error.response?.status;
        
        if (error.response?.data) {
          const errorData = error.response.data;
          if (typeof errorData === 'string') {
            this.errorDetalles = errorData;
          } else if (errorData.message) {
            this.errorDetalles = errorData.message;
          } else {
            this.errorDetalles = JSON.stringify(errorData, null, 2);
          }
        }
        
        // Sugerencias basadas en el error
        this.generateSuggestions(error);
        
      } finally {
        this.loading = false;
      }
    },
    
    generateSuggestions(error) {
      this.suggestions = [];
      
      if (error.response?.status === 500) {
        this.suggestions.push("Error interno del servidor. Verifica los logs del backend.");
        this.suggestions.push("Asegúrate que la base de datos esté conectada y funcionando.");
      }
      
      if (this.errorDetalles && this.errorDetalles.includes('birthDay')) {
        this.suggestions.push("Problema con el formato de fecha. Usa YYYY-MM-DD (ej: 1990-05-15)");
        this.suggestions.push("La fecha debe ser solo la fecha, sin hora.");
      }
      
      if (error.response?.status === 404) {
        this.suggestions.push("Endpoint no encontrado. Verifica la URL del backend.");
        this.suggestions.push("Asegúrate que el servidor Quarkus esté corriendo en puerto 8081.");
      }
    },
    
    limpiarFormulario() {
      this.nuevoEstudiante = {
        name: "",
        lastName: "",
        email: "",
        birthDay: null,
        province: "",
        gender: ""
      };
      this.fechaNacimiento = "";
      this.resultado = null;
      this.error = null;
      this.errorDetalles = null;
      this.errorStatus = null;
      this.suggestions = [];
    },
    
    formatDate(dateString) {
      if (!dateString) return 'No especificada';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    
    getGenderText(genderCode) {
      const genders = {
        'M': 'Masculino',
        'F': 'Femenino',
        'O': 'Otro',
        'PND': 'Prefiero no decir'
      };
      return genders[genderCode] || genderCode;
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 25px;
  border: 2px solid #4CAF50;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

.hint {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #666;
  font-style: italic;
}

.button-group {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s;
  flex: 1;
  min-width: 200px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #45a049;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #2196F3;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #1976D2;
  transform: translateY(-2px);
}

.btn-clear {
  background-color: #f44336;
  color: white;
}

.btn-clear:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
}

.btn-debug {
  background-color: #9C27B0;
  color: white;
  margin-top: 20px;
  width: auto;
}

.btn-debug:hover {
  background-color: #7B1FA2;
}

.resultado {
  margin-top: 25px;
  padding: 20px;
  border-radius: 8px;
  animation: fadeIn 0.5s;
}

.resultado.success {
  border: 2px solid #4CAF50;
  background-color: #f0f8f0;
}

.resultado.error {
  border: 2px solid #f44336;
  background-color: #ffebee;
}

.resultado-info p {
  margin: 8px 0;
  font-size: 16px;
}

.error-details {
  font-size: 14px;
}

.suggestions {
  margin-top: 15px;
  padding: 10px;
  background-color: #fff3cd;
  border-radius: 5px;
  border: 1px solid #ffeaa7;
}

.suggestions h4 {
  margin-top: 0;
  color: #856404;
}

.suggestions ul {
  margin: 5px 0;
  padding-left: 20px;
}

.suggestions li {
  margin: 5px 0;
  color: #856404;
}

.debug-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px dashed #6c757d;
  border-radius: 5px;
  font-family: monospace;
  font-size: 14px;
}

.debug-info pre {
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  .form-container {
    padding: 15px;
    margin: 10px;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  button {
    min-width: 100%;
  }
}
</style>
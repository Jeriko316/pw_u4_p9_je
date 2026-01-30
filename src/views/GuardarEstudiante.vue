<template>
  <div class="page-container">
    <div class="form-card">
      <div class="form-header">
        <h2>🎓 Registrar Nuevo Estudiante</h2>
        <p>Complete la información del estudiante</p>
      </div>

      <form @submit.prevent="guardarEstudiantePrincipal" class="student-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="name">Nombre *</label>
            <input
              id="name"
              v-model="nuevoEstudiante.name"
              type="text"
              placeholder="Ej: Juan"
              required
            />
          </div>

          <div class="form-group">
            <label for="lastName">Apellido *</label>
            <input
              id="lastName"
              v-model="nuevoEstudiante.lastName"
              type="text"
              placeholder="Ej: Pérez"
              required
            />
          </div>

          <div class="form-group full-width">
            <label for="email">Email *</label>
            <input
              id="email"
              v-model="nuevoEstudiante.email"
              type="email"
              placeholder="Ej: juan@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="birthDate">Fecha de Nacimiento *</label>
            <input
              id="birthDate"
              v-model="fechaNacimiento"
              type="date"
              required
            />
          </div>

          <div class="form-group">
            <label for="province">Provincia *</label>
            <select id="province" v-model="nuevoEstudiante.province" required>
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
            <label for="gender">Género *</label>
            <select id="gender" v-model="nuevoEstudiante.gender" required>
              <option value="">Seleccione género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
              <option value="PND">Prefiero no decir</option>
            </select>
          </div>
        </div>

        <div class="button-section">
          <button
            type="submit"
            :disabled="!formValido || loading"
            class="btn-primary"
          >
            <span v-if="loading">⏳ Guardando...</span>
            <span v-else>💾 Guardar Estudiante</span>
          </button>

          <button
            type="button"
            @click="guardarEstudianteAlternativo"
            :disabled="!formValido || loading"
            class="btn-secondary"
          >
            <span v-if="loading">⏳ Guardando...</span>
            <span v-else>📝 Guardar (Alternativo)</span>
          </button>

          <button type="button" @click="limpiarFormulario" class="btn-clear">
            🗑️ Limpiar Formulario
          </button>
        </div>
      </form>
    </div>

    <div v-if="resultado" class="result-card success">
      <div class="result-header">
        <h3>✅ ¡Estudiante Registrado!</h3>
      </div>
      <div class="result-content">
        <div class="student-info">
          <div class="info-item">
            <span class="label">ID:</span>
            <span class="value">{{ resultado.id }}</span>
          </div>
          <div class="info-item">
            <span class="label">Nombre:</span>
            <span class="value"
              >{{ resultado.name }} {{ resultado.lastName }}</span
            >
          </div>
          <div class="info-item">
            <span class="label">Email:</span>
            <span class="value">{{ resultado.email }}</span>
          </div>
          <div class="info-item">
            <span class="label">Fecha Nacimiento:</span>
            <span class="value">{{ formatDate(resultado.birthDay) }}</span>
          </div>
          <div class="info-item">
            <span class="label">Provincia:</span>
            <span class="value">{{ resultado.province }}</span>
          </div>
          <div class="info-item">
            <span class="label">Género:</span>
            <span class="value">{{ getGenderText(resultado.gender) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="error" class="result-card error">
      <div class="result-header">
        <h3>❌ Error al Registrar</h3>
      </div>
      <div class="result-content">
        <p class="error-message">{{ error }}</p>
        <div v-if="errorDetalles" class="error-details">
          <details>
            <summary>Detalles técnicos</summary>
            <pre>{{ errorDetalles }}</pre>
          </details>
        </div>
        <div v-if="suggestions.length > 0" class="suggestions">
          <h4>💡 Sugerencias:</h4>
          <ul>
            <li v-for="suggestion in suggestions" :key="suggestion">
              {{ suggestion }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="debugMode" class="debug-info">
      <h4>🔍 Información de Depuración:</h4>
      <p><strong>Fecha seleccionada:</strong> {{ fechaNacimiento }}</p>
      <p><strong>Datos a enviar:</strong></p>
      <pre>{{ datosParaEnviar }}</pre>
    </div>

    <button @click="debugMode = !debugMode" class="btn-debug">
      {{ debugMode ? "🔒 Ocultar Debug" : "🔓 Mostrar Debug" }}
    </button>
  </div>
</template>

<script>
import {
  guardarFachada,
  guardarConResponseFachada,
} from "@/client/MatriculaClient";

export default {
  data() {
    return {
      nuevoEstudiante: {
        name: "",
        lastName: "",
        email: "",
        birthDay: null,
        province: "",
        gender: "",
      },
      fechaNacimiento: "",
      resultado: null,
      error: null,
      errorDetalles: null,
      errorStatus: null,
      loading: false,
      debugMode: false,
      suggestions: [],
    };
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
        birthDay: this.fechaNacimiento || null,
      };
    },
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
          if (typeof errorData === "string") {
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
        this.suggestions.push(
          "Error interno del servidor. Verifica los logs del backend.",
        );
        this.suggestions.push(
          "Asegúrate que la base de datos esté conectada y funcionando.",
        );
      }

      if (this.errorDetalles && this.errorDetalles.includes("birthDay")) {
        this.suggestions.push(
          "Problema con el formato de fecha. Usa YYYY-MM-DD (ej: 1990-05-15)",
        );
        this.suggestions.push("La fecha debe ser solo la fecha, sin hora.");
      }

      if (error.response?.status === 404) {
        this.suggestions.push(
          "Endpoint no encontrado. Verifica la URL del backend.",
        );
        this.suggestions.push(
          "Asegúrate que el servidor Quarkus esté corriendo en puerto 8081.",
        );
      }
    },

    limpiarFormulario() {
      this.nuevoEstudiante = {
        name: "",
        lastName: "",
        email: "",
        birthDay: null,
        province: "",
        gender: "",
      };
      this.fechaNacimiento = "";
      this.resultado = null;
      this.error = null;
      this.errorDetalles = null;
      this.errorStatus = null;
      this.suggestions = [];
    },

    formatDate(dateString) {
      if (!dateString) return "No especificada";
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },

    getGenderText(genderCode) {
      const genders = {
        M: "Masculino",
        F: "Femenino",
        O: "Otro",
        PND: "Prefiero no decir",
      };
      return genders[genderCode] || genderCode;
    },
  },
};
</script>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.form-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-header h2 {
  color: #667eea;
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.form-header p {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

.student-form {
  margin-top: 30px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 40px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-size: 1rem;
}

.form-group input,
.form-group select {
  padding: 15px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fff;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  outline: none;
}

.form-group input::placeholder {
  color: #aab0b6;
}

.button-section {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

button {
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(245, 87, 108, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 87, 108, 0.4);
}

.btn-clear {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  color: #333;
  box-shadow: 0 4px 15px rgba(255, 154, 158, 0.3);
}

.btn-clear:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 154, 158, 0.4);
}

.result-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideIn 0.5s ease-out;
}

.result-card.success {
  border-left: 5px solid #4ade80;
}

.result-card.error {
  border-left: 5px solid #f87171;
}

.result-header h3 {
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.result-content {
  color: #374151;
}

.student-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 600;
  color: #6b7280;
}

.value {
  font-weight: 500;
  color: #111827;
  text-align: right;
}

.error-message {
  font-size: 1.1rem;
  font-weight: 500;
  color: #dc2626;
  margin-bottom: 15px;
}

.error-details {
  margin-top: 20px;
}

.error-details details {
  background: #f9fafb;
  border-radius: 8px;
  padding: 15px;
}

.error-details summary {
  cursor: pointer;
  font-weight: 600;
  color: #374151;
}

.error-details pre {
  background: #e5e7eb;
  padding: 15px;
  border-radius: 6px;
  font-size: 0.9rem;
  overflow-x: auto;
  margin-top: 10px;
}

.suggestions {
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 12px;
  border: 1px solid #f59e0b;
}

.suggestions h4 {
  margin: 0 0 15px 0;
  color: #92400e;
  font-weight: 600;
}

.suggestions ul {
  margin: 0;
  padding-left: 20px;
}

.suggestions li {
  color: #92400e;
  margin-bottom: 8px;
  line-height: 1.5;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-container {
    padding: 15px;
  }

  .form-card {
    padding: 25px;
  }

  .form-header h2 {
    font-size: 2rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .button-section {
    flex-direction: column;
  }

  button {
    min-width: 100%;
  }

  .student-info {
    grid-template-columns: 1fr;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .value {
    text-align: left;
  }
}
</style>

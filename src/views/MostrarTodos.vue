<template>
  <div class="page-container">
    <div class="header-section">
      <h2>📚 Directorio de Estudiantes</h2>
      <p>Administra y visualiza todos los estudiantes registrados</p>
    </div>

    <div class="actions-section">
      <button @click="mostrarTodos" class="btn-primary" :disabled="loading">
        <span v-if="loading">⏳ Cargando...</span>
        <span v-else>📋 Cargar Todos</span>
      </button>
      <button @click="limpiar" class="btn-secondary">🗑️ Limpiar Vista</button>
    </div>

    <div v-if="estudiantes && estudiantes.length > 0" class="students-section">
      <div class="section-header">
        <h3>👥 Estudiantes Registrados ({{ estudiantes.length }})</h3>
      </div>

      <div class="students-grid">
        <div
          v-for="estudiante in estudiantes"
          :key="estudiante.id"
          class="student-card"
          @click="verHijos(estudiante.id)"
        >
          <div class="card-header">
            <div class="avatar">
              {{ estudiante.name.charAt(0) }}{{ estudiante.lastName.charAt(0) }}
            </div>
            <div class="student-name">
              <h4>{{ estudiante.name }} {{ estudiante.lastName }}</h4>
              <span class="student-id">ID: {{ estudiante.id }}</span>
            </div>
          </div>

          <div class="card-content">
            <div class="info-row">
              <span class="label">📧 Email:</span>
              <span class="value">{{ estudiante.email }}</span>
            </div>
            <div class="info-row">
              <span class="label">📍 Provincia:</span>
              <span class="value">{{ estudiante.province }}</span>
            </div>
            <div class="info-row">
              <span class="label">🎂 Nacimiento:</span>
              <span class="value">{{ formatDate(estudiante.birthDay) }}</span>
            </div>
            <div class="info-row">
              <span class="label">⚧ Género:</span>
              <span class="value">{{ estudiante.gender }}</span>
            </div>
          </div>

          <div class="card-actions">
            <button @click.stop="verHijos(estudiante.id)" class="btn-children">
              👶 Ver Hijos
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="estudiantes && estudiantes.length === 0"
      class="empty-state"
    >
      <div class="empty-icon">📭</div>
      <h3>No hay estudiantes registrados</h3>
      <p>¡Registra tu primer estudiante para comenzar!</p>
    </div>

    <div v-if="hijosVisibles" class="children-modal">
      <div class="modal-overlay" @click="ocultarHijos"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>👶 Hijos del Estudiante {{ estudianteSeleccionado }}</h3>
          <button @click="ocultarHijos" class="btn-close">✕</button>
        </div>

        <div class="modal-body">
          <div v-if="hijos && hijos.length > 0" class="children-list">
            <div v-for="hijo in hijos" :key="hijo.id" class="child-item">
              <div class="child-avatar">
                {{ hijo.name.charAt(0) }}{{ hijo.lastName.charAt(0) }}
              </div>
              <div class="child-info">
                <h4>{{ hijo.name }} {{ hijo.lastName }}</h4>
                <p>ID: {{ hijo.id }}</p>
              </div>
            </div>
          </div>

          <div v-else class="no-children">
            <p>Este estudiante no tiene hijos registrados.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  consultarTodosFachada,
  consultarHijosFachada,
} from "@/client/MatriculaClient";

export default {
  data() {
    return {
      estudiantes: null,
      hijos: [],
      hijosVisibles: false,
      estudianteSeleccionado: null,
    };
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
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES");
    },
  },
};
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
}

.header-section h2 {
  color: #667eea;
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.header-section p {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

.actions-section {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 40px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 180px;
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
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  color: #333;
  box-shadow: 0 4px 15px rgba(255, 154, 158, 0.3);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 154, 158, 0.4);
}

.students-section {
  margin-bottom: 40px;
}

.section-header {
  margin-bottom: 30px;
  text-align: center;
}

.section-header h3 {
  color: #333;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
}

.student-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.student-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 15px;
  flex-shrink: 0;
}

.student-name h4 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
}

.student-id {
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 500;
}

.card-content {
  margin-bottom: 20px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-row:last-child {
  border-bottom: none;
}

.label {
  font-weight: 600;
  color: #6b7280;
  font-size: 0.9rem;
}

.value {
  font-weight: 500;
  color: #111827;
  text-align: right;
  font-size: 0.9rem;
}

.card-actions {
  text-align: center;
}

.btn-children {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(245, 87, 108, 0.3);
  transition: all 0.3s ease;
}

.btn-children:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 87, 108, 0.4);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.empty-state p {
  color: #666;
  font-size: 1rem;
  margin: 0;
}

.children-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: modalSlideIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.btn-close:hover {
  background: #f0f0f0;
  color: #333;
}

.modal-body {
  color: #374151;
}

.children-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.child-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.child-item:hover {
  background: #f3f4f6;
  transform: translateX(5px);
}

.child-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  margin-right: 15px;
  flex-shrink: 0;
}

.child-info h4 {
  margin: 0 0 5px 0;
  color: #111827;
  font-size: 1.1rem;
  font-weight: 600;
}

.child-info p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.no-children {
  text-align: center;
  padding: 30px;
  color: #6b7280;
}

.no-children p {
  margin: 0;
  font-size: 1.1rem;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-container {
    padding: 15px;
  }

  .header-section h2 {
    font-size: 2rem;
  }

  .actions-section {
    flex-direction: column;
    align-items: center;
  }

  .students-grid {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .value {
    text-align: left;
  }

  .modal-content {
    margin: 20px;
    padding: 20px;
  }
}
</style>

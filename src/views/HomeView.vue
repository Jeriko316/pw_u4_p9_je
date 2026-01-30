<template>
  <div class="home-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1>🎓 Sistema de Gestión de Estudiantes</h1>
        <p>
          Una aplicación moderna para administrar estudiantes, cursos y
          registros académicos
        </p>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">👥</div>
            <h3>Gestión de Estudiantes</h3>
            <p>Registra, actualiza y consulta información de estudiantes</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Reportes</h3>
            <p>Visualiza estadísticas y genera reportes detallados</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>Seguro</h3>
            <p>Datos protegidos con las mejores prácticas de seguridad</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Rápido</h3>
            <p>Interfaz moderna y responsiva para una experiencia fluida</p>
          </div>
        </div>

        <div class="cta-section">
          <router-link to="/guardar" class="btn-primary">
            🚀 Comenzar - Registrar Estudiante
          </router-link>
          <router-link to="/mostrar-todos" class="btn-secondary">
            📋 Ver Todos los Estudiantes
          </router-link>
        </div>
      </div>

      <div class="hero-image">
        <img alt="Sistema de Gestión" src="../assets/logo.png" class="logo" />
        <div class="floating-elements">
          <div class="floating-card card-1">📚</div>
          <div class="floating-card card-2">🎓</div>
          <div class="floating-card card-3">📝</div>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="stat-item">
        <div class="stat-number">100+</div>
        <div class="stat-label">Estudiantes</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">24/7</div>
        <div class="stat-label">Disponibilidad</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">99.9%</div>
        <div class="stat-label">Uptime</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
}

.hero-content {
  padding-left: 20px;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-content p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.feature-card h3 {
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.feature-card p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
}

.cta-section {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(245, 87, 108, 0.3);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 87, 108, 0.4);
}

.hero-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-card {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: float 6s ease-in-out infinite;
}

.card-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.card-2 {
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.card-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.stats-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 40px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 1rem;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
    padding: 40px 20px;
  }

  .hero-content {
    padding-left: 0;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .cta-section {
    justify-content: center;
  }

  .logo {
    width: 150px;
    height: 150px;
  }

  .floating-card {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }

  .stats-section {
    gap: 30px;
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>

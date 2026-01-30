<!-- App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/mostrar-todos">Mostrar Todos</router-link> |
      <router-link to="/mostrar-por-id">Mostrar por ID</router-link> |
      <router-link to="/guardar">Guardar</router-link> |
      <router-link to="/actualizar">Actualizar</router-link> |
      <router-link to="/actualizar-parcial">Actualizar Parcial</router-link> |
      <router-link to="/borrar">Borrar</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
}

nav {
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  margin: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

nav a {
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  color: #667eea;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  background: rgba(102, 126, 234, 0.1);
}

nav a:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

nav a.router-link-exact-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}
</style>

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
    <router-view/>
  </div>
</template>

<style>
nav {
  padding: 15px;
  background: #f0f0f0;
}
nav a {
  margin-right: 10px;
  font-weight: bold;
  color: #333;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>

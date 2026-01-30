<template>
  <div>
    <h2>Todos los estudiantes</h2>
    <button @click="mostrarTodos">Cargar</button>
    <pre>{{ resultado }}</pre>
  </div>
</template>

<script>
import { consultarTodosFachada } from "@/client/MatriculaClient";

export default {
  data() {
    return {
      resultado: null
    }
  },
  methods: {
    async mostrarTodos() {
      try {
        const data = await consultarTodosFachada();
        this.resultado = data;
        console.log("Todos los estudiantes:", data);
      } catch (error) {
        console.error("Error Axios al consultar todos:", error);
      }
    }
  }
}
</script>

<style scoped>
button {
  margin: 10px 0;
  padding: 5px 10px;
}
pre {
  background: #f9f9f9;
  padding: 10px;
}
</style>

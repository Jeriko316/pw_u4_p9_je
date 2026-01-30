<template>
  <div>
    <h2>Mostrar Estudiante por ID</h2>
    <input v-model="id" type="number" placeholder="ID estudiante">
    <button @click="mostrarPorId">Buscar</button>
    <pre>{{ resultado }}</pre>
  </div>
</template>

<script>
import { consultarPorIdFachada } from "@/client/MatriculaClient";

export default {
  data() {
    return {
      id: "",
      resultado: null
    }
  },
  methods: {
    async mostrarPorId() {
      if (!this.id) return console.warn("Debes ingresar un ID");
      try {
        const data = await consultarPorIdFachada(this.id);
        this.resultado = data;
        console.log("Estudiante consultado por ID:", data);
      } catch (error) {
        console.error("Error Axios al consultar por ID:", error);
      }
    }
  }
}
</script>

<style scoped>
input { margin-right: 5px; padding: 3px; }
button { padding: 5px 10px; }
pre { margin-top: 10px; background: #f9f9f9; padding: 10px; }
</style>

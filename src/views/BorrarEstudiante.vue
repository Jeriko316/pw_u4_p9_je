<template>
  <div>
    <h2>Borrar Estudiante</h2>
    <input v-model="id" type="number" placeholder="ID estudiante">
    <button @click="borrarEstudiante">Borrar</button>
    <pre>{{ resultado }}</pre>
  </div>
</template>

<script>
import { borrarFachada } from "@/client/MatriculaClient";

export default {
  data() {
    return {
      id: "",
      resultado: null
    }
  },
  methods: {
    async borrarEstudiante() {
      if (!this.id) return console.warn("Debes ingresar un ID");
      try {
        await borrarFachada(this.id);
        this.resultado = `Estudiante con ID ${this.id} eliminado`;
        console.log(this.resultado);
      } catch (error) {
        console.error("Error Axios al borrar estudiante:", error);
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

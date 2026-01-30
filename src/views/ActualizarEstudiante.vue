<template>
  <div>
    <h2>Actualizar Estudiante</h2>
    <input v-model="id" type="number" placeholder="ID estudiante">
    <input v-model="nombre" type="text" placeholder="Nuevo nombre">
    <button @click="actualizarEstudiante">Actualizar</button>
    <pre>{{ resultado }}</pre>
  </div>
</template>

<script>
import { actualizarFachada } from "@/client/MatriculaClient";

export default {
  data() {
    return {
      id: "",
      nombre: "",
      resultado: null
    }
  },
  methods: {
    async actualizarEstudiante() {
      if (!this.id || !this.nombre) return console.warn("Debes ingresar ID y nombre");
      try {
        const body = { nombre: this.nombre };
        const data = await actualizarFachada(this.id, body);
        this.resultado = data;
        console.log("Estudiante actualizado:", data);
      } catch (error) {
        console.error("Error Axios al actualizar estudiante:", error);
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

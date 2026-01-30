<template>
  <div>
    <h2>Actualizar Parcialmente Estudiante</h2>
    <input v-model="id" type="number" placeholder="ID estudiante">
    <input v-model="nombre" type="text" placeholder="Nombre parcial">
    <button @click="actualizarParcialEstudiante">Actualizar Parcial</button>
    <pre>{{ resultado }}</pre>
  </div>
</template>

<script>
import { actualizaParcialFachada } from "@/client/MatriculaClient";

export default {
  data() {
    return {
      id: "",
      nombre: "",
      resultado: null
    }
  },
  methods: {
    async actualizarParcialEstudiante() {
      if (!this.id || !this.nombre) return console.warn("Debes ingresar ID y nombre parcial");
      try {
        const body = { nombre: this.nombre };
        await actualizaParcialFachada(this.id, body);
        this.resultado = `Estudiante con ID ${this.id} actualizado parcialmente`;
        console.log(this.resultado);
      } catch (error) {
        console.error("Error Axios al actualizar parcialmente:", error);
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

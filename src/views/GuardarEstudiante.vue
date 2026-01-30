<template>
  <div>
    <h2>Guardar Estudiante</h2>
    <input v-model="nombre" type="text" placeholder="Nombre estudiante">
    <button @click="guardarEstudiante">Guardar</button>
    <pre>{{ resultado }}</pre>
  </div>
</template>

<script>
import { guardarFachada } from "@/client/MatriculaClient";

export default {
  data() {
    return {
      nombre: "",
      resultado: null
    }
  },
  methods: {
    async guardarEstudiante() {
      if (!this.nombre) {
        console.warn("Debes ingresar un nombre");
        return;
      }
      try {
        const body = { nombre: this.nombre };
        const data = await guardarFachada(body);
        this.resultado = data;
        console.log("Estudiante guardado:", data);
      } catch (error) {
        console.error("Error Axios al guardar estudiante:", error);
      }
    }
  }
}
</script>

<style scoped>
input {
  margin-right: 5px;
  padding: 3px;
}
button {
  padding: 5px 10px;
}
pre {
  margin-top: 10px;
  background: #f9f9f9;
  padding: 10px;
}
</style>

// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import MostrarTodos from '@/views/MostrarTodos.vue'
import MostrarPorId from '@/views/MostrarPorId.vue'
import GuardarEstudiante from '@/views/GuardarEstudiante.vue'
import ActualizarEstudiante from '@/views/ActualizarEstudiante.vue'
import ActualizarParcial from '@/views/ActualizarParcial.vue'
import BorrarEstudiante from '@/views/BorrarEstudiante.vue'

const routes = [
  { path: '/', redirect: '/mostrar-todos' },
  { path: '/mostrar-todos', component: MostrarTodos },
  { path: '/mostrar-por-id', component: MostrarPorId },
  { path: '/guardar', component: GuardarEstudiante },
  { path: '/actualizar', component: ActualizarEstudiante },
  { path: '/actualizar-parcial', component: ActualizarParcial },
  { path: '/borrar', component: BorrarEstudiante }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

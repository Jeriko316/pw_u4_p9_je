// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import MostrarTodos from '@/views/MostrarTodos.vue'
import MostrarPorId from '@/views/MostrarPorId.vue'
import GuardarEstudiante from '@/views/GuardarEstudiante.vue'
import ActualizarEstudiante from '@/views/ActualizarEstudiante.vue'
import ActualizarParcial from '@/views/ActualizarParcial.vue'
import BorrarEstudiante from '@/views/BorrarEstudiante.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta:{requiereAutorizacion: true, esPublica: false} },
  { path: '/', redirect: '/mostrar-todos' },
  { path: '/mostrar-todos', meta:{requiereAutorizacion: true, esPublica: false} ,component: MostrarTodos },
  { path: '/mostrar-por-id',meta:{requiereAutorizacion: true, esPublica: false} , component: MostrarPorId },
  { path: '/guardar', component: GuardarEstudiante },
  { path: '/actualizar', component: ActualizarEstudiante },
  { path: '/actualizar-parcial', component: ActualizarParcial },
  { path: '/borrar', component: BorrarEstudiante }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/*COnfiguracion del Guardian */
router.beforeEach((to, from , next) =>{
    if(to.meta.requiereAutorizacion){
        /**le envio a una pagina de login */
        console.log("Requiere ir a Login")
    }else{
      /**le dejo sin validacion */
      console.log("pase libre")
      next();
    }
})

export default router

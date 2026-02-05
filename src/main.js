import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { authenticate, isAuthenticated } from './client/AuthClient'

// Pedir credenciales al iniciar la app y autenticar contra el backend
const usuario = window.prompt('Usuario:')
if (usuario) {
	const password = window.prompt('Contraseña:')
	authenticate(usuario.trim(), (password || '').trim())
		.then((tokenResp) => {
			console.log('Autenticación correcta:', tokenResp);
		})
		.catch((err) => {
			console.error('Autenticación fallida', err);
			window.alert('Autenticación fallida. Revisa credenciales o servidor de auth.');
		});
}

createApp(App).use(router).mount('#app')

import axios from "axios";

// Cliente de autenticación centralizado
const TOKEN_KEY = "matricula_token";

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

const saveToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    setAuthHeader(token);
    window.dispatchEvent(new CustomEvent("auth-changed", { detail: { authenticated: true } }));
  }
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  setAuthHeader(null);
  window.dispatchEvent(new CustomEvent("auth-changed", { detail: { authenticated: false } }));
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const isAuthenticated = () => {
  return !!getToken();
};

// Inicializar axios con token guardado
const _init = () => {
  const t = getToken();
  if (t) setAuthHeader(t);
};

// Autenticarse contra el backend de auth y guardar token
// Nota: /token va al proxy que redirige a http://localhost:8082/token
const authenticate = async (user, password) => {
  try {
    const url = "/token";  // Proxy lo redirige a http://localhost:8082/token
    console.log("🔐 Autenticando... URL:", url);
    console.log("   Credenciales: user=" + user + ", password=" + password);
    
    const response = await axios.get(url, {
      params: { user, password },
    });
    
    console.log("✅ Respuesta 200 OK:", response.data);
    
    const tokenResp = response.data;
    if (tokenResp && tokenResp.accessToken) {
      saveToken(tokenResp.accessToken);
      console.log("✅ Token guardado en localStorage");
      return tokenResp;
    }
    throw new Error("Respuesta de auth sin accessToken");
  } catch (error) {
    console.error("❌ Error en authenticate:");
    if (error.response) {
      console.error("  Status:", error.response.status);
      console.error("  Data:", error.response.data);
    } else {
      console.error("  Error:", error.message);
    }
    throw error;
  }
};

// Permite fijar el token manualmente (por ejemplo si ya lo obtuvo otra parte)
const setToken = (token) => {
  saveToken(token);
};

const logout = () => {
  removeToken();
};

_init();

export { authenticate, setToken, logout, getToken, isAuthenticated };

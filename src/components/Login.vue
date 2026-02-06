<template>
  <div class="login">
    <h2>Login</h2>
    <input v-model="usuario" type="text" placeholder="usuario">
    <input v-model="password" type="password" placeholder="contraseña">
    <button>Entrar</button>
  </div>
</template>

<script>
export default {

    data(){
        return {
            usuario:"",
            password:"",
        };
    },
    methods: {
        login(){
            /**mandar a obtener el token */
            const TOKEN ="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJtYXRyaWN1bGEtYXV0aCIsImF1ZCI6Im1hdHJpY3VsYSIsInN1YiI6ImprIiwidXNlciI6ImprIiwiZ3JvdXBzIjpbImFkbWluIl0sImV4cCI6MTc3MDQyNDY3MywiaWF0IjoxNzcwMzM4MjczLCJqdGkiOiI2ZWE4MGYyMy0zZDIzLTQwOGUtYjBiMi0yNThkNTFkZGZjYmMifQ.kL2qWh-vtgtYj3e-clp52zr4Iit6uQUlYjnfHITrJ9bEQi2tXoGkB5sYIcTsL5zDkDA52jtrgo85QwEAdq1NwVzHDGZkl9DzL0q4o4yyi2EO1cb3z6CeBfdV6xndyd0TMScNABoVa2HHCJspZbNeEiNVjNLsNizf-OhoIzfYWev5QKzPLJ9aISiv4fO_-rFfc_5B56ypuKnraIsWpkoq59CR74CsnzbORgubGBGnvCaIGOtrtuRbVy_oxEU3uLxj_2Qpl5GfwyIumkDh-cb4zmSjl93TixwGl4bCxpaqGAOjGnOsIfkExCYorhdX4_3BHfvDPk2GLcC7cT10FapZTA";
            if(TOKEN !=null){
                localStorage.setItem("token",TOKEN);
                localStorage.setItem("estaAutenticado", true)
            }else{
                console.log("Error de autenticacion")
            }
        }
    }
}
</script>

<style>
.login {
    width: 300px;
    margin: 100px;
    padding: 20px;
    border:1px solid #ddd;
    border-radius: 8px;
    text-align:  center;
    

}

input {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;

}

button {
    width: 100px;
    padding: 8px;
    cursor: pointer;
}
</style>
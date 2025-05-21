<template>
  <div>
    <h1>User Authentication</h1>

    <div v-if="isLoginPage">
      <form @submit.prevent="logIn">
        <input v-model="loginEmail" type="email" placeholder="Email" required />
        <input v-model="loginPassword" type="password" placeholder="Password" required />
        <button type="submit">Log In</button>
      </form>

      <p>Don't have an account? <a href="#" @click.prevent="togglePage">Sign Up</a></p>
    </div>

    <div v-else>
      <form @submit.prevent="signUp">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>

      <p>Already have an account? <a href="#" @click.prevent="togglePage">Log In</a></p>
    </div>

    <div v-if="errorMessage">
      <p style="color: red">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { supabase } from "@/services/supabase"

export default {
  data() {
    return {
      email: "",
      password: "",
      loginEmail: "",
      loginPassword: "",
      errorMessage: "",
      isLoginPage: true,
    }
  },
  methods: {
    togglePage() {
      this.isLoginPage = !this.isLoginPage
    },

    async signUp() {
      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
      })

      if (error) {
        this.errorMessage = error.message
      } else {
        this.errorMessage = ""
        this.$router.push("/home")
      }
    },

    async logIn() {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: this.loginEmail,
        password: this.loginPassword,
      })

      if (error) {
        this.errorMessage = error.message
      } else {
        this.errorMessage = ""
        this.$router.push("/home")
      }
    },
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 0 auto;
}

input {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin-top: 10px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

p {
  text-align: center;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>

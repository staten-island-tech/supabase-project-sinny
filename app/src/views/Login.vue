<template>
  <div>
    <h1>User Authentication</h1>

    <form @submit.prevent="logIn">
      <input v-model="loginEmail" type="email" placeholder="Email" required />
      <input v-model="loginPassword" type="password" placeholder="Password" required />
      <button type="submit">Log In</button>
    </form>

    <form @submit.prevent="signUp">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>

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
    }
  },
  methods: {
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

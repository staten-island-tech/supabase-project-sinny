<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Slot</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <button v-if="user" @click="logOut">Log Out</button>
    </nav>

    <RouterView />
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue"
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchUser()
})

const user = computed(() => authStore.user)

const logOut = async () => {
  await authStore.logOut()
}
</script>

<style scoped>
nav {
  margin-bottom: 20px;
}

nav a {
  margin-right: 10px;
  text-decoration: none;
  font-size: 16px;
  color: #000;
}

nav a:hover {
  color: #007bff;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #c82333;
}
</style>

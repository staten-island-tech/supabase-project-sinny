<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Slot</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<script setup></script>

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
</style>

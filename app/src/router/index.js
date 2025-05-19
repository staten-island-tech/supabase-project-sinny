import { createRouter, createWebHistory } from "vue-router"
import Login from "@/views/Login.vue"
import HomeView from "@/views/HomeView.vue"

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

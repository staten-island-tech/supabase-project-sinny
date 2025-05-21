import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import Login from "@/views/Login.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: {
      template: "<h1>404 - Page Not Found</h1>",
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

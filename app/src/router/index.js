import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import Login from "@/views/Login.vue"
import { supabase } from "@/services/supabase"

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


router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()
  const isAuthenticated = !!session
  const publicPages = ["/login"]

  if (!publicPages.includes(to.path) && !isAuthenticated) {
    next("/login")
  } else {
    next()
  }
})

export default router

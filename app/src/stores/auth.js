import { defineStore } from "pinia"
import { supabase } from "@/services/supabase"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      this.user = session?.user || null
    },
    setUser(user) {
      this.user = user
    },
    async logOut() {
      await supabase.auth.signOut()
      this.user = null
    },
  },
})

<template>
  <div>
    <h1>User Authentication</h1>

    <form @submit.prevent="signUp">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>

    <form @submit.prevent="logIn">
      <input v-model="loginEmail" type="email" placeholder="Email" required />
      <input v-model="loginPassword" type="password" placeholder="Password" required />
      <button type="submit">Log In</button>
    </form>

    <div v-if="user">
      <h2>Welcome, {{ user.email }}</h2>
      <form @submit.prevent="updateProfile">
        <textarea v-model="bio" placeholder="Bio"></textarea>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  </div>
</template>

<script>
import { supabase } from "../supabase"

export default {
  data() {
    return {
      email: "",
      password: "",
      loginEmail: "",
      loginPassword: "",
      user: null,
      bio: "",
    }
  },
  methods: {
    async signUp() {
      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
      })
      if (error) {
        console.error("Error signing up:", error)
      } else {
        this.user = data.user
        await this.createProfile(data.user.id)
      }
    },

    async logIn() {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: this.loginEmail,
        password: this.loginPassword,
      })
      if (error) {
        console.error("Error logging in:", error)
      } else {
        this.user = data.user
        await this.loadProfile(data.user.id)
      }
    },

    async createProfile(userId) {
      const { error } = await supabase.from("profiles").insert([{ user_id: userId, bio: this.bio }])
      if (error) {
        console.error("Error creating profile:", error)
      }
    },

    async loadProfile(userId) {
      const { data, error } = await supabase
        .from("profiles")
        .select("bio")
        .eq("user_id", userId)
        .single()
      if (error) {
        console.error("Error loading profile:", error)
      } else {
        this.bio = data.bio
      }
    },

    async updateProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .upsert({ user_id: this.user.id, bio: this.bio })
      if (error) {
        console.error("Error updating profile:", error)
      } else {
        console.log("Profile updated:", data)
      }
    },
  },
  async mounted() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    this.user = user
    if (user) {
      await this.loadProfile(user.id)
    }
  },
}
</script>

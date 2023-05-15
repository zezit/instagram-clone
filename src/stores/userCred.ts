import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import supabase from '../supabase'

export interface User {
  username: string,
  email: string,
  password: string,
  fName: string,
  lName: string
}

export const userCredentials = defineStore('userLog', () => {
  const user = ref<User | null>(null)

  const newUser = ref<boolean>(false)
  const errorMessage = ref<String>("")
  const dialog = ref<boolean>(false)
  const blurBackground = ref<boolean>(false)
  const isAuthenticated = ref<boolean>(false)


  const toggleDialog = (): void => {
    blurBackground.value = !blurBackground.value
    newUser.value = !blurBackground.value ? false : newUser.value
  }

  function validarSenha(senha: string): boolean {
    if (senha.length < 8) {
      errorMessage.value = "Password must contain at least 8 characters."
      return false
    }

    if (!/\d/.test(senha)) {
      errorMessage.value = "Password must contain at least 1 number."
      return false
    }

    if (!/[A-Z]/.test(senha)) {
      errorMessage.value = "Password must contain at least 1 uppercase letter."
      return false
    }

    if (!/[a-z]/.test(senha)) {
      errorMessage.value = "Password must contain at least 1 lowercase letter."
      return false
    }

    return true
  }

  function validateUsername(username: string): boolean {
    if (!username) {
      errorMessage.value = "Please enter a username!"
      return false
    }

    const regex = /^[a-zA-Z0-9._-]{3,16}$/ // Regex pattern for username validation
    if (!regex.test(username)) {
      errorMessage.value = "Username should contain only letters, numbers, dots, hyphens, and underscores, and be between 3 and 16 characters long."
      return false
    }
    return true
  }

  function validateEmail(email: string): boolean {
    if (!email) {
      errorMessage.value = "Please enter a email address!"
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errorMessage.value = "Please enter a valid email address!"
      return false
    }

    return true
  }

  function validarFName(fName: string): boolean {
    if (!fName) {
      errorMessage.value = "Please enter a first name!"
      return false
    }

    return true
  }

  function validarLName(lName: string): boolean {
    if (!lName) {
      errorMessage.value = "Please enter a last name!"
      return false
    }

    return true
  }

  const handleLogin = async (credentials: User): Promise<boolean> => {
    const { email, password } = credentials

    if (!validateEmail(email)) {
      return false
    }

    if (!validarSenha(password)) {
      return false
    }

    // try to login
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error) {
      errorMessage.value = error.message
      return false
    }

    errorMessage.value = ""
    newUser.value = false

    // atualizar user
    const { data } = await supabase
      .from('users')
      .select('username, fname, lname, email')
      .eq('email', email)
      .single()

    if (data) {
      user.value = {
        username: data.username,
        email: data.email,
        password: "",
        fName: data.fname,
        lName: data.lname
      }
    }

    return true
  }

  const handleSignup = async (credentials: User): Promise<boolean> => {
    const { username, email, password, fName, lName } = credentials

    if (!validateEmail(email)) {
      return false
    }

    if (!validateUsername(username)) {
      return false
    }

    if (!validarSenha(password)) {
      return false
    }

    if (!validarFName(fName)) {
      return false
    }

    if (!validarLName(lName)) {
      return false
    }

    // valida se o username já existe na base de dados
    const { data } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single()

    if (data) {
      errorMessage.value = "Username already exists!"
      return false
    }

    // valida se o email já existe na base de dados
    const { data: data2 } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()

    if (data2) {
      errorMessage.value = "Email already exists!"
      return false
    }

    const { error: error3 } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if (error3) {
      errorMessage.value = error3.message
      return false
    }

    await supabase.from("users").insert({
      username: username,
      fname: fName,
      lname: lName,
      email: email
    })

    return true
  }

  // prevent user from losing session on page refresh
  const handleLogout = async () => {
    const { data, error } = await supabase.auth.getSession()

    await supabase.auth.signOut()
    user.value = null
  }

  // get user on page load only if user didn't logout
  const getUser = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (data.session) {
      const { data: data2 } = await supabase
        .from('users')
        .select('username, fname, lname, email')
        .eq('email', data.session.user.email)
        .single()

      if (data2) {
        user.value = {
          username: data2.username,
          email: data.session.user.email ? data.session.user.email : "",
          password: "",
          fName: data2.fname,
          lName: data2.lname
        }
      }
    }
  }

  return { user, handleLogin, handleSignup, handleLogout, getUser, errorMessage, newUser, dialog, blurBackground, toggleDialog }
})

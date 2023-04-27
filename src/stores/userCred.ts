import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
interface User {
  username: string,
  email: string,
  password: string
}

export const userCredentials = defineStore('userLog', () => {
  const user = ref<User | null>(null)
  const errorMessage = ref<String>("")

  function validarSenha(senha: string): boolean {
    if (senha.length < 8) {
      errorMessage.value = "Password must contain at least 8 characters.";
      return false;
    }

    if (!/\d/.test(senha)) {
      errorMessage.value = "Password must contain at least 1 number.";
      return false;
    }

    if (!/[A-Z]/.test(senha)) {
      errorMessage.value = "Password must contain at least 1 uppercase letter.";
      return false;
    }

    if (!/[a-z]/.test(senha)) {
      errorMessage.value = "Password must contain at least 1 lowercase letter.";
      return false;
    }

    return true;
  }

  function validateUsername(username: string): boolean {
    const regex = /^[a-zA-Z0-9._-]{3,16}$/; // Regex pattern for username validation
    if (!regex.test(username)) {
      errorMessage.value = "Username should contain only letters, numbers, dots, hyphens, and underscores, and be between 3 and 16 characters long.";
      return false;
    }
    return true;
  }

  function validateEmail(email: string): boolean {
    if (!email) {
      errorMessage.value = "Please enter a valid email address!";
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    return true;
  }


  const handleLogin = () => { }

  const handleSignup = (credentials: User) => {
    const { username, email, password } = credentials

    if (!validarSenha(password)) {
      return;
    }

    if (!validateUsername(username)) {
      return;
    }

    if (!validateEmail(username)) {
      return;
    }


  }

  const handleLogout = () => { }

  const getUser = () => { }

  return { user, handleLogin, handleSignup, handleLogout, getUser, errorMessage }
})

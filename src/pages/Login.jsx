import { useState } from "react"
import { supabase } from "../services/supabase"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  async function entrar(e) {

    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    })

    if (error) {
      alert(error.message)
      return
    }

    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">

      <form
        onSubmit={entrar}
        className="bg-white p-8 rounded-3xl w-full max-w-sm shadow"
      >

        <h1 className="text-3xl font-black mb-6 text-center">
          Admin
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-3 rounded-xl mb-4"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold"
        >
          Entrar
        </button>

      </form>
    </div>
  )
}
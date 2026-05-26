import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"

export default function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {

    async function verificar() {

      const {
        data: { session }
      } = await supabase.auth.getSession()

      setSession(session)
      setLoading(false)
    }

    verificar()

    const {
      data: listener
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        setSession(session)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }

  }, [])

  // CARREGANDO
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    )
  }

  // NÃO LOGADO
  if (!session) {
    return <Navigate to="/login" replace />
  }

  // LOGADO
  return children
}
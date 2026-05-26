import {
  Home,
  Package,
  PlusCircle,
  ShoppingBag,
  LogOut,
} from "lucide-react"

import { Link, useNavigate } from "react-router-dom"

import { supabase } from "../services/supabase"

export default function Sidebar() {

  const navigate = useNavigate()

  async function sair() {

    await supabase.auth.signOut()

    navigate("/login")
  }

  return (
    <div className="w-64 min-h-screen bg-white border-r border-zinc-200 p-6 flex flex-col justify-between">

      <div>

        <h1 className="text-3xl font-bold text-orange-500 mb-10">
          Plantão Admin
        </h1>

        <nav className="flex flex-col gap-3">

          {/* DASHBOARD */}
          <Link
            to="/dashboard"
            className="flex items-center gap-3 text-zinc-700 hover:bg-orange-50 hover:text-orange-500 transition p-3 rounded-xl"
          >
            <Home size={20} />
            Dashboard
          </Link>

          {/* PRODUTOS */}
          <Link
            to="/produtos"
            className="flex items-center gap-3 text-zinc-700 hover:bg-orange-50 hover:text-orange-500 transition p-3 rounded-xl"
          >
            <Package size={20} />
            Produtos
          </Link>

          {/* ADICIONAIS */}
          <Link
            to="/adicionais"
            className="flex items-center gap-3 text-zinc-700 hover:bg-orange-50 hover:text-orange-500 transition p-3 rounded-xl"
          >
            <PlusCircle size={20} />
            Adicionais
          </Link>

          {/* PEDIDOS */}
          <Link
            to="/pedidos"
            className="flex items-center gap-3 text-zinc-700 hover:bg-orange-50 hover:text-orange-500 transition p-3 rounded-xl"
          >
            <ShoppingBag size={20} />
            Pedidos
          </Link>

        </nav>

      </div>

      {/* SAIR */}
      <button
        onClick={sair}
        className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white transition p-3 rounded-xl"
      >
        <LogOut size={20} />
        Sair
      </button>

    </div>
  )
}
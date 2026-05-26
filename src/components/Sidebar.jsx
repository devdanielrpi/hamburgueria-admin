import {
  Home,
  Package,
  PlusCircle,
  ShoppingBag,
  LogOut,
  Menu,
  X,
} from "lucide-react"

import {
  Link,
  useNavigate
} from "react-router-dom"

import { useState } from "react"

import { supabase } from "../services/supabase"

export default function Sidebar() {

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  async function sair() {

    await supabase.auth.signOut()

    navigate("/login")
  }

  return (
    <>

      {/* BOTÃO MOBILE */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white border border-zinc-200 p-2 rounded-xl shadow"
      >
        <Menu size={24} />
      </button>

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:relative z-50
          w-64 min-h-screen
          bg-white border-r border-zinc-200
          p-6 flex flex-col justify-between
          transition-all duration-300

          ${open
            ? "left-0"
            : "-left-72 lg:left-0"
          }
        `}
      >

        <div>

          {/* TOPO */}
          <div className="flex items-center justify-between mb-10">

            <h1 className="text-2xl md:text-3xl font-bold text-orange-500">
              Plantão Admin
            </h1>

            {/* FECHAR MOBILE */}
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden"
            >
              <X size={24} />
            </button>

          </div>

          {/* MENU */}
          <nav className="flex flex-col gap-3">

            {/* DASHBOARD */}
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-zinc-700 hover:bg-orange-50 hover:text-orange-500 transition p-3 rounded-xl"
            >
              <Home size={20} />
              Dashboard
            </Link>

            {/* PRODUTOS */}
            <Link
              to="/produtos"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-zinc-700 hover:bg-orange-50 hover:text-orange-500 transition p-3 rounded-xl"
            >
              <Package size={20} />
              Produtos
            </Link>

            {/* ADICIONAIS */}
            <Link
              to="/adicionais"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-zinc-700 hover:bg-orange-50 hover:text-orange-500 transition p-3 rounded-xl"
            >
              <PlusCircle size={20} />
              Adicionais
            </Link>

            {/* PEDIDOS */}
            <Link
              to="/pedidos"
              onClick={() => setOpen(false)}
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
          className="flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white transition p-3 rounded-xl mt-10"
        >
          <LogOut size={20} />
          Sair
        </button>

      </div>

    </>
  )
}
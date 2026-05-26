import { useEffect, useState } from "react"

import AdminLayout from "../layouts/AdminLayout"

import {
  ShoppingBag,
  DollarSign,
  Package,
  Users,
} from "lucide-react"

import { supabase } from "../services/supabase"

export default function Dashboard() {

  const [pedidosHoje, setPedidosHoje] = useState(0)
  const [faturamentoHoje, setFaturamentoHoje] = useState(0)
  const [produtosTotal, setProdutosTotal] = useState(0)
  const [clientesHoje, setClientesHoje] = useState(0)

  // =========================
  // DASHBOARD
  // =========================
  async function loadDashboard() {

    // DATA HOJE
    const hoje = new Date()

    hoje.setHours(0, 0, 0, 0)

    // =========================
    // PEDIDOS
    // =========================
    const { data: pedidos } = await supabase
      .from("pedidos")
      .select("*")

    const pedidosHojeLista =
      (pedidos || []).filter(p => {

        if (!p.created_at) return false

        const dataPedido = new Date(p.created_at)

        return dataPedido >= hoje
      })

    setPedidosHoje(pedidosHojeLista.length)

    // =========================
    // FATURAMENTO
    // =========================
    const total = pedidosHojeLista.reduce(
      (acc, pedido) =>
        acc + Number(pedido.total || 0),
      0
    )

    setFaturamentoHoje(total)

    // =========================
    // CLIENTES ÚNICOS
    // =========================
    const clientesUnicos = [
      ...new Set(
        pedidosHojeLista.map(p => p.whatsapp)
      )
    ]

    setClientesHoje(clientesUnicos.length)

    // =========================
    // PRODUTOS
    // =========================
    const { data: produtos } = await supabase
      .from("produtos")
      .select("*")

    setProdutosTotal(produtos?.length || 0)
  }

  // =========================
  // LOAD
  // =========================
 useEffect(() => {

  async function carregar() {
    await loadDashboard()
  }

  carregar()

}, [])
  return (
    <AdminLayout>

      <div className="space-y-6">

        {/* TOPO */}
        <div>

          <h1 className="text-2xl md:text-4xl font-bold text-zinc-800">
            Dashboard
          </h1>

          <p className="text-zinc-500 mt-2 text-sm md:text-base">
            Bem-vindo ao painel da hamburgueria
          </p>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">

          {/* PEDIDOS */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-zinc-200">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-zinc-500 text-sm">
                  Pedidos Hoje
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 mt-2">
                  {pedidosHoje}
                </h2>

              </div>

              <div className="bg-orange-100 p-3 md:p-4 rounded-2xl">
                <ShoppingBag
                  className="text-orange-500"
                  size={24}
                />
              </div>

            </div>

          </div>

          {/* FATURAMENTO */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-zinc-200">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-zinc-500 text-sm">
                  Faturamento
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 mt-2">
                  R$ {faturamentoHoje.toFixed(2)}
                </h2>

              </div>

              <div className="bg-green-100 p-3 md:p-4 rounded-2xl">
                <DollarSign
                  className="text-green-500"
                  size={24}
                />
              </div>

            </div>

          </div>

          {/* PRODUTOS */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-zinc-200">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-zinc-500 text-sm">
                  Produtos
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 mt-2">
                  {produtosTotal}
                </h2>

              </div>

              <div className="bg-blue-100 p-3 md:p-4 rounded-2xl">
                <Package
                  className="text-blue-500"
                  size={24}
                />
              </div>

            </div>

          </div>

          {/* CLIENTES */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-zinc-200">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-zinc-500 text-sm">
                  Clientes Hoje
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 mt-2">
                  {clientesHoje}
                </h2>

              </div>

              <div className="bg-pink-100 p-3 md:p-4 rounded-2xl">
                <Users
                  className="text-pink-500"
                  size={24}
                />
              </div>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  )
}
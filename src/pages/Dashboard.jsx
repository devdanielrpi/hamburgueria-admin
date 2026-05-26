import AdminLayout from "../layouts/AdminLayout"

import {
  ShoppingBag,
  DollarSign,
  Package,
  Users,
} from "lucide-react"

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-zinc-800">
            Dashboard
          </h1>

          <p className="text-zinc-500 mt-2">
            Bem-vindo ao painel da hamburgueria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-zinc-500 text-sm">
                  Pedidos Hoje
                </p>

                <h2 className="text-3xl font-bold text-zinc-800 mt-2">
                  18
                </h2>
              </div>

              <div className="bg-orange-100 p-4 rounded-2xl">
                <ShoppingBag className="text-orange-500" size={28} />
              </div>

            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-zinc-500 text-sm">
                  Faturamento
                </p>

                <h2 className="text-3xl font-bold text-zinc-800 mt-2">
                  R$ 1.240
                </h2>
              </div>

              <div className="bg-green-100 p-4 rounded-2xl">
                <DollarSign className="text-green-500" size={28} />
              </div>

            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-zinc-500 text-sm">
                  Produtos
                </p>

                <h2 className="text-3xl font-bold text-zinc-800 mt-2">
                  24
                </h2>
              </div>

              <div className="bg-blue-100 p-4 rounded-2xl">
                <Package className="text-blue-500" size={28} />
              </div>

            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-zinc-500 text-sm">
                  Clientes
                </p>

                <h2 className="text-3xl font-bold text-zinc-800 mt-2">
                  86
                </h2>
              </div>

              <div className="bg-pink-100 p-4 rounded-2xl">
                <Users className="text-pink-500" size={28} />
              </div>

            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  )
}
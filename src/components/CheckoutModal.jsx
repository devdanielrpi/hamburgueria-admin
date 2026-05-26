import { useState } from "react"
import { X } from "lucide-react"

export default function CheckoutModal({
  open,
  onClose,
  carrinho,
  total,
  setCarrinho,
}) {

  const [cliente, setCliente] =
    useState("")

  const [whatsapp, setWhatsapp] =
    useState("")

  const [endereco, setEndereco] =
    useState("")

  const [observacao, setObservacao] =
    useState("")

  const [pagamento, setPagamento] =
    useState("Dinheiro")

  if (!open) return null

  function finalizarPedido() {

    const pedidos =
      JSON.parse(
        localStorage.getItem("pedidos")
      ) || []

    const novoPedido = {
      id: Date.now(),
      cliente,
      whatsapp,
      endereco,
      observacao,
      pagamento,
      itens: carrinho,
      total,
      status: "Novo",
      data: new Date().toLocaleString(),
    }

    pedidos.push(novoPedido)

    localStorage.setItem(
      "pedidos",
      JSON.stringify(pedidos)
    )

    localStorage.removeItem("carrinho")

    setCarrinho([])

    alert("Pedido realizado!")

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-xl rounded-3xl p-6 max-h-[95vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-black text-zinc-800">
            Finalizar Pedido
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center"
          >
            <X />
          </button>

        </div>

        <div className="space-y-5">

          <input
            value={cliente}
            onChange={(e) =>
              setCliente(e.target.value)
            }
            placeholder="Nome do cliente"
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            value={whatsapp}
            onChange={(e) =>
              setWhatsapp(e.target.value)
            }
            placeholder="WhatsApp"
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            value={endereco}
            onChange={(e) =>
              setEndereco(e.target.value)
            }
            placeholder="Endereço"
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none"
          />

          <textarea
            value={observacao}
            onChange={(e) =>
              setObservacao(e.target.value)
            }
            placeholder="Observação"
            rows={4}
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none resize-none"
          />

          <select
            value={pagamento}
            onChange={(e) =>
              setPagamento(e.target.value)
            }
            className="w-full border border-zinc-300 rounded-2xl px-5 py-4 outline-none"
          >

            <option>Dinheiro</option>
            <option>Pix</option>
            <option>Cartão</option>

          </select>

        </div>

        <div className="mt-8 flex items-center justify-between">

          <span className="text-xl text-zinc-600">
            Total
          </span>

          <h3 className="text-4xl font-black text-orange-500">

            R$ {total.toFixed(2)}

          </h3>

        </div>

        <button
          onClick={finalizarPedido}
          className="w-full mt-8 bg-green-500 hover:bg-green-600 transition text-white py-4 rounded-2xl text-xl font-bold"
        >

          Confirmar Pedido

        </button>

      </div>

    </div>
  )
}
import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"

import AdminLayout from "../layouts/AdminLayout"

import {
  Trash2
} from "lucide-react"

export default function Pedidos() {

  // =========================
  // PEDIDOS
  // =========================
  const [pedidos, setPedidos] = useState([])

  // =========================
  // FILTROS
  // =========================
  const hoje = new Date().toISOString().split("T")[0]

  const [filtroStatus, setFiltroStatus] = useState("Todos")
  const [filtroData, setFiltroData] = useState(hoje)

  // =========================
  // PRODUTOS / ADICIONAIS
  // =========================
  const [produtos, setProdutos] = useState([])
  const [adicionais, setAdicionais] = useState([])

  // =========================
  // MODAIS
  // =========================
  const [modalNovo, setModalNovo] = useState(false)
  const [pedidoSel, setPedidoSel] = useState(null)

  // =========================
  // NOVO PEDIDO
  // =========================
  const [novo, setNovo] = useState({
    cliente: "",
    whatsapp: "",
    endereco: "",
    pagamento: "PIX",
    observacao: ""
  })

  const [itens, setItens] = useState([])

  // =========================
  // LOAD
  // =========================
  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    loadPedidos()
  }, [filtroStatus, filtroData])

  // =========================
  // LOAD PRODUTOS
  // =========================
  async function load() {

    const { data: p } = await supabase
      .from("produtos")
      .select("*")

    const { data: a } = await supabase
      .from("adicionais")
      .select("*")

    setProdutos(p || [])
    setAdicionais(a || [])
  }

  // =========================
  // LOAD PEDIDOS
  // =========================
  async function loadPedidos() {

    let query = supabase
      .from("pedidos")
      .select("*")
      .order("id", { ascending: false })

    if (filtroStatus !== "Todos") {
      query = query.eq("status", filtroStatus)
    }

    if (filtroData) {

      query = query
        .gte(
          "created_at",
          `${filtroData}T00:00:00`
        )
        .lte(
          "created_at",
          `${filtroData}T23:59:59`
        )
    }

    const { data, error } = await query

    if (error) {
      console.log(error)
      return
    }

    setPedidos(data || [])
  }

  // =========================
  // ADD ITEM
  // =========================
  function addItem(produto) {

    setItens(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        produto,
        quantidade: 1,
        adicionais: [],
        observacao: ""
      }
    ])
  }

  // =========================
  // REMOVER ITEM
  // =========================
  function removerItem(id) {

    setItens(prev =>
      prev.filter(i => i.id !== id)
    )
  }

  // =========================
  // QTD
  // =========================
  function changeQtd(id, val) {

    setItens(prev =>
      prev.map(i => {

        if (i.id !== id) return i

        return {
          ...i,
          quantidade: Math.max(
            1,
            i.quantidade + val
          )
        }
      })
    )
  }

  // =========================
  // ADICIONAIS
  // =========================
  function toggleAdicional(itemId, ad) {

    setItens(prev =>
      prev.map(i => {

        if (i.id !== itemId) return i

        const exists =
          i.adicionais.some(
            a => a.id === ad.id
          )

        return {
          ...i,
          adicionais: exists
            ? i.adicionais.filter(
                a => a.id !== ad.id
              )
            : [...i.adicionais, ad]
        }
      })
    )
  }

  // =========================
  // OBS
  // =========================
  function setObs(itemId, text) {

    setItens(prev =>
      prev.map(i =>
        i.id === itemId
          ? {
              ...i,
              observacao: text
            }
          : i
      )
    )
  }

  // =========================
  // TOTAL
  // =========================
  function totalPedido() {

    return itens.reduce((acc, item) => {

      const qtd = Number(item.quantidade)

      const base =
        Number(item.produto.preco) * qtd

      const adicionaisTotal =
        item.adicionais.reduce(
          (a, ad) =>
            a + Number(ad.preco || 0),
          0
        ) * qtd

      return acc + base + adicionaisTotal

    }, 0)
  }

  // =========================
  // IMPRESSÃO
  // =========================
  function imprimir(pedido) {

    const ESC = "\x1B"
    const GS = "\x1D"

    let txt = ""

    txt += ESC + "@"
    txt += ESC + "a" + "\x01"

    txt += "HAMBURGUERIA\n"
    txt += "====================\n\n"

    txt += ESC + "a" + "\x00"

    txt += `Pedido: ${pedido.id}\n`
    txt += `Cliente: ${pedido.cliente}\n`
    txt += `WhatsApp: ${pedido.whatsapp}\n`
    txt += `Endereço: ${pedido.endereco}\n`
    txt += `Pagamento: ${pedido.pagamento}\n`

    txt += "--------------------\n"

    pedido.itens.forEach(i => {

      txt += `${i.quantidade}x ${i.produto.nome}\n`

      i.adicionais.forEach(ad => {
        txt += ` + ${ad.nome}\n`
      })

      if (i.observacao) {
        txt += ` Obs: ${i.observacao}\n`
      }

      txt += "\n"
    })

    txt += "--------------------\n"

    txt += ESC + "E" + "\x01"
    txt += `TOTAL: R$ ${Number(pedido.total).toFixed(2)}\n`
    txt += ESC + "E" + "\x00"

    txt += "\n\n"
    txt += GS + "V" + "\x00"

    const encoded =
      btoa(unescape(encodeURIComponent(txt)))

    window.open(`rawbt:base64,${encoded}`, "_self")
  }

  // =========================
  // CRIAR PEDIDO
  // =========================
  async function criarPedido() {

    if (
      !novo.cliente ||
      !novo.whatsapp ||
      itens.length === 0
    ) {
      alert(
        "Preencha cliente, WhatsApp e adicione produtos"
      )
      return
    }

    const pedido = {
      cliente: novo.cliente,
      whatsapp: novo.whatsapp,
      endereco: novo.endereco,
      pagamento: novo.pagamento,
      observacao: novo.observacao,
      status: "Novo",
      total: totalPedido(),
      itens
    }

    const { data, error } = await supabase
      .from("pedidos")
      .insert([pedido])
      .select()
      .single()

    if (error) {
      console.log(error)
      alert(error.message)
      return
    }

    await loadPedidos()

    setItens([])

    setNovo({
      cliente: "",
      whatsapp: "",
      endereco: "",
      pagamento: "PIX",
      observacao: ""
    })

    setModalNovo(false)

    setTimeout(() => {
      imprimir(data)
    }, 400)
  }

  // =========================
  // STATUS
  // =========================
  async function alterarStatus(id, status) {

    const { error } = await supabase
      .from("pedidos")
      .update({ status })
      .eq("id", id)

    if (error) {
      console.log(error)
      return
    }

    await loadPedidos()

    if (pedidoSel?.id === id) {
      setPedidoSel({
        ...pedidoSel,
        status
      })
    }
  }

  // =========================
  // COR STATUS
  // =========================
  function corStatus(status) {

    switch (status) {

      case "Novo":
        return "bg-blue-100 text-blue-700"

      case "Preparando":
        return "bg-yellow-100 text-yellow-700"

      case "Saiu para entrega":
        return "bg-purple-100 text-purple-700"

      case "Finalizado":
        return "bg-green-100 text-green-700"

      default:
        return "bg-zinc-100"
    }
  }

  // =========================
  // UI
  // =========================
  return (
    <AdminLayout>

      <div className="p-4 md:p-6 bg-zinc-100 min-h-screen">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

          <h1 className="text-2xl md:text-3xl font-black">
            Pedidos
          </h1>

          <button
            onClick={() => setModalNovo(true)}
            className="bg-orange-500 text-white px-5 py-3 rounded-xl"
          >
            Novo Pedido
          </button>

        </div>

        {/* FILTROS */}
        <div className="bg-white p-4 rounded-2xl mb-5 flex flex-col md:flex-row gap-3">

          <input
            type="date"
            value={filtroData}
            onChange={(e) =>
              setFiltroData(e.target.value)
            }
            className="border p-3 rounded-xl"
          />

          <select
            value={filtroStatus}
            onChange={(e) =>
              setFiltroStatus(e.target.value)
            }
            className="border p-3 rounded-xl"
          >
            <option>Todos</option>
            <option>Novo</option>
            <option>Preparando</option>
            <option>Saiu para entrega</option>
            <option>Finalizado</option>
          </select>

        </div>

        {/* LISTA */}
        <div className="space-y-3">

          {pedidos.map(p => (

            <div
              key={p.id}
              className="bg-white p-4 rounded-2xl flex flex-col md:flex-row md:justify-between md:items-center gap-4"
            >

              <div>

                <h2 className="font-bold text-lg">
                  {p.cliente}
                </h2>

                <p className="text-sm text-zinc-500">
                  {p.whatsapp}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-xl text-xs ${corStatus(p.status)}`}
                >
                  {p.status}
                </span>

              </div>

              <div className="md:text-right">

                <p className="font-bold text-orange-500 text-lg">
                  R$ {Number(p.total).toFixed(2)}
                </p>

                <button
                  onClick={() => setPedidoSel(p)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-xl mt-2 w-full md:w-auto"
                >
                  Abrir
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* MODAL NOVO */}
        {modalNovo && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

            <div className="bg-white w-full max-w-2xl rounded-3xl p-6 max-h-[90vh] overflow-y-auto">

              <h2 className="text-xl font-bold mb-3">
                Novo Pedido
              </h2>

              <input
                placeholder="Cliente"
                className="w-full border p-3 mb-2 rounded-xl"
                value={novo.cliente}
                onChange={e =>
                  setNovo({
                    ...novo,
                    cliente: e.target.value
                  })
                }
              />

              <input
                placeholder="WhatsApp"
                className="w-full border p-3 mb-2 rounded-xl"
                value={novo.whatsapp}
                onChange={e =>
                  setNovo({
                    ...novo,
                    whatsapp: e.target.value
                  })
                }
              />

              <input
                placeholder="Endereço"
                className="w-full border p-3 mb-3 rounded-xl"
                value={novo.endereco}
                onChange={e =>
                  setNovo({
                    ...novo,
                    endereco: e.target.value
                  })
                }
              />

              {/* PRODUTOS */}
              <div className="mb-3">

                <h3 className="font-bold mb-2">
                  Produtos
                </h3>

                {produtos.map(p => (

                  <button
                    key={p.id}
                    onClick={() => addItem(p)}
                    className="block w-full text-left border p-3 mb-2 rounded-xl"
                  >
                    {p.nome} - R$ {p.preco}
                  </button>

                ))}

              </div>

              {/* ITENS */}
              <div className="mb-4 space-y-3">

                {itens.map(i => (

                  <div
                    key={i.id}
                    className="border p-3 rounded-xl"
                  >

                    <div className="flex justify-between items-start">

                      <b>{i.produto.nome}</b>

                      <button
                        onClick={() =>
                          removerItem(i.id)
                        }
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                    <div className="flex gap-2 items-center mt-3">

                      <button
                        onClick={() =>
                          changeQtd(i.id, -1)
                        }
                        className="bg-zinc-200 w-8 h-8 rounded-lg"
                      >
                        -
                      </button>

                      <span className="font-bold text-lg min-w-[30px] text-center">
                        {i.quantidade}
                      </span>

                      <button
                        onClick={() =>
                          changeQtd(i.id, 1)
                        }
                        className="bg-zinc-200 w-8 h-8 rounded-lg"
                      >
                        +
                      </button>

                    </div>

                    {/* ADICIONAIS */}
                    <div className="flex flex-wrap gap-2 mt-3">

                      {adicionais.map(ad => {

                        const ativo =
                          i.adicionais.some(
                            a => a.id === ad.id
                          )

                        return (

                          <button
                            key={ad.id}
                            onClick={() =>
                              toggleAdicional(i.id, ad)
                            }
                            className={`px-2 py-1 rounded-xl text-xs border ${
                              ativo
                                ? "bg-green-500 text-white"
                                : "bg-white"
                            }`}
                          >
                            {ad.nome}
                          </button>

                        )
                      })}

                    </div>

                    <textarea
                      placeholder="Observação..."
                      value={i.observacao}
                      onChange={(e) =>
                        setObs(i.id, e.target.value)
                      }
                      className="w-full border mt-3 p-2 rounded-xl text-sm"
                    />

                  </div>

                ))}

              </div>

              {/* RESUMO */}
              <div className="bg-zinc-50 p-4 rounded-2xl mb-4">

                <p>
                  <b>Cliente:</b> {novo.cliente || "-"}
                </p>

                <p>
                  <b>WhatsApp:</b> {novo.whatsapp || "-"}
                </p>

                <p>
                  <b>Endereço:</b> {novo.endereco || "-"}
                </p>

                <p className="text-xl font-bold text-orange-500 mt-2">
                  Total: R$ {totalPedido().toFixed(2)}
                </p>

              </div>

              {/* BOTÃO FINAL */}
              <button
                onClick={criarPedido}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-lg"
              >
                Criar Pedido • R$ {totalPedido().toFixed(2)}
              </button>

            </div>

          </div>
        )}

        {/* MODAL DETALHES */}
        {pedidoSel && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

            <div className="bg-white w-full max-w-xl p-6 rounded-3xl">

              <h2 className="text-xl font-bold">
                Pedido #{pedidoSel.id}
              </h2>

              <select
                value={pedidoSel.status}
                onChange={(e) =>
                  alterarStatus(
                    pedidoSel.id,
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-xl mt-3"
              >
                <option>Novo</option>
                <option>Preparando</option>
                <option>Saiu para entrega</option>
                <option>Finalizado</option>
              </select>

              <button
                onClick={() => imprimir(pedidoSel)}
                className="w-full bg-black text-white py-3 rounded-xl mt-4"
              >
                Imprimir Cupom
              </button>

              <button
                onClick={() => setPedidoSel(null)}
                className="w-full mt-2 bg-zinc-200 py-3 rounded-xl"
              >
                Fechar
              </button>

            </div>

          </div>
        )}

      </div>

    </AdminLayout>
  )
}
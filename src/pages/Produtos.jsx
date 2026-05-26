import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"

export default function Produtos() {

  const [produtos, setProdutos] =
    useState([])

  const [nome, setNome] =
    useState("")

  const [preco, setPreco] =
    useState("")

  const [categoria, setCategoria] =
    useState("Hambúrguer")

  const [aceitaAdicionais,
    setAceitaAdicionais] =
    useState(true)

  useEffect(() => {

    async function fetchProdutos() {

      const { data, error } =
        await supabase
          .from("produtos")
          .select("*")
          .order("id", {
            ascending: false,
          })

      if (!error) {

        setProdutos(data || [])
      }
    }

    fetchProdutos()

  }, [])

  async function adicionarProduto(e) {

    e.preventDefault()

    if (!nome || !preco)
      return

    const { error } =
      await supabase
        .from("produtos")
        .insert([
          {
            nome,
            preco: parseFloat(
            preco.replace(",", ".")
          ),
            categoria,
            aceita_adicionais:
              aceitaAdicionais,
          },
        ])
     console.log(error)
    if (!error) {

      setNome("")
      setPreco("")
      setCategoria("Hambúrguer")
      setAceitaAdicionais(true)

      window.location.reload()
    }
  }

  async function deletarProduto(id) {

    await supabase
      .from("produtos")
      .delete()
      .eq("id", id)

    window.location.reload()
  }

  return (
    <div className="p-8 bg-zinc-100 min-h-screen">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-4xl font-black text-zinc-800">
          Produtos
        </h1>

        <p className="text-zinc-500 mt-2">
          Gerencie os produtos
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={adicionarProduto}
        className="bg-white border border-zinc-200 rounded-3xl p-6 mb-8"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* NOME */}
          <input
            type="text"
            placeholder="Nome produto"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
            className="border border-zinc-300 rounded-2xl px-4 py-3 outline-none"
          />

          {/* PREÇO */}
          <input
            type="text"
            placeholder="Preço"
            value={preco}
            onChange={(e) =>
              setPreco(e.target.value)
            }
            className="border border-zinc-300 rounded-2xl px-4 py-3 outline-none"
          />

          {/* CATEGORIA */}
          <select
            value={categoria}
            onChange={(e) =>
              setCategoria(
                e.target.value
              )
            }
            className="border border-zinc-300 rounded-2xl px-4 py-3 outline-none"
          >

            <option>
              Hambúrguer
            </option>

            <option>
              Bebida
            </option>

            <option>
              Batata
            </option>

          </select>

          {/* ADICIONAIS */}
          <div className="border border-zinc-300 rounded-2xl px-4 py-3 flex items-center justify-between">

            <span className="text-zinc-700 font-medium">
              Aceita adicionais
            </span>

            <input
              type="checkbox"
              checked={aceitaAdicionais}
              onChange={(e) =>
                setAceitaAdicionais(
                  e.target.checked
                )
              }
              className="w-5 h-5"
            />

          </div>

        </div>

        <button
          type="submit"
          className="mt-5 bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-3 rounded-2xl font-bold"
        >

          Adicionar Produto

        </button>

      </form>

      {/* LISTA */}
      <div className="space-y-4">

        {produtos.map((produto) => (

          <div
            key={produto.id}
            className="bg-white border border-zinc-200 rounded-3xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          >

            <div>

              <h3 className="text-2xl font-black text-zinc-800">

                {produto.nome}

              </h3>

              <div className="flex flex-wrap items-center gap-3 mt-2">

                <span className="text-orange-500 font-bold">

                  R$ {produto.preco}

                </span>

                <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-xl text-sm">

                  {produto.categoria}

                </span>

                {produto.aceita_adicionais && (

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-sm font-semibold">

                    Aceita adicionais

                  </span>

                )}

              </div>

            </div>

            <button
              onClick={() =>
                deletarProduto(produto.id)
              }
              className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-2xl font-bold"
            >

              Excluir

            </button>

          </div>

        ))}

      </div>

    </div>
  )
}
import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"

export default function Adicionais() {

  const [adicionais, setAdicionais] =
    useState([])

  const [nome, setNome] =
    useState("")

  const [preco, setPreco] =
    useState("")

  useEffect(() => {

    async function fetchAdicionais() {

      const { data, error } =
        await supabase
          .from("adicionais")
          .select("*")
          .order("id", {
            ascending: false,
          })

      if (!error) {

        setAdicionais(data || [])
      }
    }

    fetchAdicionais()

  }, [])

  async function adicionar(e) {

    e.preventDefault()

    if (!nome || !preco)
      return

    const { error } =
      await supabase
        .from("adicionais")
        .insert([
          {
            nome,
           preco: parseFloat(
          preco.replace(",", ".")
        ),
          },
        ])

    if (!error) {

      setNome("")
      setPreco("")

      window.location.reload()
    }
  }

  async function deletar(id) {

    await supabase
      .from("adicionais")
      .delete()
      .eq("id", id)

    window.location.reload()
  }

  return (
    <div className="p-8 bg-zinc-100 min-h-screen">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-4xl font-black text-zinc-800">
          Adicionais
        </h1>

        <p className="text-zinc-500 mt-2">
          Gerencie os adicionais
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={adicionar}
        className="bg-white border border-zinc-200 rounded-3xl p-6 mb-8"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Nome adicional"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
            className="border border-zinc-300 rounded-2xl px-4 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="Preço"
            value={preco}
            onChange={(e) =>
              setPreco(e.target.value)
            }
            className="border border-zinc-300 rounded-2xl px-4 py-3 outline-none"
          />

        </div>

        <button
          type="submit"
          className="mt-5 bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-3 rounded-2xl font-bold"
        >

          Adicionar

        </button>

      </form>

      {/* LISTA */}
      <div className="space-y-4">

        {adicionais.map((item) => (

          <div
            key={item.id}
            className="bg-white border border-zinc-200 rounded-3xl p-5 flex items-center justify-between"
          >

            <div>

              <h3 className="text-2xl font-black text-zinc-800">

                {item.nome}

              </h3>

              <p className="text-orange-500 font-bold mt-1">

                R$ {item.preco}

              </p>

            </div>

            <button
              onClick={() =>
                deletar(item.id)
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
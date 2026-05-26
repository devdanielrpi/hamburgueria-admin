import { useEffect, useState } from "react"
import ProductViewModal from "../components/ProductViewModal"
import CarrinhoModal from "../components/CarrinhoModal"
import { supabase } from "../services/supabase"

export default function Cardapio() {

  const [categoriaSelecionada,
    setCategoriaSelecionada] =
    useState("Hambúrguer")

  const [openModal, setOpenModal] =
    useState(false)

  const [openCarrinho,
    setOpenCarrinho] =
    useState(false)

  const [produtoSelecionado,
    setProdutoSelecionado] =
    useState(null)

  const [produtos, setProdutos] =
    useState([])

  const [carrinho, setCarrinho] =
    useState(() => {

      const data =
        localStorage.getItem("carrinho")

      return data
        ? JSON.parse(data)
        : []
    })

  useEffect(() => {

    async function fetchProdutos() {

      const { data, error } =
        await supabase
          .from("produtos")
          .select("*")

      if (!error) {

        setProdutos(data || [])
      }
    }

    fetchProdutos()

  }, [])

  const produtosFiltrados =
    produtos.filter(
      (produto) =>
        produto.categoria ===
        categoriaSelecionada
    )

  const categorias = [
    "Hambúrguer",
    "Bebida",
    "Batata",
  ]

  return (
    <div className="min-h-screen bg-zinc-100">

      {/* HEADER */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">

        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-3">

          <div className="flex items-center justify-between gap-3">

            <div className="min-w-0">

              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-orange-500 truncate">
                Burger House
              </h1>

              <p className="text-zinc-500 text-[11px] sm:text-xs md:text-sm mt-1 truncate">
                Delivery • Hambúrguer Artesanal
              </p>

            </div>

            {/* BOTÃO DESKTOP */}
            <button
              onClick={() =>
                setOpenCarrinho(true)
              }
              className="hidden md:flex shrink-0 bg-orange-500 hover:bg-orange-600 transition text-white px-5 py-3 rounded-2xl font-semibold shadow-sm"
            >

              Carrinho ({carrinho.length})

            </button>

          </div>

        </div>

      </header>

      {/* BANNER */}
      <section className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 pt-4">

        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl p-5 sm:p-6 md:p-10 text-white overflow-hidden">

          <div className="max-w-xl">

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight">

              O melhor hambúrguer da cidade

            </h2>

            <p className="mt-3 text-orange-100 text-sm sm:text-base md:text-lg leading-relaxed">

              Monte seu pedido online de forma rápida e prática.

            </p>

          </div>

        </div>

      </section>

      {/* CATEGORIAS */}
      <section className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 mt-5">

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">

          {categorias.map((categoria) => (

            <button
              key={categoria}
              onClick={() =>
                setCategoriaSelecionada(categoria)
              }
              className={`
                shrink-0
                px-4 sm:px-5
                py-2.5 sm:py-3
                rounded-2xl
                font-semibold
                text-sm sm:text-base
                transition
                ${
                  categoriaSelecionada === categoria
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-zinc-200 text-zinc-700"
                }
              `}
            >

              {categoria}

            </button>

          ))}

        </div>

      </section>

      {/* CONTEÚDO */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6 pb-28">

        <div className="mb-5">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-800">

            {categoriaSelecionada}

          </h2>

          <p className="text-zinc-500 text-sm sm:text-base mt-2">
            Escolha seus produtos favoritos
          </p>

        </div>

        {/* SEM PRODUTOS */}
        {produtosFiltrados.length === 0 && (

          <div className="bg-white rounded-3xl border border-zinc-200 p-8 text-center">

            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-700">

              Nenhum produto encontrado

            </h3>

          </div>

        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">

          {produtosFiltrados.map((produto) => (

            <div
              key={produto.id}
              className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-md transition"
            >

              {/* IMAGEM */}
              <div className="h-40 sm:h-44 md:h-56 bg-zinc-200 flex items-center justify-center">

                <span className="text-zinc-500 text-xs sm:text-sm">
                  Imagem do Produto
                </span>

              </div>

              {/* INFO */}
              <div className="p-4 sm:p-5">

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-800 truncate">

                      {produto.nome}

                    </h3>

                    <p className="text-zinc-500 mt-1 text-xs sm:text-sm">

                      {produto.categoria}

                    </p>

                  </div>

                  <span className="shrink-0 bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-xl text-[10px] sm:text-xs font-semibold">

                    Disponível

                  </span>

                </div>

                <div className="mt-5 flex items-end justify-between gap-3">

                  <div className="min-w-0">

                    <p className="text-zinc-400 text-[10px] sm:text-xs">
                      A partir de
                    </p>

                    <h4 className="text-2xl sm:text-3xl font-black text-orange-500 mt-1 truncate">

                      R$ {Number(
                        produto.preco
                      ).toFixed(2)}

                    </h4>

                  </div>

                  <button
                    onClick={() => {

                      setProdutoSelecionado(produto)

                      setOpenModal(true)
                    }}
                    className="
                      shrink-0
                      bg-orange-500
                      hover:bg-orange-600
                      transition
                      text-white
                      px-4 sm:px-5
                      py-2.5 sm:py-3
                      rounded-2xl
                      font-bold
                      text-sm
                    "
                  >

                    Pedir

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </main>

      {/* BARRA MOBILE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-200 p-3">

        <button
          onClick={() =>
            setOpenCarrinho(true)
          }
          className="
            w-full
            bg-orange-500
            hover:bg-orange-600
            transition
            text-white
            py-4
            rounded-2xl
            font-bold
            text-base
            shadow-lg
          "
        >

          Ver Carrinho ({carrinho.length})

        </button>

      </div>

      {/* MODAL PRODUTO */}
      <ProductViewModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        produto={produtoSelecionado}
        onAddCarrinho={(item) => {

          const novoCarrinho = [
            ...carrinho,
            item,
          ]

          setCarrinho(novoCarrinho)

          localStorage.setItem(
            "carrinho",
            JSON.stringify(novoCarrinho)
          )

          setOpenModal(false)
        }}
      />

      {/* MODAL CARRINHO */}
      <CarrinhoModal
        open={openCarrinho}
        onClose={() =>
          setOpenCarrinho(false)
        }
        carrinho={carrinho}
        setCarrinho={setCarrinho}
      />

    </div>
  )
}
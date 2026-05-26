import { useState } from "react"
import { X } from "lucide-react"

export default function ProductViewModal({
  open,
  onClose,
  produto,
  onAddCarrinho,
}) {

  const [quantidade, setQuantidade] =
    useState(1)

  const adicionais = JSON.parse(
    localStorage.getItem("adicionais")
  ) || []

  const adicionaisAtivos =
    adicionais.filter(
      (item) => item.ativo
    )

  const [selecionados,
    setSelecionados] =
    useState([])

  if (!open || !produto)
    return null

  function toggleAdicional(adicional) {

    const existe =
      selecionados.find(
        (item) => item.id === adicional.id
      )

    if (existe) {

      setSelecionados(
        selecionados.filter(
          (item) => item.id !== adicional.id
        )
      )

    } else {

      setSelecionados([
        ...selecionados,
        adicional,
      ])
    }
  }

  const precoBase = parseFloat(
    produto.preco.replace("R$", "")
  )

const totalAdicionais =
  selecionados.reduce(
    (acc, item) => {

      const valor =
        parseFloat(
          String(item.valor)
            .replace("R$", "")
            .replace(",", ".")
        ) || 0

      return acc + valor

    },
    0
  )
  const total =
    (precoBase + totalAdicionais)
    * quantidade

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-end md:items-center justify-center">

      <div
        className="
          bg-white
          w-full
          md:max-w-lg
          rounded-t-3xl
          md:rounded-3xl
          overflow-hidden
          max-h-[92vh]
          overflow-y-auto
          animate-in
        "
      >

        {/* IMAGEM */}
        <div className="relative h-52 sm:h-60 bg-zinc-200 flex items-center justify-center">

          <button
            onClick={onClose}
            className="
              absolute
              top-4
              right-4
              bg-white/90
              backdrop-blur
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
              shadow
            "
          >
            <X size={20} />
          </button>

          <span className="text-zinc-500">
            Imagem do Produto
          </span>

        </div>

        {/* CONTEÚDO */}
        <div className="p-5 sm:p-6">

          {/* INFO */}
          <div>

            <h2 className="text-2xl sm:text-3xl font-black text-zinc-800">

              {produto.nome}

            </h2>

            <p className="text-zinc-500 mt-2 text-sm sm:text-base">

              {produto.categoria}

            </p>

            <h3 className="text-3xl sm:text-4xl font-black text-orange-500 mt-4">

              R$ {total.toFixed(2)}

            </h3>

          </div>

          {/* ADICIONAIS */}
          {adicionaisAtivos.length > 0 && (

            <div className="mt-8">

              <h3 className="text-lg font-bold text-zinc-800 mb-4">
                Adicionais
              </h3>

              <div className="space-y-3">

                {adicionaisAtivos.map(
                  (adicional) => {

                    const ativo =
                      selecionados.find(
                        (item) =>
                          item.id === adicional.id
                      )

                    return (

                      <button
                        key={adicional.id}
                        onClick={() =>
                          toggleAdicional(adicional)
                        }
                        className={`
                          w-full
                          flex
                          items-center
                          justify-between
                          p-4
                          rounded-2xl
                          border
                          transition
                          ${
                            ativo
                              ? "border-orange-500 bg-orange-50"
                              : "border-zinc-200 bg-white"
                          }
                        `}
                      >

                        <div className="text-left">

                          <h4 className="font-semibold text-zinc-800 text-sm sm:text-base">

                            {adicional.nome}

                          </h4>

                          <p className="text-orange-500 font-bold text-sm mt-1">

                            + R$ {
  parseFloat(
    String(adicional.valor)
      .replace("R$", "")
      .replace(",", ".")
  ).toFixed(2)
}

                          </p>

                        </div>

                        <div
                          className={`
                            w-6
                            h-6
                            rounded-full
                            border-2
                            flex
                            items-center
                            justify-center
                            ${
                              ativo
                                ? "bg-orange-500 border-orange-500"
                                : "border-zinc-300"
                            }
                          `}
                        >

                          {ativo && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}

                        </div>

                      </button>

                    )
                  }
                )}

              </div>

            </div>

          )}

          {/* QUANTIDADE */}
          <div className="mt-8 flex items-center justify-between">

            <span className="font-bold text-zinc-800">
              Quantidade
            </span>

            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  quantidade > 1 &&
                  setQuantidade(
                    quantidade - 1
                  )
                }
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-zinc-100
                  text-xl
                  font-bold
                "
              >
                -
              </button>

              <span className="text-xl font-bold w-8 text-center">

                {quantidade}

              </span>

              <button
                onClick={() =>
                  setQuantidade(
                    quantidade + 1
                  )
                }
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-orange-500
                  text-white
                  text-xl
                  font-bold
                "
              >
                +
              </button>

            </div>

          </div>

          {/* BOTÃO */}
          <button
            onClick={() => {

              onAddCarrinho({
                produto,
                adicionais:
                  selecionados,
                quantidade,
                total,
              })

              setQuantidade(1)

              setSelecionados([])
            }}
            className="
              w-full
              mt-8
              bg-orange-500
              hover:bg-orange-600
              transition
              text-white
              py-4
              rounded-2xl
              text-lg
              font-bold
              shadow-lg
            "
          >

            Adicionar ao Carrinho

          </button>

        </div>

      </div>

    </div>
  )
}
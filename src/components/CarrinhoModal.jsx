import { useState } from "react"
import { X, Trash2 } from "lucide-react"
import CheckoutModal from "./CheckoutModal"

export default function CarrinhoModal({
  open,
  onClose,
  carrinho,
  setCarrinho,
}) {

  const [openCheckout, setOpenCheckout] =
    useState(false)

  if (!open) return null

  const total = carrinho.reduce(
    (acc, item) => acc + item.total,
    0
  )

  function removerItem(index) {

    const novoCarrinho =
      carrinho.filter(
        (_, i) => i !== index
      )

    setCarrinho(novoCarrinho)

    localStorage.setItem(
      "carrinho",
      JSON.stringify(novoCarrinho)
    )
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">

        <div className="bg-white w-full max-w-xl h-screen overflow-y-auto">

          {/* HEADER */}
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between sticky top-0 bg-white z-10">

            <h2 className="text-3xl font-black text-zinc-800">
              Carrinho
            </h2>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center"
            >
              <X />
            </button>

          </div>

          {/* ITENS */}
          <div className="p-6 space-y-5">

            {carrinho.length === 0 && (

              <div className="text-center py-20">

                <h3 className="text-2xl font-bold text-zinc-700">
                  Carrinho vazio
                </h3>

                <p className="text-zinc-500 mt-2">
                  Adicione produtos ao carrinho
                </p>

              </div>

            )}

            {carrinho.map((item, index) => (

              <div
                key={index}
                className="bg-zinc-50 border border-zinc-200 rounded-3xl p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h3 className="text-2xl font-bold text-zinc-800">

                      {item.quantidade}x {item.produto.nome}

                    </h3>

                    {item.adicionais.length > 0 && (

                      <div className="mt-3 space-y-1">

                        {item.adicionais.map((adicional) => (

                          <p
                            key={adicional.id}
                            className="text-zinc-500"
                          >
                            + {adicional.nome}
                          </p>

                        ))}

                      </div>

                    )}

                  </div>

                  <button
                    onClick={() =>
                      removerItem(index)
                    }
                    className="text-red-500"
                  >
                    <Trash2 />
                  </button>

                </div>

                <div className="mt-5 flex items-center justify-between">

                  <span className="text-zinc-500">
                    Total item
                  </span>

                  <h4 className="text-2xl font-black text-orange-500">

                    R$ {item.total.toFixed(2)}

                  </h4>

                </div>

              </div>

            ))}

          </div>

          {/* FOOTER */}
          {carrinho.length > 0 && (

            <div className="border-t border-zinc-200 p-6 sticky bottom-0 bg-white">

              <div className="flex items-center justify-between mb-5">

                <span className="text-xl text-zinc-600">
                  Total
                </span>

                <h3 className="text-4xl font-black text-orange-500">

                  R$ {total.toFixed(2)}

                </h3>

              </div>

              <button
                onClick={() =>
                  setOpenCheckout(true)
                }
                className="w-full bg-green-500 hover:bg-green-600 transition text-white py-4 rounded-2xl text-xl font-bold"
              >

                Finalizar Pedido

              </button>

            </div>

          )}

        </div>

      </div>

      <CheckoutModal
        open={openCheckout}
        onClose={() =>
          setOpenCheckout(false)
        }
        carrinho={carrinho}
        total={total}
        setCarrinho={setCarrinho}
      />
    </>
  )
}
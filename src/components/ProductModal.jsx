import { useState } from "react"
import { X } from "lucide-react"

export default function ProductModal({
  open,
  onClose,
  onSave,
  editingProduct,
}) {

  const [formData, setFormData] = useState({
    nome: "",
    categoria: "Hambúrguer",
    preco: "",
    ativo: true,
  })

  function handleOpenData() {

    if (editingProduct) {

      setFormData({
        nome: editingProduct.nome || "",
        categoria:
          editingProduct.categoria || "Hambúrguer",

        preco: editingProduct.preco
          ? editingProduct.preco.replace("R$ ", "")
          : "",

        ativo: editingProduct.ativo ?? true,
      })

    } else {

      setFormData({
        nome: "",
        categoria: "Hambúrguer",
        preco: "",
        ativo: true,
      })
    }
  }

  // CARREGA DADOS AO ABRIR
  if (open && formData.nome === "" && editingProduct) {
    handleOpenData()
  }

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()

    const produto = {
      id: editingProduct
        ? editingProduct.id
        : Date.now(),

      nome: formData.nome,
      categoria: formData.categoria,
      preco: `R$ ${formData.preco}`,
      ativo: formData.ativo,
    }

    onSave(produto)

    setFormData({
      nome: "",
      categoria: "Hambúrguer",
      preco: "",
      ativo: true,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg rounded-3xl p-6">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold text-zinc-800">

              {editingProduct
                ? "Editar Produto"
                : "Novo Produto"}

            </h2>

            <p className="text-zinc-500 text-sm mt-1">
              Gerencie os dados do produto
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-800"
          >
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm text-zinc-600 mb-2">
              Nome
            </label>

            <input
              type="text"
              value={formData.nome}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nome: e.target.value,
                })
              }
              className="w-full border border-zinc-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />

          </div>

          <div>

            <label className="block text-sm text-zinc-600 mb-2">
              Categoria
            </label>

            <select
              value={formData.categoria}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  categoria: e.target.value,
                })
              }
              className="w-full border border-zinc-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
            >

              <option>Hambúrguer</option>
              <option>Bebida</option>
              <option>Batata</option>

            </select>

          </div>

          <div>

            <label className="block text-sm text-zinc-600 mb-2">
              Preço
            </label>

            <input
              type="number"
              value={formData.preco}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preco: e.target.value,
                })
              }
              className="w-full border border-zinc-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />

          </div>

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={formData.ativo}
              onChange={() =>
                setFormData({
                  ...formData,
                  ativo: !formData.ativo,
                })
              }
              className="w-5 h-5"
            />

            <label className="text-zinc-700">
              Produto ativo
            </label>

          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl font-semibold"
          >

            {editingProduct
              ? "Salvar Alterações"
              : "Adicionar Produto"}

          </button>

        </form>

      </div>

    </div>
  )
}
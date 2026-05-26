import { useState } from "react"
import { X } from "lucide-react"

export default function AdditionalModal({
  open,
  onClose,
  onSave,
  editingAdditional,
}) {

  const [formData, setFormData] =
    useState({
      nome: "",
      valor: "",
      ativo: true,
    })

  if (
    open &&
    formData.nome === "" &&
    editingAdditional
  ) {

    setFormData({
      nome: editingAdditional.nome || "",
      valor: editingAdditional.valor
        ? editingAdditional.valor.replace("R$ ", "")
        : "",
      ativo:
        editingAdditional.ativo ?? true,
    })
  }

  if (!open) return null

  function handleSubmit(e) {

    e.preventDefault()

    const adicional = {
      id: editingAdditional
        ? editingAdditional.id
        : Date.now(),

      nome: formData.nome,
      valor: `R$ ${formData.valor}`,
      ativo: formData.ativo,
    }

    onSave(adicional)

    setFormData({
      nome: "",
      valor: "",
      ativo: true,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg rounded-3xl p-6">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold">
              {editingAdditional
                ? "Editar Adicional"
                : "Novo Adicional"}
            </h2>

          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Nome"
            value={formData.nome}
            onChange={(e) =>
              setFormData({
                ...formData,
                nome: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <input
            type="number"
            placeholder="Valor"
            value={formData.valor}
            onChange={(e) =>
              setFormData({
                ...formData,
                valor: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
            required
          />

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
            />

            <label>
              Adicional ativo
            </label>

          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl"
          >
            Salvar
          </button>

        </form>

      </div>

    </div>
  )
}
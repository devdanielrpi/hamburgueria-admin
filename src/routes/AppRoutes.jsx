import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Dashboard from "../pages/Dashboard"
import Produtos from "../pages/Produtos"
import Adicionais from "../pages/Adicionais"
import Cardapio from "../pages/Cardapio"
import Pedidos from "../pages/Pedidos"
import Login from "../pages/Login"

import CupomTeste from "../components/CupomTeste"

import ProtectedRoute from "../components/ProtectedRoute"

export default function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* HOME */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PRODUTOS */}
        <Route
          path="/produtos"
          element={
            <ProtectedRoute>
              <Produtos />
            </ProtectedRoute>
          }
        />

        {/* ADICIONAIS */}
        <Route
          path="/adicionais"
          element={
            <ProtectedRoute>
              <Adicionais />
            </ProtectedRoute>
          }
        />

        {/* CARDÁPIO */}
        <Route
          path="/cardapio"
          element={
            <ProtectedRoute>
              <Cardapio />
            </ProtectedRoute>
          }
        />

        {/* PEDIDOS */}
        <Route
          path="/pedidos"
          element={
            <ProtectedRoute>
              <Pedidos />
            </ProtectedRoute>
          }
        />

        {/* TESTE RAWBT */}
        <Route
          path="/cupom-teste"
          element={
            <ProtectedRoute>
              <CupomTeste />
            </ProtectedRoute>
          }
        />

        {/* ROTA NÃO ENCONTRADA */}
        <Route
          path="*"
          element={
            <div className="p-10 text-2xl font-bold">
              Página não encontrada
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}
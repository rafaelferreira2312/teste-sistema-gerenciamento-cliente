import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListagemClientes from './components/ListagemClientes';
import CadastroCliente from './components/CadastroCliente';
import EditarCliente from './components/EditarCliente';
import CalcularRota from './components/CalcularRota';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/listagem-clientes" element={<ListagemClientes />} />
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
        <Route path="/editar-cliente" element={<EditarCliente />} />
        <Route path="/calcular-rota" element={<CalcularRota />} />.+.+++++++++++--+
      </Routes>
    </Router>
  );
}

export default App;

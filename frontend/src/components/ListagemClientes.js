import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListagemClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar clientes: ', error);
      });
  }, []);

  return (
    <div>
      <h2>Listagem de Clientes</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Coordenada X</th>
            <th>Coordenada Y</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.coordenada_x}</td>
              <td>{cliente.coordenada_y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListagemClientes;

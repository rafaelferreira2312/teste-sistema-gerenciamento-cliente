import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [editandoClienteId, setEditandoClienteId] = useState(null);
  const [editandoCliente, setEditandoCliente] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar clientes: ', error);
      });
  }, []);

  const handleEditar = (clienteId) => {
    setEditandoClienteId(clienteId);
    const cliente = clientes.find(cliente => cliente.id === clienteId);
    setEditandoCliente(cliente);
  };

  const handleExcluir = (clienteId) => {
    axios.delete(`http://localhost:4000/clientes/${clienteId}`)
      .then(response => {
        console.log('Cliente excluído com sucesso:', response.data);
        
        setClientes(clientes.filter(cliente => cliente.id !== clienteId));
      })
      .catch(error => {
        console.error('Erro ao excluir cliente: ', error);
      });
  };

  const handleSalvar = () => {
    axios.put(`http://localhost:4000/clientes/${editandoClienteId}`, editandoCliente)
      .then(response => {
        console.log('Cliente atualizado com sucesso:', response.data);
        
        setEditandoClienteId(null);
        setEditandoCliente({});
      })
      .catch(error => {
        console.error('Erro ao atualizar cliente: ', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditandoCliente(prevCliente => ({
      ...prevCliente,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>Editar Cliente</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Coordenada X</th>
            <th>Coordenada Y</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>
                {editandoClienteId === cliente.id ? (
                  <input type="text" name="nome" value={editandoCliente.nome} onChange={handleChange} />
                ) : (
                  cliente.nome
                )}
              </td>
              <td>
                {editandoClienteId === cliente.id ? (
                  <input type="text" name="email" value={editandoCliente.email} onChange={handleChange} />
                ) : (
                  cliente.email
                )}
              </td>
              <td>
                {editandoClienteId === cliente.id ? (
                  <input type="text" name="telefone" value={editandoCliente.telefone} onChange={handleChange} />
                ) : (
                  cliente.telefone
                )}
              </td>
              <td>
                {editandoClienteId === cliente.id ? (
                  <input type="text" name="coordenada_x" value={editandoCliente.coordenada_x} onChange={handleChange} />
                ) : (
                  cliente.coordenada_x
                )}
              </td>
              <td>
                {editandoClienteId === cliente.id ? (
                  <input type="text" name="coordenada_y" value={editandoCliente.coordenada_y} onChange={handleChange} />
                ) : (
                  cliente.coordenada_y
                )}
              </td>
              <td>
                {editandoClienteId === cliente.id ? (
                  <button onClick={handleSalvar}>Salvar</button>
                ) : (
                  <button onClick={() => handleEditar(cliente.id)}>Editar</button>
                )}
                <button style={{ backgroundColor: 'red' }} onClick={() => handleExcluir(cliente.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditarCliente;

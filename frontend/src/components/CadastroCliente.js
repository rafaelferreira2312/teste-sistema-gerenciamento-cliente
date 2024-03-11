import React, { useState } from 'react';
import axios from 'axios';

const CadastroCliente = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [coordenadaX, setCoordenadaX] = useState('');
  const [coordenadaY, setCoordenadaY] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/clientes', {
        nome,
        email,
        telefone,
        coordenada_x: coordenadaX,
        coordenada_y: coordenadaY
      });
      alert('Cliente cadastrado com sucesso!');
      
      setNome('');
      setEmail('');
      setTelefone('');
      setCoordenadaX('');
      setCoordenadaY('');
    } catch (error) {
      console.error('Erro ao cadastrar cliente: ', error);
      alert('Erro ao cadastrar cliente. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div>
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Telefone:
          <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </label>
        <label>
          Coordenada X:
          <input type="text" value={coordenadaX} onChange={(e) => setCoordenadaX(e.target.value)} />
        </label>
        <label>
          Coordenada Y:
          <input type="text" value={coordenadaY} onChange={(e) => setCoordenadaY(e.target.value)} />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroCliente;

import React, { useState } from 'react';
import axios from 'axios';

const CalcularRota = () => {
  const [ordemDeVisita, setOrdemDeVisita] = useState([]);
  const [modalAberta, setModalAberta] = useState(false);

  const handleClick = () => {
    axios.get('http://localhost:4000/calcula-rota')
      .then(response => {
        setOrdemDeVisita(response.data.ordemDeVisita);
        setModalAberta(true);
      })
      .catch(error => {
        console.error('Erro ao calcular rota: ', error);
      });
  };

  const fecharModal = () => {
    setModalAberta(false);
  };

  return (
    <div>
      <h2>Calcular Rota</h2>
      <button onClick={handleClick}>Calcular Rota</button>

      {modalAberta && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={fecharModal}>&times;</span>
            <h3>Ordem de Visita dos Clientes</h3>
            <ul>
              {ordemDeVisita.map((cliente, index) => (
                <li key={index}>{cliente}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalcularRota;

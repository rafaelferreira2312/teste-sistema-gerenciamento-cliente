const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { Pool } = require('pg');

const app = express();
const port = 4000; 

// Define a política de segurança de conteúdo
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';");
    next();
});

app.use(cors()); 

app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bdclientes',
  password: '123456',
  port: 5432,
});


app.use(express.json());

// Rota para cadastrar um novo cliente
app.post('/clientes', async (req, res) => {
    const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
    try {
      const { rows } = await pool.query('INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nome, email, telefone, coordenada_x, coordenada_y]);
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error('Erro ao cadastrar cliente: ', err);
      res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
  });

// Rota para listar todos os clientes
app.get('/clientes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar clientes: ', err);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// Rota para atualizar um cliente existente
app.put('/clientes/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
    try {
      const { rowCount } = await pool.query('UPDATE clientes SET nome = $1, email = $2, telefone = $3, coordenada_x = $4, coordenada_y = $5 WHERE id = $6', [nome, email, telefone, coordenada_x, coordenada_y, id]);
      if (rowCount === 1) {
        res.json({ message: 'Cliente atualizado com sucesso' });
      } else {
        res.status(404).json({ error: 'Cliente não encontrado' });
      }
    } catch (err) {
      console.error('Erro ao atualizar cliente: ', err);
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  });
  
  // Rota para excluir um cliente
  app.delete('/clientes/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const { rowCount } = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
      if (rowCount === 1) {
        res.json({ message: 'Cliente excluído com sucesso' });
      } else {
        res.status(404).json({ error: 'Cliente não encontrado' });
      }
    } catch (err) {
      console.error('Erro ao excluir cliente: ', err);
      res.status(500).json({ error: 'Erro ao excluir cliente' });
    }
  });
  
  const calcularDistancia = (coordX1, coordY1, coordX2, coordY2) => {
    // Calcula a distância entre dois pontos
    return Math.sqrt(Math.pow(coordX2 - coordX1, 2) + Math.pow(coordY2 - coordY1, 2));
};

const calcularRotaOtima = (clientes) => {
    // Inicializa a variável para armazenar a menor distância
    let menorDistancia = Infinity;
    let rotaOtima = [];

    // Função para gerar todas as permutações possíveis dos clientes
    const permutacoes = (array) => {
        const resultado = [];

        const gerarPermutacoes = (array, permutacao = []) => {
            if (array.length === 0) {
                resultado.push(permutacao);
            } else {
                for (let i = 0; i < array.length; i++) {
                    const novoArray = array.slice();
                    const removido = novoArray.splice(i, 1);
                    gerarPermutacoes(novoArray, permutacao.concat(removido));
                }
            }
        };

        gerarPermutacoes(array);

        return resultado;
    };

    // Calcula a distância total para cada permutação
    const todasPermutacoes = permutacoes(clientes);
    todasPermutacoes.forEach(permutacao => {
        let distanciaTotal = 0;
        for (let i = 0; i < permutacao.length - 1; i++) {
            const clienteAtual = permutacao[i];
            const proximoCliente = permutacao[i + 1];
            distanciaTotal += calcularDistancia(clienteAtual.coordenada_x, clienteAtual.coordenada_y, proximoCliente.coordenada_x, proximoCliente.coordenada_y);
        }
        // Adiciona a distância de volta à empresa
        distanciaTotal += calcularDistancia(0, 0, permutacao[0].coordenada_x, permutacao[0].coordenada_y);
        // Atualiza a rota ótima se a distância atual for menor
        if (distanciaTotal < menorDistancia) {
            menorDistancia = distanciaTotal;
            rotaOtima = permutacao;
        }
    });

    return rotaOtima;
};

// Rota para calcular a rota otimizada de visitação dos clientes
app.get('/calcular-rota', async (req, res) => {
    try {
        const { rows: clientes } = await pool.query('SELECT * FROM clientes');
        
        
        const rotaOtima = calcularRotaOtima(clientes);
        
        
        res.json({ ordemDeVisita: rotaOtima });
    } catch (err) {
        console.error('Erro ao calcular rota otimizada: ', err);
        res.status(500).json({ error: 'Erro ao calcular rota otimizada' });
    }
});


  

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

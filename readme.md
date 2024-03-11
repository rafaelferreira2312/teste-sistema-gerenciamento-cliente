# Sistema de Gerenciamento de Clientes
Este é um sistema de serenciamento de clientes desenvolvido em Node.js, Express e React, com integração com um banco de dados PostgreSQL. O sistema permite o cadastro e visualização de clientes, bem como a otimização das rotas de atendimento para maximizar a eficiência na visitação dos clientes.

## Requisitos
* Node.js
* npm
* PostgreSQL

## Passo a Passo
Siga estes passos para executar o projeto localmente:

## 1. Clone o repositório
```
git clone https://github.com/rafaelferreira2312/teste-sistema-gerenciamento-cliente.git
cd teste-sistema-gerenciamento-cliente
```

## 2. Configuração do Banco de Dados
* Execute o script create-table.sql para criar a tabela clientes no PostgreSQL.

## 3. Configuração do Backend
* Navegue até o diretório backend:

```
npm install
```

* Inicie o servidor do backend:

```
node index.js
```
## Acessar o servidor de backend
```
Acesse o sistema no navegador em http://localhost:4000.
```

## 4. Configuração do Frontend
* Navegue até o diretório frontend:

```
cd frontend
```

* Instale as dependências do frontend:

```
npm install
```

* Inicie o servidor de desenvolvimento do frontend:

```
npm start
```

## 5. Acessando o Sistema Frontend
* Acesse o sistema no navegador em http://localhost:3000.

# Funcionalidades
* Listar todos os clientes cadastrados.
* Cadastrar novos clientes.
* Calcular e visualizar a rota otimizada de visitação dos clientes.

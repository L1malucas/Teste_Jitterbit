# API de Gerenciamento de Pedidos -  Desafio 1 - Jitterbit

Uma API simples desenvolvida em Node.js para gerenciar pedidos e armazenar dados em um banco de dados SQL.

## Sumário

- [Visão Geral](#visão-geral)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
- [Uso](#uso)


## Visão Geral

Esta API permite realizar operações básicas de CRUD (Criar, Ler, Atualizar, Deletar) sobre pedidos, utilizando um banco de dados SQL (MySQL neste exemplo) para armazenamento dos dados.

## Estrutura de Pastas

```
.
├── db.js            # Configuração da conexão com o banco de dados
├── package.json     # Descrição do projeto e dependências
├── server.js        # Configuração do servidor Express e definição dos endpoints da API
├── .env             # Arquivo de configuração das variáveis de ambiente (não versionado)
└── README.md        # Documentação do projeto
```
## Requisitos

- Node.js
- MySQL

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=nome_do_seu_banco_de_dados
   ```

4. **Inicie o servidor:**

   ```bash
   npm start
   ```

5. A API estará acessível em `http://localhost:3000`.

## Estrutura do Banco de Dados

A API utiliza um banco de dados SQL com as seguintes tabelas:

### Tabela `Order`

- `orderId` VARCHAR(255) (Chave primária)
- `value` DECIMAL(10, 2) NOT NULL
- `creationDate` DATETIME NOT NULL

### Tabela `Items`

- `orderId` VARCHAR(255) (Chave estrangeira referenciando `Order`)
- `productId` INT
- `quantity` INT
- `price` DECIMAL(10, 2)

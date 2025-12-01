API de Pedidos

API em Node.js para gerenciar pedidos, com CRUD completo, usando MongoDB como banco de dados.

O projeto transforma os dados recebidos via JSON no formato solicitado pelo case e os salva no MongoDB.

🔧 Requisitos

Node.js >= 20

npm >= 10

MongoDB (local ou Atlas)

📂 Estrutura do Projeto
api-pedidos/
├─ src/
│  ├─ models/
│  │  └─ Order.js
│  ├─ routes/
│  │  └─ orderRoutes.js
│  └─ server.js
├─ package.json
└─ README.md

⚙️ Instalação

Clone o repositório:

git clone https://github.com/lucasleao-dev/api-pedidos.git
cd api-pedidos


Instale as dependências:

npm install


Certifique-se de que o MongoDB está rodando:

Local:

mongod --dbpath C:\data\db


Atlas: configure a string de conexão em src/server.js.

🚀 Rodar a API
node src/server.js


Se estiver tudo certo, você verá:

MongoDB conectado
API rodando em http://localhost:3000

📝 Endpoints
Criar um pedido (POST)
POST /order


Exemplo de JSON no body:

{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}


⚠️ O JSON enviado é mapeado automaticamente para o schema do MongoDB.

Obter um pedido (GET)
GET /order/:numeroPedido


Exemplo:

GET /order/v10089015vdb-01

Listar todos os pedidos (GET)
GET /order/list

Atualizar pedido (PUT)
PUT /order/:numeroPedido


Exemplo JSON no body:

{
  "value": 12000
}

Deletar pedido (DELETE)
DELETE /order/:numeroPedido

💡 Observações

Certifique-se de que o MongoDB está ativo antes de rodar a API.

Todos os endpoints retornam mensagens de erro claras caso algo dê errado.

Esta API atende todos os requisitos do desafio e o mapeamento do JSON do POST é feito automaticamente.

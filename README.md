# NodeJS Desafio Compasso

Projeto criado utilizando Node JS, express, MongoDB, API REST e postman.
As endpoints foram testadas utilizando a plataforma Postman, utilizando form-urlenconded para submeter.

Caminhos no postman:

- Cadastrar cidade= cidades/POST/cadastro
- Cadastrar cliente= clientes/POST/cadastro
- Consultar cidade pelo nome= cidades/GET/consultar nome/estado
- Consultar cidade pelo estado= cidades/GET/consultar nome/estado
- Consultar cliente pelo nome= clientes/GET/consultar nome/id
- Consultar cliente pelo Id= clientes/GET/consultar nome/id
- Remover cliente= clientes/DEL/deletar
- Alterar o nome do cliente= clientes/PUT/alterar nome


Como exemplo uma solitação do desafio, uma consulta de cliente por nome:

> https=//imgur.com/a/cKo8q4K

Exportei a collection que criei no postman também, esta nos arquivos do projeto GitHub (desafioNode.postman_collection.json)

Nome do bando de dados: desafionode, collections: cidades e clientes
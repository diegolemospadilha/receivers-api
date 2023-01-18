<h1 align="center">
    Desafio Backend Software Engineer<br>
</h1>

<h4 align="center">
  API desenvolvida como desafio técnico para a vaga de Backend Software Engineer
</h4>

<p align="center">
  <a href="#technologias">Technologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#orange_book-documentação">Documentação da API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## Tecnologias

Esse projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Nodejs](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Postgres](https://www.postgresql.org/)
- [Knex](https://knexjs.org/)
- [Heroku](https://www.heroku.com/)

## 💻 Instalação

#### Pré-requisitos
1. Instale o [nvm](https://github.com/nvm-sh/nvm)
2. Instale o [docker](https://www.docker.com/)
3. Instale o [yarn](https://yarnpkg.com/)

#### :fire: Rodando o projeto

```bash
# Faça o clone do repositório
$ git clone https://github.com/diegolemospadilha/receivers-api.git 

# Acesse o repositório
$ cd receivers-api

# Crie o arquivo com as variáveis de ambiente necessárias para o projeto
$ cp .env.example .env

# Crie o arquivo com as variáveis de ambiente para o projeto
$ nvm install

# Instale as dependências
$ yarn install

# Inicialize o banco de dados com docker
$ docker-compose up -d postgres

# Rodar migrations do banco de dados
$ yarn run knex:migrate:latest

# Rode o projeto
# Obs: Para que este comando funcione corretamente é necessário ter o postgres instalado e inicializado
$ yarn dev

# Rode todos os testes da aplicação
# Obs: Para que este comando funcione corretamente é necessário ter o postgres instalado e inicializado e a aplicação rodando
$ yarn test

# Rode somente os testes unitários
$ yarn test:unit

# Rode somente os testes de integração
# Obs: Para que este comando funcione corretamente é necessário ter o postgres instalado e inicializado e a aplicação rodando
$ yarn test:integration
```
## :orange_book: Documentação

- [API Reference - Swagger](https://receivers-api.herokuapp.com/docs/)
- [Collection Postman - com exemplos de requisições](https://documenter.getpostman.com/view/8440827/2s8ZDVbPgt)

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito ♥ by Diego Lemos Padilha :wave: [Entre em contato!](https://www.linkedin.com/in/diegolemospadilha/)

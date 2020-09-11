# VUTTR

VUTTR (Very Useful Tools to Remember) é um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags.

**Este projeto é um desafio feito para a BossaBox.**

![vuttr](https://user-images.githubusercontent.com/20775579/92924820-e876ad80-f40f-11ea-845f-a14b66db24e9.gif)

## Table of Contents

- [Como acessar](#como-acessar)
- [Este repositório contém](#este-repositório-contém)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
- [Instruções para executar localmente](#instruções-para-executar-localmente)
- [Testes](#testes)
- [ORM](#orm)
- [Autor](#autor)

## Como acessar

Este projeto está publicado em ambiente de produção na AWS e você pode acessá-lo pelo link abaixo:

https://vuttr-bossabox.felipelima.xyz/

## Este repositório contém

### Front-end

- **React + Typescript**
- **UseSWR** e **Axios** para comunicação com a API REST
- **Styled Components** para estilização, de acordo com os wireframes e style guide da BossaBox
- **Redux** para gerenciamento de estado global
- **React Hook Form** para os formulários
- **Framer Motion** para animações

### Back-end

- **NestJs + Typescript**
- **TypeORM + PostgreSQL** para persistência dos dados
- **JWT** para tokens de autenticação
- **Jest + Supertest** para testes automatizados
- **Swagger (OpenAPI)** para documentação da API
- **Sentry** para monitoramento de erros

## Instruções para executar localmente

Este repositório é um **monorepo** contendo o **Back-end** e o **Front-end** do VUTTR, tudo conteinerizado no Docker, inclusive o banco de dados.

Para executá-lo localmente tudo o que você precisa fazer é clonar este repositório, instalar as dependências com o yarn e iniciar o ambiente com o Docker Compose. Basta executar os comandos abaixo:

```bash
git clone https://github.com/flplima/bossabox-vuttr-fullstack
cd bossabox-vuttr-fullstack
yarn install
docker-compose up
```

Ao executar o `docker-compose up`, automaticamente serão montados um container para o banco de dados Postgres, um container para o Back-end (NestJS) e um para o front-end (React). A criação do banco de dados e as migrações serão executadas automaticamente também.

O Back-end estará na porta 3000, o Front-end na porta 3001 e o banco de dados na porta 5432.

Depois do ambiente ser iniciado, acesse um dos endereços abaixo no seu navegador:

Front-end (React): http://localhost:3001/

Back-end (API docs): http://localhost:3000/

## Testes

No diretório **server** você pode executar os testes automatizados com os comandos abaixo:

```bash
# entre no diretório server
cd server

# executa os testes unitários para cada service
yarn test

# executa os testes e2e para cada rota, com mock dos services
yarn test:e2e
```

## ORM

No diretório **server** você pode usar a [CLI do TypeORM](https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md) para manutenção do banco de dados. Antes, é necessário que você tenha iniciado o ambiente com o docker-compose para que a CLI possa identificar o banco de dados corretamente.

```bash
# entre no diretório server
cd server

# (exemplo) gerando uma nova migration
yarn typeorm migration:generate -n MyMigration
```

## Autor

Meu nome é **Felipe Lima** e você pode entrar em contato comigo pelo meu [LinkedIn](https://www.linkedin.com/in/felipelimadasilva/).

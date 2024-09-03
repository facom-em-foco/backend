# Backend Facom Em Foco

## Descrição

Este projeto é uma API backend desenvolvida utilizando Node.js e TypeScript, destinada a atender as necessidades do sistema **Facom Em Foco**. A aplicação segue a arquitetura MVC e foi projetada para ser facilmente escalável e mantida por desenvolvedores.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [NPM](https://www.npmjs.com/) (versão 7 ou superior)
- [TypeScript](https://www.typescriptlang.org/) (instalado globalmente, opcional)

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/facom-em-foco/backend.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd backend-facom-em-foco
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

## Configuração

1. **Configuração do ambiente:**

   Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias. Certifique-se de que todas as variáveis obrigatórias estejam definidas.

   Exemplo de `.env`:

   ```
   PORT=3000
   ```

## Executar a aplicação

### Em modo de desenvolvimento

- **`start:dev`**: Executa a aplicação em modo de desenvolvimento com recarga automática.

  ```bash
  npm run start:dev
  ```

### Em modo de produção

- **`build`**: Compila o código TypeScript para JavaScript.

  ```bash
  npm run build
  ```

- **`start`**: Executa o código compilado.

  ```bash
  npm start
  ```

## Funcionalidades (Em andamento)

- **Documentação via Swagger**: A API é documentada utilizando o Swagger, facilitando o uso e teste dos endpoints.

## Documentação da API

A documentação da API pode ser acessada através do Swagger. Após iniciar o servidor, acesse o seguinte endereço:

```
http://localhost:3000/api-docs
```

## Desenvolvedores

- **Eduardo Santos Luz** - [GitHub](https://github.com/EduardoSLuz)
- **João Pedro Figueiredo de Oliveira** - [GitHub](https://github.com/joaoPedro-OliveiraFigueiredo)
- **José Luis Pereira Ferreira** - [GitHub](https://github.com/MashiroK)
- **Nicolas Shogo Yonamine Kaihara** - [GitHub](https://github.com/ShogoYK)
- **Raul Leão Chagas** - [GitHub](https://github.com/Raulleao)
- **Vitor Lameirão Lacerda dos Anjos** - [GitHub](https://github.com/VitorLameirao)

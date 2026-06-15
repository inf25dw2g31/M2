# M2
Repositório do trabalho prático **M2** desenvolvido no âmbito da unidade curricular **Desenvolvimento Web II**, do 2º ano do curso de Engenharia Informática da **UMAIA** (ano letivo 2025-26).

---
## Descrição do tema

**FestivAll** é uma Aplicação Web fullstack desenvolvida em **ReactJS** que permite descobrir e organizar eventos culturais e desportivos. A app consome a **Ticketmaster Discovery API** para obter dados de eventos em tempo real, e dispõe de um **backend próprio em Node.js + Express + MySQL** que gere a autenticação JWT dos utilizadores e persiste os seus dados pessoais (favoritos, histórico, listas, avaliações e pesquisas guardadas).

A aplicação está estruturada em **três camadas** (frontend, API e base de dados) orquestradas com **Docker Compose**, permitindo a execução completa do sistema com um único comando.

---
## Organização do repositório

* O **código-fonte do frontend (React)** está na pasta [`src/`](src/).
* O **código-fonte do backend (Node.js + Express)** está na pasta [`backend/`](backend/).
* O **schema da base de dados** está em [`backend/init.sql`](backend/init.sql).
* Os **capítulos do relatório** estão na pasta [`doc/`](doc/).
* A **configuração do Docker** está nos ficheiros `Dockerfile`, `docker-compose.yml` e `nginx.conf` na raiz.
* O **template do ficheiro de ambiente** está em [`.env.example`](.env.example).

---
## Galeria

| | | |
|:---:|:---:|:---:|
| ![Login](doc/images/image01.png) | ![Dashboard](doc/images/image02.png) | ![Eventos](doc/images/image03.png) |
| Login com MUI + Framer Motion | Dashboard com eventos | Pesquisa de eventos |

---
## Tecnologias

### Frontend
* [React](https://react.dev/) (v18) — biblioteca para interfaces de utilizador
* [Vite](https://vitejs.dev/) (v5) — build tool e dev server
* [React Router](https://reactrouter.com/) (v6) — navegação SPA
* [Material UI](https://mui.com/) (v5) — biblioteca de componentes
* [Framer Motion](https://www.framer.com/motion/) (v11) — animações declarativas

### Backend
* [Node.js](https://nodejs.org/) (v20) — runtime JavaScript
* [Express](https://expressjs.com/) (v4) — framework HTTP
* [MySQL](https://www.mysql.com/) (v8) — base de dados relacional
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — autenticação JWT
* [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — hash de passwords
* [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) — proteção contra abuso

### API consumida
* [Ticketmaster Discovery API v2](https://developer.ticketmaster.com/) — eventos culturais e desportivos

### Infraestrutura
* [Docker](https://www.docker.com/) — containerização
* [Docker Compose](https://docs.docker.com/compose/) — orquestração multi-container
* [Nginx](https://nginx.org/) (Alpine) — servidor web em produção

### Ferramentas auxiliares
* [GitHub](https://github.com/) — controlo de versões
* [DockerHub](https://hub.docker.com/) — distribuição da imagem
* [Visual Studio Code](https://code.visualstudio.com/) — editor

---
## Como executar

### Pré-requisitos
* **Docker** e **Docker Compose** instalados
* Conta no [portal de developers da Ticketmaster](https://developer.ticketmaster.com/) para obter Consumer Key gratuita

### Execução

Na raiz do projeto:


Executar:
```bash
festivall.bat
```

Este comando arranca os 3 serviços:
* **web** (React + Nginx) → `http://localhost:3000`
* **api** (Node + Express) → `http://localhost:4000`
* **db** (MySQL 8) → `localhost:3306`

Aceder à aplicação em:
```
http://localhost:3000
```

### Primeira utilização

1. Aceder a `http://localhost:3000`
2. Clicar em "Registar"
3. Preencher username, password e Consumer Key da Ticketmaster
4. Submeter — a app cria a conta e faz login automaticamente


Para apagar também os dados da base de dados:

```bash
docker compose down -v
```

---
## Relatório

* Capítulo 1: [Apresentação do projeto](doc/c1.md)
* Capítulo 2: [Recursos](doc/c2.md)
* Capítulo 3: [Produto](doc/c3.md)
* Capítulo 4: [Apresentação](doc/c4.md)

---
## Imagens Docker no Docker Hub

* `[username]/festivall-web:latest` — frontend React + Nginx
* `[username]/festivall-api:latest` — backend Node.js + Express

_(links a adicionar)_

---
##  Autores 

| Nome | GitHub |
|------|--------|
| **Carlos Miguel Castro** | https://github.com/a046404 |
| **Marcelo Pinto** | https://github.com/MarceloCostaOBJ |
| **Rui Morim** | https://github.com/a047906 |

---

# Todo List Challenge

<p align="center">
   <img alt = "Web app" src = "./.github/images/home.png" width="800px" />
</p>

## Desafio técnico

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: Git, NodeJS e Docker/Docker-compose.

#### 🎲 Rodando o app

```bash
# Clone este repositório.
$ git clone git@github.com:JoaoManoelDev/todo-list-challenge.git

# Vamos começar configurando o back-end da aplicação.
# Acesse a pasta do projeto no terminal/cmd.
$ cd todo-list-challenge/back-end

# Instale as dependências
$ npm install

# Para o back-end funcionar ele precisa de duas variáveis de ambiente: JWT_SECRET e DATABASE_URL.
# As mesmas se encontram no arquivo .env.example já preenchidas para facilitar.
# Basta criar um arquvio .env na pastar raiz back-end e colar essas variáveis.

# No back-end está sendo utilizado o postgress rodando em um conainer docker.
# Para facilitar o docker-compose já está configurado no arquivo docker-compose.yml.
# Suba o banco de dados com o dokcer usando docker compose.
$ docker compose up -d

# Em seguida, rode as migrations do prisma.
$ npx prisma migrate dev

# Por fim suba o servidor back-end.
$ npm run dev

O servidor vai estar rondando na porta 3333 - acesse http://localhost:3333.

------------

# Agora vamos configurar o front-end da aplicação.
# Acesse a pasta do projeto no terminal/cmd.
$ cd todo-list-challenge/front-end

# Instale as dependências.
$ npm install

# Faça o build da aplicação.
$ npm run build

# Por fim suba a aplicação front-end.
$ npm run start

A aplicação vai estar rondando na porta 3000 - acesse http://localhost:3000.

# Você também pode rodar a aplicação em modo desenvolvedor.
$ npm run dev

```

Ao acessar a aplicação, vá em 'Registrar' na parte superior direita do
aplicativo. Após se registrar, você será redirecionado para a página de
login, onde seu e-mail já estará preenchido. Basta inserir sua senha.

Feito por João Manoel

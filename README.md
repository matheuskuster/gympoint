<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Desafio Final: Front-end web e mobile + backend
</h3>

## Sobre o projeto

Este projeto foi desenvolvido durante o <a href="https://rocketseat.com.br/bootcamp">bootcamp</a> da Rocketseat. O intuito de sua criação é ser avaliado como desafio final do curso. O GymPoint consiste em um sistema de gestão de academia. O <a href="https://github.com/matheuskuster/gympoint/tree/master/frontend">frontend</a>, desenvolvido usando React, é utilizado pelo administrador da academia. O aplicativo <a href="https://github.com/matheuskuster/gympoint/tree/master/mobile">mobile</a>, desenvolvido usando React Native, é utilizado pelo cliente da academia.

## Executar

Abaixo se encontram as instruções para executar o GymPoint.

### Script

Para facilitar o processo de configuração do ambiente de desenvolvimento, foi criado um script de instalação. Para executá-lo basta ter <a href="https://www.python.org/downloads/">Python 3</a> instalado em sua máquina. Porém, vale ressaltar que foi testado apenas em ambientes Linux. Portanto, caso não tenha sucesso com o script, tente a instalação Manual logo abaixo.

```
git clone https://github.com/matheuskuster/gympoint.git
cd gympoint
./install
```

#### Observações importantes

Caso escolha uma porta diferente da padrão (3333) durante o script, favor alterá-la também nas <a href="https://github.com/matheuskuster/gympoint/blob/master/frontend/.env">variáveis de ambiente</a> do projeto frontend em <b>REACT_APP_API_PORT</b> e no arquivo de configuração da <a href="https://github.com/matheuskuster/gympoint/blob/master/mobile/src/services/api.js">api</a> no projeto mobile.

### Manual

#### 1 - Clonando o repositório

Clone o repositório em seu computador:

```
git clone https://github.com/matheuskuster/gympoint.git
cd gympoint
```

#### 2 - Variáveis de ambiente

Altere o nome do arquivo `.env.example` do projeto <a href="https://github.com/matheuskuster/gympoint/blob/master/backend/.env.example">backend</a> para `.env` e insira as variáveis de ambiente de acordo com as suas preferência.

```
APP_PORT=3333 # Porta de execução do backend

APP_SECRET=gympoint # Chave secreta da aplicação para realização de autenticação

DB_HOST=localhost # Endereço do banco de dados
DB_USER=postgres # Usuário do banco de dados
DB_PASS=docker # Senha do banco de dados
DB_NAME=gympoint # Nome do banco de dados

MAIL_HOST=smtp.mailtrap.io # Endereço SMTP para envio de e-mail
MAIL_USER= # Usuário do serviço de e-mail
MAIL_PASS= # Senha do serviço de e-mail

REDIS_HOST=127.0.0.1 # Endereço do banco Redis
REDIS_PORT=6379 #
```

##### Observações importantes

Caso escolha uma porta diferente da padrão (3333) durante no `.env`, favor alterá-la também nas <a href="https://github.com/matheuskuster/gympoint/blob/master/frontend/.env">variáveis de ambiente</a> do projeto frontend em <b>REACT_APP_API_PORT</b> e no arquivo de configuração da <a href="https://github.com/matheuskuster/gympoint/blob/master/mobile/src/services/api.js">api</a> no projeto mobile.

#### 3 - Docker

Caso os containers `postgres` e `redis` do <a href="https://www.docker.com/">docker</a> já estejam criados, pule o passo. Se não, execute seguintes comandos, alterando as variáveis de acordo com o passo acima:

```
  docker run --name redis -p {REDIS_PORT}:{REDIS_PORT} -d -t redis:alpine
  docker run --name {DB_USER} -e POSTGRES_PASSWORD={DB_PASS} -p 5432:5432 -d postgres
  docker start redis {DB_USER}
```

#### 4 - Dependências

Navegue até as pastas <a href="https://github.com/matheuskuster/gympoint/tree/master/backend">backend</a>, <a href="https://github.com/matheuskuster/gympoint/tree/master/frontend">frontend</a>, <a href="https://github.com/matheuskuster/gympoint/tree/master/mobile">mobile</a> do projeto e rode o comando abaixo em cada uma delas:

```
yarn
```

#### 5 - Banco de dados

Navegue até a pasta <a href="https://github.com/matheuskuster/gympoint/tree/master/backend">backend</a> do projeto e execute os seguintes comandos:

```
yarn sequelize db:create
yarn sequelize db:migrate
yarn sequelize db:seed:all
```

#### 6 - Executando

##### Backend

Para executar o <a href="https://github.com/matheuskuster/gympoint/tree/master/backend">backend</a>, basta rodar os seguintes comandos em duas abas diferentes do terminal na pasta:

```
yarn dev
```

```
yarn queue
```

##### Frontend

Para executar o <a href="https://github.com/matheuskuster/gympoint/tree/master/frontend">frontend</a>, basta rodar o seguinte comando na pasta:

```
yarn start
```

##### Mobile

Na pasta <a href="https://github.com/matheuskuster/gympoint/tree/master/mobile">mobile</a>, execute o seguinte comando:

```
yarn start
# ou
# react-native start
```

###### Android

Execute o emulador do Android. Após a iniciação do mesmo, execute o seguinte comando em outra aba do terminal na pasta <a href="https://github.com/matheuskuster/gympoint/tree/master/mobile">mobile</a>:

```
yarn android
# ou
# react-native run-android
```

###### iOS

<b>O projeto mobile foi testado apenas em ambiente Android.</b> Dessa forma, não garanto que funcione corretamente em ambiente iOS. Porém, para executá-lo, basta executar o seguinte comando na pasta <a href="https://github.com/matheuskuster/gympoint/tree/master/mobile">mobile</a>:

```
yarn ios
# ou
# react-native run-ios
```

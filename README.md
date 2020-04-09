# semana-omnistack11
Repositório referente a semana omnistack 11

## Notas
Conceitos:
•	Rotas
•	Recursos
Métodos HTTP
•	GET: Buscar uma informação do back-end
•	POST: Criar uma informação no back-end
•	PUT: Alterar uma informação no back-end
•	DELETE: Deletar uma informação no back-end

Tipos de parâmetros
### Query Params: Parâmetros nomeados enviados na rota após “?” (Filtros, paginação, ...)
###	Request: contém todos os dados da requisição
Exemplo 1: Aplicação
app.get('/users',(request, response) => {
    const params = request.query;
    console.log(params);
    . . . 
    })

Requisição:  GET: http://localhost:3333/users?name=User
Resposta log: { name: 'User' }
Requisição:  GET: http://localhost:3333/users?name=User&idade=25
Resposta log: { name: 'User', idade: '25' }
o	Response: responsável pela resposta

### Route Params: Parâmetros utilizados para identificar recursos
app.get('/users/:id',(request, response) => {
    const params = request.params;
    console.log(params);
    . . . 
    })

Requisição: GET: http://localhost:3333/users/1
Resposta log: { id: '1' }
### Request Body: corpo da requisição, utilizado para criar ou alterar recursos
app.use(express.json()); // importante para que a requisição entenda o formato recebido

app.post('/users',(request, response) => {
    //return response.send('Hello World');
    const body = request.body;
    console.log(body);

    . . .
    })

Requisição: POST: http://localhost:3333/users
Request body: JSON  { "name": "User", "idade": 40 }
Resposta log: { name: 'User', idade: 40 }

Node.js (windows)
## Instalando via gerenciador de pacotes
1.	Endereço: https://nodejs.org
2.	Acessar o link: “Other Downloads”
3.	Acessar o link: “Installing Node.js via package manager”
4.	Acessar o link: Windows
5.	Acessar o link: Using Chocolatey (https://chocolatey.org/)
6.	Acessar o link: Get Started
7.	Executa o passo a passo abaixo
•  First, ensure that you are using an administrative shell - you can also install as a non-admin, check out Non-Administrative Installation. 
•  Install with powershell.exe
NOTE: Please inspect https://chocolatey.org/install.ps1 prior to running any of these scripts to ensure safety. We already know it's safe, but you should verify the security and contents of any script from the internet you are not familiar with. All of these scripts download a remote PowerShell script and execute it on your machine. We take security very seriously. Learn more about our security protocols. 
With PowerShell, you must ensure Get-ExecutionPolicy is not Restricted. We suggest using Bypass to bypass the policy to get things installed or AllSigned for quite a bit more security.
•	Run Get-ExecutionPolicy. If it returns Restricted, then run Set-ExecutionPolicy AllSigned or Set-ExecutionPolicy Bypass -Scope Process.
Now run the following command:
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

•  Paste the copied text into your shell and press Enter. 
•  Wait a few seconds for the command to complete. 
•  If you don't see any errors, you are ready to use Chocolatey! Type choco or choco -? now, or see Getting Started for usage instructions.

8.	Executa o commando: cinst nodejs-lts (para instalar a versão lts)
9.	Feche e abre novamente o terminal e verifica a instalação através do comando: node -v e npm -v

## Softwares:
•	Insomnia
  o	Software livre usado para testar as requisições http (get,post...). Não precisa de instalação.
•	Knex.js
  o	É um construtor de consultas (query builder) para Postgres, MSSQL, MySQL, MariaDB, SQLite, Oracle.

## Dicas:
•	Comando terminal . code : abre vscode na pasta que foi executado o comando
•	Para que o usuário não precise inicializar o servidor sempre que fizer uma alteração de código devemos instalar uma extensão. O comando deve ser executado dentro do terminal. 
Comando: npm install nodemon -D
Observação: O “-D” diz ao instalador que essa extensão deve ser instalada com uma dependência de desenvolvimento e não como dependência da aplicação, pois só vamos utilizá-la no processo de desenvolvimento.
Para que o nodemon seja executado é necessário alterar/criar um script para execução dele dentro da pasta “package.json”.

Comando para iniciar o script: npm start

## Tipos de Bancos
•	SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
•	NoSQL: MongoDB, CouchDB, etc

Banco selecionado aplicação: SQLite (banco que armazena os dados em um arquivo)
Comunicação com o banco de dados
•	Opções
o	Driver: select * from [nome tabela]
o	Query Builder: table('nome tabela').select('*').where('...')

## Knex
É um construtor de consultas (query builder) para Postgres, MSSQL, MySQL, MariaDB, SQLite, Oracle.
•	Instalação
o	Comando: npm install knex
Driver do banco
•	Instalar
o	Comando: npm install sqlite3

Logo após instalação do construtor de consultas e do driver, é preciso preparar a conexão com o banco de dados, para isso, execute o comando: npx knex init. Isso irá criar um arquivo (knexfile) na raiz do projeto, é nele que vamos encontrar as configurações de acesso ao banco de dados para cada um dos ambientes de nossa aplicação
Configuração banco de dados
Os dados de configuração do banco de dados estão no arquivo package.json. Portanto, devemos acessá-lo e informar os dados de acordo com o banco selecionado.

## Definição das entidades
•	ONG
•	Caso (incident)

## Funcionalidades
•	Login ONG
•	Logout ONG
•	Cadastro ONG
•	Cadastrar novos casos
•	Deletar casos
•	Listar casos específicos de uma ONG
•	Listar todos os casos
•	Entrar em contato com a ONG

## Migrations (http://knexjs.org/#Migrations)
Programa que ajuda no “controle de versão” do banco de dados.
Passos:
1.	Criar diretório (pasta) para armazenar as migrations. De preferência dentro do diretório “database” (local onde será armazenado o arquivo de banco de dados);
2.	Adicionar ao arquivo “knexfile” na parte de configuração do banco de dados utilizado, as configurações referentes as migrations. Ver exemplo abaixo:
Exemplo 1
development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations:{
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

3.Criar o primeiro arquivo de migrações
•	Comando: npx knex migrate:make create_ongs
create_ongs é o nome do arquivo criado
Observação: Ao executar o comando acima o terminal lhe retornará um aviso de warning. Isso acontece porque por default o sqlite não suporta a inserção de valores padrão para as colunas do banco de dados. Para corrigir isso basta adicionar ao arquivo “knexfile” as configurações para valores default. Segue o exemplo:
Warning: sqlite does not support inserting default values. Set the `useNullAsDefault` flag to hide this warning. (see docs http://knexjs.org/#Builder-insert).
Correção: adicionar useNullAsDefault: true, definindo o valor nulo como default
development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations:{
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

4.	Configurar o arquivo migrate criado 
•	Entra no arquivo migrate e configura a tabela de acordo com a entidade modelo. Exemplo:
exports.up = function(knex) {
    knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();
      });
};

exports.down = function(knex) {
    knex.schema.dropTable('ongs');
};

O método “up” é o responsável por executar a ação (criar, atualizar, etc), o método “down” é o responsável pelo retorno do banco ao estado anterior caso a migrate não ocorrer conforme desejado.

5.	Responsável por executar o arquivo de migração. 
•	Comando: npx knex migrate:latest
Observação: Caso o usuário queira desfazer o que foi executado na última migration basta executar o comando npx knex migrate:rollback.
Observação:
•	Caso o usuário queira saber quais comando o migrate disponibiliza basta executar o npx knex migrate, e o sistema vai exibir uma lista de comandos disponíveis.
•	Caso o usuário deseje saber quais foram os comandos executados pelo migrate, basta executar o comando npx knex migrate:status.

## Cors (Módulo de segurança)
•	Instalação
o	Comando: npm install cors
Após instalação importar módulo dentro do componente index.js

## Repositório GIT
•	Criar conta GIT

•	Via terminal: executar comandos dentro do repositório da aplicação
echo "# semanaomnstack11" >> README.md

git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/sjoseilton/semanaomnstack11.git
git push -u origin master

•	Via interface gráfica: vscode
1.	Criar arquivo .gitignore dentro da pasta src da aplicação
2.	Selecionar a aba “source control”
3.	Inicializar repositório
4.	Adicionar mensagem de commit
5.	Clicar na icon “commit”
 
## Notas 2
Limpar aplicação

Deletar os arquivos:
•	Readme
•	App.css
•	App.test.js
•	index.css
•	logo.svg
•	serviceWorker.js
•	setupTests.js
•	robots.txt (arquivo fica na pasta public)
•	manifest.json (arquivo fica na pasta public)
•	logo192.png (arquivo fica na pasta public)
•	logo512.png (arquivo fica na pasta public)

Observação: 
a) remover os importes dos arquivos deletados
b) remover do arquivo index.html o trecho abaixo:
meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->

## Conceitos
•	Componente no React é uma função que retorna html.
•	JSX (JavaScript XML): é quando o html está integrado ao javaScript.
•	Propriedades no React: atributos repassados para o componente.
•	Estado: informação mantida pelo componente.

## Fontes
•	Google fonts (https://fonts.google.com/)
•	Escolhe uma fonte
•	Clica no “+”
•	Clica em “Customize”, caso queira customizar a fonte
•	Clica em “Embed”
•	Clica em “@Import” e selecione e copie o estilo para o seu arquivo .css

## Pacotes de Icones
•	Matirial icons
•	Fonte awesome
•	Feather icons

## Integrar pacotes de incones
•	Instalação
o	comando : npm install react-icons

## Rotas na aplicação
•	Instalação
o	Comando: npm install react-router-dom

## Cliente HTTP
Para fazer com que a aplicação front-ent se comunique com o back-end, é preciso instalar um cliente http. Cliente muito usado pela comunidade é o axios.
•	Instalação
o	Comando: npm install axios

## Dicas:
•	Sempre que for usar o “await” em algum método, você precisa usar o “async” antes da função.
•	Usar crase “`” quando quiser usar uma variável dentro do texto. 
o	Exemplo:  alert(`texto texto texto: ${minha_variavel}`);
•	useEffect: função disponível no react que serve pra disparar alguma função em um determinado momento do componente. Ela precisa ser importada da biblioteca react.

## IMPORTANTE!!! Sempre verificar se o adblock está ativo... Ele irá atrapalhar as requisições e sua aplicação não responde corretamente as requisições.

## Notas 3

## Instalação Expo
•	Comando: npm install -g expo-cli
o	Testando: expo -h (isso irá lista as várias opções para o comando)

## Criando projeto (React-Native)
•	Comando: expo init <nome do projeto,  depois selecione o template. Exemplo: > blank

## Executar projeto
•	No celular
Dentro da pasta do projeto rode o comando: yarn start.
Se não funcionar instale o yarn manualmente. Após abra o terminal e rode o comando yarn –version para verificar a instalação.
Com o yarn instalado. Entre novamente na pasta do projeto e execute o comando: yarn start
Após a instalação é necessário executar as configurações do emulador. Depois é preciso reiniciar o visual studio code para só então rodar o comando “yarn global add expo-cli” dentro do projeto.

•	Emulador
Usar android studio ...

•	Emulador web
Acessar snack.expo.io

## Documentação expo
•	Acessar: docs.expo.io
•	Acessar Routing & Navigation (Gia de como fazer navegação no expo)
•	React Navigation
o	Acessar documentação can be found at reactnavigation.org.
o	Acessar “Read docs”

## Instalação
	Comando npm:  npm install @react-navigation/native
	Commando yarn: yarn add @react-navigation/native

##  Instalação das dependências
	Comando: expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

Acessar guia em: “You can now continue to "Hello React Navigation" to start writing some code.”
Existe vários formatos de navegação, uma delas é o “Stack Navigation”. É o tipo de navegação por botões. 
•	Instalação
o	Comando: npm install @react-navigation/stack

## Expo-Constants: Recupera constantes predefinidas.
•	Instalação
o	Comando: expo install expo-constants

## Envio de e-mail
•	Documentação: https://docs.expo.io/versions/latest/sdk/mail-composer/
•	Instalação
o	Comando: expo install expo-mail-composer

## Conceitos
Deep links
Deep links para aplicativos móveis são links que apontam para o conteúdo dentro do aplicativo.

## Formatação de dados usando INTL
Para suprir a necessidade de formatação de alguns dados basta instalar a extensão intl (Native Intl implementation and Translation extension).
•	Instação
o	Comando: npm install intl

## Notas 4

## Celebrate
Biblioteca usada para fazer validações. Ela integra o Joi com o Express.
•	Instalação
o	Comando: npm install celebrate

## Observação: 
Sempre que a chave de um objeto for uma variável colocar o objeto entre colchetes “[]”.

## Documentação do Joi 
https://hapi.dev/module/joi/

## Documentação do Celebrate
https://github.com/arb/celebrate

## TDD (Test-driven Development)
### Intalação Jest
o	Comando: npm install jest -D

### Inicialização (dentro da pasta “src”)
o	Comando: npx jest –init

### Configuração: Após inicialização é preciso responder alguns quesitos. Depois é gerando um arquivo (jest.config.js) de configuração na raiz da pasta selecionada do projeto.
1.	Would you like to use Jest when running "test" script in "package.json"? ... yes
2.	Choose the test environment that will be used for testing » node
3.	Do you want Jest to add coverage reports? ... no
4.	Automatically clear mock calls and instances between every test? ... yes

•	Documentação: https://jestjs.io/
1.	API
2.	API Reference
3.	Expect

### Executar testes
o	Commando: npm test
Configurar banco de teste
Configurar um gestor de ambiente

•	Instalação
o	Comando: npm install cross-env
•	Configuração
1.	Em package.json adicionar a linha “test”o script: “cross-env NODE_ENV=test jest” 
2.	É necessário criar uma variável de ambiente em connection.js conforme exemplo abaixo:
Exemplo:
const config = process.env.NODE_ENV ==  'test' ? configuration.test : configuration.development;
const connection = knex(config);

### Documentação: 
https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/
https://github.com/kentcdodds/cross-env
https://www.npmjs.com/package/cross-env

## SuperTest API
API que fornece uma abstração de alto nível para teste HTTP

•	Documentação
o	url: https://github.com/visionmedia/supertest 
•	Instalação

o	Comando: npm install supertest -D

## Modificações
Criação de um arquivo server.js dentro da pasta src
Alteração do nome do index.js para app.js
Alterar dentro do package.json o “start” de index.js para server.js

## IMPORTANTE!
•	Antes de executar o teste, se ele precisa ler ou inserir dados em uma tabela o sistema precisa executar alguns procedimentos. Isso pode ser feito inserindo uma função que executa certos comandos antes da execução dos testes.
•	Após o término de um teste ou após todos os teste é recomendado que feche-se as conexões, encerre-se processos, ou qualquer coisa que foi utilizada pelo teste.
•	Quando for testar uma rota que precisa passar algum parâmetro basta executar o comando .set passando o campo e o seu respectivo o valor.
...
 it('shold be able to create a new ONG', async () => {
    const response = await request(app)
    .post('/ongs')
    .set(‘Authorization’, ‘ssssssss’)
...

## Deploy
Backend – aplicação para teste ou de tamanho pequeno
###	Heroku
o	https://www.heroku.com/ 

### Digitalocean
o	https://www.digitalocean.com/ 

Frontend – aplicação para teste ou de tamanho pequeno
### Netilify (específico para frontend)
o	https://www.netlify.com/ 

Gerando APK (Android) e IPA (iOS) com React Native & Expo

## Próximos passos
•	Padrões de código
o	ESLint
o	Prettier
•	Autenticação JWT
o	Styled Components (ferramenta de estilização)
Marketing pessoal
•	Github
•	Linkedin




 







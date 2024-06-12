### by Emilton Neto
# Projeto de Cadastro de Usuários

Este projeto é uma aplicação web para gerenciar cadastros de usuários. Inclui funcionalidades para cadastrar, buscar, atualizar e deletar usuários no banco de dados Firebase.

## Configuração

Siga as etapas abaixo para configurar e executar o projeto.

### 1. Clonar o Repositório
 
```bash

git  clone  https://github.com/MiltogroDEV/CadastrosCRUD.git

cd  seu-repositorio
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar o Firebase

Substitua a constante **key** do código abaixo com o nome do seu banco de dados Firebase no arquivo `server.js`.

```javascript
const  express  =  require("express");
const  app  =  express();
const admin = require('firebase-admin');
const key = require('./pasta/para/seuArquivoKey.json'); // <---

admin.initializeApp({
	credential:  admin.credential.cert(key)
});
```

### 4. Definições no arquivo package.json

<img src="/img/PackageJson.png">

No arquivo `package.json`, defina os scripts para iniciar o servidor.

Substitua a **parte verde** do código abaixo com o nome do seu banco de dados Firebase
Substitua a **parte amarela** com o nome do arquivo principal, no seu caso `server.js`. 
Substitua a **parte vermelha** com o comando para inicializar o servidor, no seu caso `node server.js`.

```json
{
  "name": "seu-projeto", // <--- PARTE VERDE
  "version": "1.0.0",
  "description": "",
  "main": "server.js",  // <--- PARTE AMARELA
  "scripts": {
    "start": "node server.js",  // <--- PARTE VERMELHA
    "test": "echo \"Error: no test specified\" && exit 1"
  }...
  ```

### 5. Adicionar Arquivo ao Projeto

Insira o arquivo necessário no seu projeto conforme indicado na imagem abaixo.

Por exemplo, se o arquivo necessário for `Key.json`, certifique-se de colocá-lo na raiz do seu projeto ou na pasta adequada e ajustar o caminho de importação no seu código conforme necessário.

```markdown
.
├── Key.json  // <--- ARQUIVO NECESSÁRIO
├── node_modules
├── package.json
├── server.js
├── Web
    ├── index.html
    ├── dados.html
    ├── buscar.html
    └── atualizar.html
├── img
    └── PackageJson.png
└── README.md
```
### 6. Executar o Projeto

Após concluir todas as etapas anteriores, você está pronto para executar o seu projeto. Abra o terminal na pasta do seu projeto e execute o seguinte comando:

```bash
npm start
```

Isso iniciará o servidor e seu aplicativo estará pronto para uso. Certifique-se de que todas as dependências foram instaladas corretamente e que não há erros durante a inicialização do servidor.

Se estiver desenvolvendo e quiser que o servidor reinicie automaticamente sempre que fizer alterações no código, você pode usar o seguinte comando:


```bash
npm run dev
```


Este comando usa o `nodemon` para monitorar alterações nos arquivos e reiniciar o servidor automaticamente.

Certifique-se de verificar o terminal para mensagens de erro ou aviso durante o processo de inicialização.
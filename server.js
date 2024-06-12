const express = require("express");
const app = express();
const admin = require("firebase-admin");
const key = require("./Key.json");

admin.initializeApp({
    credential: admin.credential.cert(key)
});

const db = admin.firestore();
const port = 3000 | process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/Web')); //conectar o index.html com o express

app.post('/create', async (req, res) => {
    try {
        const user = {
            nome: req.body.nome,
            email: req.body.email,
            cpf: req.body.cpf
        };
        const userRef = (await db.collection("Cadastros").add(user)); //adiciona o usuario a coleção
        res.send(`
        <head>
            <title>Cadastrar</title>
        </head>
        <body class="font">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

                .font {
                    font-family: "Righteous", sans-serif;
                    font-weight: 400;
                    font-style: normal;
                }

                .jc {
                    display: flex;
                    justify-content: center;
                }

                .menu {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 100px;
                }

                .button {
                    width: 20%;
                    text-align: center;
                    transition: all 0.3s;
                    border: 1px solid black;
                    padding: 10px;
                    text-decoration: none;
                    color: black;
                    margin: 5% 3%;
                }

                .button:hover {
                    transition: all 0.3s;
                    color: white;
                    background-color: rgb(56, 56, 56);
                }

                .ativo, .ativo:hover {
                    background-color: black;
                    color: white;
                }

                .user {
                    color: green;
                    text-align: center;
                }
                
                div>h1 {
                    text-align: center;
                    font-size: 50px;
                    margin-bottom: 50px;
                }
                
                div>input {
                    width: 155px;
                    height: 26px;  
                }
                
                .centerDivs {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 30px;
                }
                
                .miniButtonCenter {
                    text-align: center;
                    width: 200px;
                    font-size: 20px;
                }
                
                .esq {
                    font-size: 20px;
                }

                .dir {
                    margin-left: 20px;
                }
            </style>
            <div class="menu">
                <a href="" class="button ativo">CADASTRAR</a>
                <a href="dados.html" class="button">DADOS</a>
                <a href="buscar.html" class="button">BUSCAR</a>
                <a href="atualizar.html" class="button">ATUALIZAR</a>
            </div>
            <div class="jc">
                <div class="jcc">
                    <h1>CADASTRE-SE</h1>

                    <form id="cadastrarForm" method="POST" action="/create">
                        <div class="centerDivs">
                            <div class="esq">
                                <span>Nome:</span>
                                <br>
                                <span>Email:</span>
                                <br>
                                <span>CPF:</span>
                            </div>
                            <div class="dir">
                                <input type="text" id="nome" name="nome" required><br>
                                <input type="email" id="email" name="email" required><br>
                                <input type="text" id="cpf" name="cpf" required>
                            </div>
                        </div>
                        <div class="centerDivs">
                            <button type="submit" class="miniButtonCenter font">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
            <h3 class="user">Usuário criado com ID: ${userRef.id}</h3>
        </body>
            `); //mostra o id do usuario
        console.log(`Usuário criado com ID: ${userRef.id}`);
    } catch (error) {
        res.status(500).send("Erro ao criar usuário");
    }
});

db.collection("Cadastros").onSnapshot(function(querySnapshot) {
    app.get('/showAll', async (req, res) => {
        try{
            let printNames = "";
            querySnapshot.forEach(function(doc) {
                const userData = doc.data();
                const userId = doc.id;
                printNames +=
                    `<span>
                        <strong>Nome: </strong>${userData.nome} | 
                        <strong>Email: </strong>${userData.email} | 
                        <strong>CPF: </strong>${userData.cpf} | 
                        <strong>ID: </strong>${userId} | 
                        <button class="font" onclick="removerUsuario('${userId}')">REMOVER</button>
                    </span><br>`
            });

            res.send(`
            <head>
                <title>Dados</title>
            </head>
            <body class="font">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

                    .font {
                        font-family: "Righteous", sans-serif;
                        font-weight: 400;
                        font-style: normal;
                    }

                    .jc {
                        display: flex;
                        justify-content: center;
                    }

                    .menu {
                        display: flex;
                        justify-content: center;
                        margin-bottom: 100px;
                    }

                    .button {
                        width: 20%;
                        text-align: center;
                        transition: all 0.3s;
                        border: 1px solid black;
                        padding: 10px;
                        text-decoration: none;
                        color: black;
                        margin: 5% 3%;
                    }

                    .button:hover {
                        transition: all 0.3s;
                        color: white;
                        background-color: rgb(56, 56, 56);
                    }

                    .ativo, .ativo:hover {
                        background-color: black;
                        color: white;
                    }

                    .user {
                        color: green;
                        text-align: center;
                    }
                    
                    .divNames {
                        margin-bottom: 100px;
                    }
                    
                    .largeButtonCenter {
                        text-align: center;
                        width: 300px;
                        font-size: 20px;
                        margin-top: 30px;
                    }

                    .centerDivs {
                        display: flex;
                        justify-content: center;
                    }
                    
                    div>h1 {
                        text-align: center;
                        font-size: 50px;
                        margin-bottom: 50px;
                    }
                    
                    .user {
                        color: green;
                        text-align: center;
                        font-size: 20px;
                    }
                </style>
                <div class="menu">
                    <a href="index.html" class="button">CADASTRAR</a>
                    <a href="" class="button ativo">DADOS</a>
                    <a href="buscar.html" class="button">BUSCAR</a>
                    <a href="atualizar.html" class="button">ATUALIZAR</a>
                </div>
                <div class="jc">
                    <div class="jcc">
                        <h1>MOSTRAR CADASTROS</h1>
                        <div class="divNames">
                        ` 
                        + printNames +  

                        `
                            <div>
                                <form action="/dados.html">
                                    <div class="centerDivs">
                                        <button type="submit" class="largeButtonCenter font">Voltar</button>
                                    <div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="statusMessage" class="user"></div>

                <script>
                    async function removerUsuario(userId) {
                        try {
                            const response = await fetch('/delete/' + userId, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });

                            if (response.ok) {
                                const result = await response.text();
                                document.getElementById('statusMessage').innerHTML = 'Usuário removido com sucesso (ID: ' + userId + ')';
                                listarUsuarios(); // Atualiza a lista de usuários após remoção
                            } else {
                                const errorText = await response.text();
                                console.error('Erro:', errorText);
                                throw new Error(errorText);
                            }
                        } catch (error) {
                            console.error('Erro ao remover usuário:', error);
                        }
                    }
                    window.onload = listarUsuarios;
                </script>
            </body>
                `);
        } catch (error) {
            console.log(error);
            res.status(404).send("Erro inesperado ao listar usuário");
        }
    });
});

db.collection("Cadastros").onSnapshot(function(querySnapshot) {
    app.get('/search', async (req, res) => {
        try {
            const search = req.query.search;

            let printSearch = "";
            querySnapshot.forEach(function(doc) {
                const userData = doc.data();
                const userId = doc.id;
                if (search == userData.cpf || search == userId) {
                    printSearch += 
                        `<span>
                            <strong>Nome: </strong>${userData.nome} | 
                            <strong>Email: </strong>${userData.email} | 
                            <strong>CPF: </strong>${userData.cpf}
                        </span><br>`;
                }
            });

            const message = printSearch ? '' : 'Nenhum usuário encontrado';

            res.send(`
            <head>
                <title>Buscar</title>
            </head>
            <body class="font">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

                    .font {
                        font-family: "Righteous", sans-serif;
                        font-weight: 400;
                        font-style: normal;
                    }

                    .jc {
                        display: flex;
                        justify-content: center;
                    }

                    .menu {
                        display: flex;
                        justify-content: center;
                        margin-bottom: 100px;
                    }

                    .button {
                        width: 20%;
                        text-align: center;
                        transition: all 0.3s;
                        border: 1px solid black;
                        padding: 10px;
                        text-decoration: none;
                        color: black;
                        margin: 5% 3%;
                    }

                    .button:hover {
                        transition: all 0.3s;
                        color: white;
                        background-color: rgb(56, 56, 56);
                    }

                    .ativo, .ativo:hover {
                        background-color: black;
                        color: white;
                    }
                    
                    .divNames {
                        margin-bottom: 100px;
                    }
                    
                    .miniButtonCenter {
                        text-align: center;
                        width: 200px;
                        font-size: 20px;
                        margin-top: 30px;
                    }

                    .centerDivs {
                        display: flex;
                        justify-content: center;
                    }
                    
                    div>h1 {
                        text-align: center;
                        font-size: 50px;
                        margin-bottom: 50px;
                    }
                    
                    div>input {
                        width: 155px;
                        height: 26px;
                    }
                    
                    .user {
                        color: green;
                        text-align: center;
                        font-size: 25px;
                    }
                    
                    .user2 {
                        color: red;
                        text-align: center;
                        font-size: 25px;
                    }
                    
                    .esq {
                        font-size: 20px;
                    }

                    .dir {
                        margin-left: 20px;
                    }
                </style>
                <div class="menu">
                    <a href="index.html" class="button">CADASTRAR</a>
                    <a href="dados.html" class="button">DADOS</a>
                    <a href="" class="button ativo">BUSCAR</a>
                    <a href="atualizar.html" class="button">ATUALIZAR</a>
                </div>
                <div class="jc">
                    <div class="jcc">
                        <h1>BUSCAR</h1>
                        <form id="searchForm" method="GET" action="/search">
                            <div class="centerDivs">
                                <div class="esq">
                                    <span>ID/CPF: </span>
                                </div>
                                <div class="dir">
                                    <input type="text" id="search" name="search">
                                </div>
                            </div>
                            <div class="centerDivs">
                                <button type="submit" class="miniButtonCenter font">Buscar</button>
                            </div>
                        </form>
                        <div class="user">`
                        +
                        printSearch

                        +`</div>
                        <div class="user2">${message}</div> <!-- Adiciona a mensagem de nenhum usuário encontrado -->
                    </div>
                </div>
            </body>
            `);
        } catch (error) {
            console.log(error);
            res.status(404).send("Erro inesperado ao buscar usuário");
        }
    });
});

app.delete('/delete/:id', async (req, res) => {
    const itemId = req.params.id;

    try {
        await db.collection("Cadastros").doc(itemId).delete();
        console.log(`Documento com ID: ${itemId} foi deletado com sucesso.`);
        res.status(200).send(`Documento com ID: ${itemId} foi deletado com sucesso.`);
    } catch (error) {
        console.error(`Erro ao deletar documento: ${error.message}`);
        res.status(500).send(`Erro ao deletar documento: ${error.message}`);
    }
});

app.put('/update/:id', async (req, res) => {
    const itemId = req.params.id;
    const { nome, email, cpf } = req.body;

    try {
        const userRef = db.collection('Cadastros').doc(itemId);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).send('Usuário não encontrado');
        }

        await userRef.update({ nome, email, cpf });
        res.status(200).send(`Usuário com ID: ${itemId} atualizado com sucesso.`);

        res.send(
            `
            <title>Atualizar</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

                .font {
                    font-family: "Righteous", sans-serif;
                    font-weight: 400;
                    font-style: normal;
                }

                .jc {
                    display: flex;
                    justify-content: center;
                }

                .menu {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 100px;
                }

                .button {
                    width: 20%;
                    text-align: center;
                    transition: all 0.3s;
                    border: 1px solid black;
                    padding: 10px;
                    text-decoration: none;
                    color: black;
                    margin: 5% 3%;
                }

                .button:hover {
                    transition: all 0.3s;
                    color: white;
                    background-color: rgb(56, 56, 56);
                }

                .ativo, .ativo:hover {
                    background-color: black;
                    color: white;
                }

                .user {
                    color: green;
                    text-align: center;
                }

                div>h1 {
                    text-align: center;
                    font-size: 50px;
                    margin-bottom: 50px;
                }

                div>input {
                    width: 150px;
                    height: 20px;
                }

                .centerDivs {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 30px;
                }

                .miniButtonCenter {
                    text-align: center;
                    width: 200px;
                    font-size: 20px;
                }

                .esq {
                    font-size: 20px;
                }

                .dir {
                    margin-left: 20px;
                }

                .user {
                    color: green;
                    text-align: center;
                    font-size: 25px;
                    margin-top: 20px;
                }
                        
                .user2 {
                    color: red;
                    text-align: center;
                    font-size: 25px;
                    margin-top: 20px;
                }
                
                .esp {
                    margin-top: 20px;
                }
            </style>
            <body class="font">
                <div class="menu">
                    <a href="index.html" class="button">CADASTRAR</a>
                    <a href="dados.html" class="button">DADOS</a>
                    <a href="buscar.html" class="button">BUSCAR</a>
                    <a href="" class="button ativo">ATUALIZAR</a>
                </div>
                <div class="jc">
                    <div class="jcc">
                        <h1>ATUALIZAR USUÁRIO</h1>
                        <form id="updateForm">
                            <div class="centerDivs">
                                <div class="esq">
                                    <span>ID/CPF:</span><br>
                                    <span>Nome:</span><br>
                                    <span>Email:</span><br>
                                    <span>CPF:</span>
                                </div>
                                <div class="dir">
                                    <input type="text" id="search" required><br>
                                    <input type="text" id="nome" required><br>
                                    <input type="email" id="email" required><br>
                                    <input type="text" id="cpf" required>
                                </div>
                            </div>
                            <div class="centerDivs">
                                <button type="submit" class="miniButtonCenter font">Atualizar</button>
                            </div>
                        </form>
                        <div class="user espaco" id="resultMessage"></div>
                    </div>
                </div>

                <script>
                    document.getElementById('updateForm').addEventListener('submit', async function(e) {
                        e.preventDefault();

                        const search = document.getElementById('search').value;
                        const nome = document.getElementById('nome').value;
                        const email = document.getElementById('email').value;
                        const cpf = document.getElementById('cpf').value;

                        try {
                            const response = await fetch('/update/'+ search, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ nome, email, cpf })
                            });

                            const resultMessage = document.getElementById('resultMessage');
                            if (response.ok) {
                                const result = await response.text();
                                resultMessage.textContent = result;
                                resultMessage.classList = 'user esp';
                            } else {
                                const errorText = await response.text();
                                console.error('Erro:', errorText);
                                resultMessage.textContent = errorText;
                                resultMessage.classList = 'user2 esp';
                            }
                        } catch (error) {
                            console.error('Erro ao atualizar usuário:', error);
                            document.getElementById('resultMessage').textContent = 'Erro ao atualizar usuário.';
                            document.getElementById('resultMessage').classList = 'user2 esp';
                        }
                    });
                </script>
            </body>`
        )

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).send('Erro ao atualizar usuário');
    }
});

app.listen(port, () => {
    console.log('Servidor web em execução: http://localhost:3000');
});
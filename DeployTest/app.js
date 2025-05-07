// server.js
import express from "express";
import cors from "cors";
import {sequelize} from "./Data/dados.js"; // Importa a conexão com o banco de dados
import {Contato} from "./Data/dados.js"; // Importa o modelo de Contato'

// Inicialização do Express
const app = express();

// Middleware
app.use(cors()); // Permite requisições de outros domínios
app.use(express.json()); // Permite que o Express entenda o corpo da requisição como JSON

// Sincronização do banco de dados
sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado!");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar banco de dados:", err);
  });


// Rota GET para listar todos os contatos
app.get("/contatos", async (req, res) => {
  try {
    const contatos = await Contato.findAll(); // Busca todos os contatos no banco
    res.json(contatos);
  } catch (err) {
    console.error("Erro ao buscar contatos:", err);
    res.status(500).json({ erro: "Erro ao buscar contatos." });
  }
});
// Rota POST para criar um novo contato
app.post("/contatos", async (req, res) => {
  const { numero, nome, email } = req.body;

  // Validação simples
  if (!numero || !nome || !email) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  try {
    // Criar um novo contato
    const novoContato = await Contato.create({
      numero,
      nome,
      email,
    });

    return res.status(201).json({ sucesso: true, contato: novoContato });
  } catch (err) {
    console.error("Erro ao salvar contato:", err);
    return res.status(500).json({ erro: "Erro ao salvar contato." });
  }
});

// Iniciar o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});


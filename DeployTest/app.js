// server.js
import express from "express";
import cors from "cors";
import { sequelize } from "./Data/dados.js"; // Importa a conexão com o banco de dados
import { Contato } from "./Data/dados.js"; // Importa o modelo de Contato'
import chalk from "chalk";

// Inicialização do Express
const app = express();

// Middleware
app.use(cors()); // Permite requisições de outros domínios
app.use(express.json()); // Permite que o Express entenda o corpo da requisição como JSON

// Sincronização do banco de dados
sequelize
  .sync()
  .then(() => {
    console.log(chalk.bgGreen("Banco de dados sincronizado!"));
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
    return res("TESTE");
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
app.delete("/contatos/:email", async (req, res) => {
  const email = req.params.email;

  try {
    // Deletar o contato pelo email
    const contatoDeletado = await Contato.destroy({
      where: { email },
    });

    if (contatoDeletado) {
      return res.status(200).json({ sucesso: true });
    } else {
      return res.status(404).json({ erro: "Contato não encontrado." });
    }
  } catch (err) {
    console.error("Erro ao deletar contato:", err);
    return res.status(500).json({ erro: "Erro ao deletar contato." });
  }
});

// Iniciar o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.bgGreen("Servidor rodando na porta " + PORT));
});

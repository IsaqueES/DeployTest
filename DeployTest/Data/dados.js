import { Sequelize, DataTypes } from "sequelize";

// Conexão com o banco de dados (aqui estamos usando SQLite)
const sequelize = new Sequelize(
  "postgresql://postgres.xnpeofkztgczpwpjzevz:EEz)B4SdAsVQNiq@aws-0-sa-east-1.pooler.supabase.com:5432/postgres",
  {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// Definir o modelo de "Contato"
const Contato = sequelize.define("Contato", {
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export {Contato, sequelize};

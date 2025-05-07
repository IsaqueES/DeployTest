import { useState } from "react";

function Contato() {
  const [numero, setNumero] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    const contato = { numero, nome, email }; // Coleta os dados do formulário

    fetch("https://deploytest-0j1w.onrender.com/contatos", {
      method: "POST", // Envia os dados com POST
      headers: {
        "Content-Type": "application/json", // Informa que os dados são JSON
      },
      body: JSON.stringify(contato), // Transforma os dados em JSON
    })
      .then((res) => res.json()) // Converte a resposta para JSON
      .then((data) => {
        console.log("Contato salvo:", data);
      })
      .catch((error) => {
        console.error("Erro ao salvar contato:", error);
      });
  };

  return (
    <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg max-w-md mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Formulário de Contato
      </h1>

      <input
        type="text"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        placeholder="Número"
        className="w-full p-2 mb-3 rounded bg-blue-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
        className="w-full p-2 mb-3 rounded bg-blue-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 mb-4 rounded bg-blue-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Enviar
      </button>
    </div>
  );
}

export default Contato;

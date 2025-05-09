import { useState } from "react";
import { redirect } from "react-router-dom";

function Contato() {
  const [numero, setNumero] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    const contato = { numero, nome, email };

    fetch("https://deploytest-0j1w.onrender.com/contatos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contato),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Contato salvo:", data);
        if (data.sucesso) {
          alert("Contato salvo com sucesso!");
          window.location.href = "/";
        } else {
          alert("Erro ao salvar contato.");
        }
      })
      .catch((error) => {
        console.error("Erro ao salvar contato:", error);
      });
  };
  const handleDelete = (email) => {
    fetch(`https://deploytest-0j1w.onrender.com/contatos/${email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Contato excluído:", data);
        if (data.sucesso) {
          alert("Contato excluído com sucesso!");
          window.location.href = "/";
        } else {
          alert("Erro ao excluir contato.");
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir contato:", error);
      });
  };

  return (
    <div
      className="bg-blue-950 text-white p-6 rounded-2xl shadow-lg max-w-md mx-auto my-8"
      id="form"
    >
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

      <h1 className="text-2xl font-bold mb-4 text-center pt-4">
        Excluir Contato
      </h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 mb-4 rounded bg-blue-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      <button
        onClick={() => (window.location.href = `/contato/:${email}`)}
        className="w-full bg-blue-600 hover:bg-red-500 text-white font-semibold
        py-2 px-4 rounded transition duration-2000"
      >
        Excluir
      </button>
    </div>
  );
}

export default Contato;

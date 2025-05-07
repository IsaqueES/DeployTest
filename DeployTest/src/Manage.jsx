import { useEffect, useState } from "react";

function Manage() {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/contatos")
      .then((res) => res.json())
      .then((data) => setContatos(data))
      .catch((err) => console.error("Erro ao carregar contatos:", err));
  },[]);

  return (
    <div className="p-6 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Lista de Contatos
      </h2>
      <ul className="space-y-4">
        {contatos.map((contato) => (
          <li
            key={contato.id}
            className="bg-blue-900 p-4 rounded-2xl shadow-lg max-w-md mx-auto hover:bg-blue-800 transition"
          >
            <p className="text-lg font-bold">{contato.nome}</p>
            <p className="text-sm text-gray-300">{contato.numero}</p>
            <p className="text-sm text-gray-400">{contato.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Manage;

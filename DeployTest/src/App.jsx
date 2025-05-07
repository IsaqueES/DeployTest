import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";
import Contato from "./Contato.jsx";
import Manage from "./Manage.jsx";


function App() {
  return (
    <div>
      <div className="p-4 bg-gray-800 text-white">
        <nav className="flex gap-6">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link to="/contato" className="hover:text-yellow-400 transition">
            Contato
          </Link>
          <Link to="/manage" className="hover:text-yellow-400 transition">
            Manage
          </Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
    </div>
  );
}

export default App;

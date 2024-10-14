import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage'; // El componente de la pagina principal
import DeporteDetalles from './components/DeporteDetalles';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/deporte/:id" element={<DeporteDetalles />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;

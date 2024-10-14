import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';


const HomePage = () => {
    const [deportes, setDeportes] = useState([]); // Acá voy a guardar el array de objeto Deporte
    const [addingDeporte, setAddingDeporte] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Aca guardo los datos del nuevo deporte
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPlayers, setNewPlayers] = useState('');
    const [newCategories, setNewCategories] = useState('');

    // useEffect para que haga un GET cuando se monte la HomePage
    useEffect(() => {
        fetch('http://localhost:3001/api/games') // Acá obtiene todos los juegos

            .then(response => {
                if (!response.ok)
                    throw new Error('No se pudieron obtener los juegos.');

                return response.json();
            })

            .then((data) => {
                setDeportes(data);
            })

            .catch((error) => {
                setError(error.message)
            })

    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:3001/api/games/${id}`, {
            method: 'DELETE'
        })

            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se ha podido eliminar");
                }

                return fetch('http://localhost:3001/api/games');

            })
            .then((response) => response.json())

            .then((data) => {
                setDeportes(data);
            })

            .catch((error) => {
                setError(error.message);
            })
    }

    const handleAdd = (event) => {
        event.preventDefault();

        const newDeporte = {
            title: newTitle,
            description: newDescription,
            players: newPlayers,
            categories: newCategories
        };

        fetch(`http://localhost:3001/api/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDeporte)
        })

            .then((response) => {
                if (!response.ok)
                    throw new Error('Error agregando el nuevo deporte')

                return response.json();

            })

            .then((data) => {
                setDeportes(data); // Actualizo la lista de deportes
                setAddingDeporte(false);

                setNewTitle('');
                setNewDescription('');
                setNewPlayers('0');
                setNewCategories('');
            })

            .catch((error) => {
                setError(error.message);
            })
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (deportes.length === 0) {
        return <div>Cargando deportes...</div>;
    }

    return (
        <div>
            <div className="topbar">
                <h1>Juegos</h1>
                <button onClick={() => setAddingDeporte(!addingDeporte)}>Agregar Juego</button>
            </div>

            {addingDeporte &&
                <div className="newDeporte">
                    <form onSubmit={handleAdd}>
                        <h3>Agregar un nuevo deporte</h3>
                        <input type="text" value={newTitle} placeholder='Nombre' onChange={(e) => setNewTitle(e.target.value)} required></input>
                        <br />
                        <input type="text" value={newDescription} placeholder='Descripcion' onChange={(e) => setNewDescription(e.target.value)} required></input>
                        <br />
                        <input type="text" value={newPlayers} placeholder='Cantidad Jugadores' onChange={(e) => setNewPlayers(e.target.value)} required></input>
                        <br />
                        <input type="text" value={newCategories} placeholder='Categorias' onChange={(e) => setNewCategories(e.target.value)} required></input>
                        <br />
                        <button type="submit">Agregar</button>
                    </form>
                </div>
            }

            <ul className='deportes-grid'>
                {deportes.map((deporte) => (
                    <li key={deporte.id} className='deporte-item'>
                        <h2>{deporte.title}</h2>
                        <div className="deporte-buttons">
                            <button onClick={() => navigate(`/deporte/${deporte.id}`)}>Detalles</button>
                            <button onClick={() => handleDelete(deporte.id)}>Borrar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;
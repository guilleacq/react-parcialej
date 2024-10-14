import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import './DeporteDetalles.css';

const DeporteDetalles = () => {
    const { id } = useParams();
    
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetch (`http://localhost:3001/api/games/${id}`)

        .then ((response) => {
            if (!response.ok)
                throw new Error("No se pudo cargar el deporte");

            return response.json();
        })

        .then ((data) => {
            setDetails(data[0]);
        })

        .catch ((error) => {
            setError(error);
        })
    }, [id]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!details) {
        return <div>Cargando detalles...</div>
    }

    return (
        <div className="deporteDetails">
            <button onClick={() => navigate(`..`)}>← Atrás</button>
            <h1>{details.title}</h1>
            <p className="description">{details.description}</p>
            <p className="players"><b>Players:</b> {details.players}</p>
            <p className="categories"><b>Categories:</b> {details.categories}</p>
        </div>
    );
}

export default DeporteDetalles;
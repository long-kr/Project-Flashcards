import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { updateCard, readCard} from "../utils/api";
import CardForm from "./CardForm";

function Card({ deck , setCondition, condition }) {

    const cardId = useParams().cardId;
    const history = useHistory();
    const initialFormState = {
        deckId:"",
        id: "",
        front: "",
        back: "",
    }
    
    const [formData, setFormData] = useState({ ...initialFormState });
    
    useEffect(()=> {
        const abortControl = new AbortController();
        readCard(cardId, abortControl.signal).then((data) => setFormData(data))
        return () => abortControl.abort();
    },[cardId])
    
    const handleSubmit = (event) => {
        event.preventDefault();
        updateCard(formData)
            .then((data) => { 
                setCondition(!condition);
                history.push(`/decks/${data.deckId}`);
            })  
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb w-75">
                    <li className="breadcrumb-item"><Link to="/">
                        <span className="oi oi-home"></span> Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <CardForm deck={deck} setFormData={setFormData} formData={formData}
                        handleSubmit={handleSubmit} />
        </div>

    )
}

export default Card
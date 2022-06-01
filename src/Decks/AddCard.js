import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { createCard } from "../utils/api";
import CardForm from "./CardForm";

function AddCard({deck, condition, setCondition}) {

    const initialFormState = {
        front:"",
        back:""
    }
    
    const [formData, setFormData] = useState({ ...initialFormState });

    const handleSubmit = (event) => {
        event.preventDefault();
        createCard(deck.id, formData).then((data) => {
            setFormData({ ...initialFormState });
            setCondition(!condition)});
    };
    
    return(
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
                        Add Card
                    </li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <CardForm deck={deck} setFormData={setFormData} formData={formData}
                        handleSubmit={handleSubmit} />
        </div>
    )

}

export default AddCard
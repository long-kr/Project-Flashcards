import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { updateDeck } from "../utils/api";

function EditDeck({ deck , setCondition, condition }) {

    const initialFormState = {
        id: deck.id,
        name: deck.name,
        description: deck.description,
    }

    const history = useHistory();
    const [updateForm, setUpdateForm] = useState({...initialFormState})

    const handleChange = ({ target }) => {
        setUpdateForm({
        ...updateForm,
        [target.name]: target.value,
        });
    };

    const handleSubmitButton = (event) => {
        event.preventDefault();
        updateDeck(updateForm)
            .then((data) => { 
                // readDeck(data.id);
                setCondition(!condition);
                history.push(`/decks/${data.id}`);
            })  
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb w-75">
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home"></span> Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Edit</li>
                </ol>
            </nav>
            <h2>{deck.name}: Edit Deck</h2>
            <form onSubmit={handleSubmitButton}>
                <label htmlFor="name" className="w-75">
                    Name
                    <br></br>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        placeholder={deck.name}
                        value={updateForm.name}
                        className="w-100 py-3 border border-dark-light"
                    />
                </label>
                <br />
                <label htmlFor="description" className="w-75">
                    Description
                    <br></br>
                    <textarea
                        id="description"
                        name="description"
                        onChange={handleChange}
                        placeholder={deck.description}
                        value={updateForm.description}
                        className="w-100 py-23 border border-dark-light"
                        style={{height: "120px"}}
                    />
                </label>
                <br />
                <Link className="btn btn-secondary mr-3" to={`/decks/${deck.id}`}>Cancel</Link>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditDeck
import React, {  useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {

    const history = useHistory();

    const initialFormState = {
        name:"",
        description:""
    }

    const [formData, setFormData] = useState({ ...initialFormState });

    const handleChange = ({ target }) => {
            setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createDeck(formData).then((data) => history.push(`/decks/${data.id}`));
    };

    return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb w-75">
                    <li className="breadcrumb-item"><Link to="/">
                        <span className="oi oi-home"></span> Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create Deck
                    </li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className="w-75">
                        Name
                        <br></br>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required={true}
                            onChange={handleChange}
                            placeholder="Deck name"
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
                            placeholder="Brieft description of the deck"
                            className="w-100 py-23 border border-dark-light"
                            style={{height: "120px"}}
                        />
                    </label>
                    <br />
                    <Link className="btn btn-secondary mr-3" to="/">Cancel</Link>
                    <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateDeck;
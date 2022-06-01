import React from "react";
import { Link } from "react-router-dom"

function CardForm({deck, setFormData, formData, handleSubmit}) {

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
                <label htmlFor="front" />
                <p>Front</p>
                <textarea
                    id="front"
                    name="front"
                    required={true}
                    onChange={handleChange}
                    value={formData.front}
                    placeholder="Front side of card"
                    className="w-75 py-23 border border-dark-light"
                    style={{height: "120px"}}
                />
                <br />
                <label htmlFor="back" />
                <p>Back</p>
                <textarea
                    id="back"
                    name="back"
                    required={true}
                    onChange={handleChange}
                    value={formData.back}
                    placeholder="Back side of card"
                    className="w-75 py-23 border border-dark-light"
                    style={{height: "120px"}}
                />
                <br />
                <Link className="btn btn-secondary mr-2" to={`/decks/${deck.id}`}>
                    Cancel
                </Link>
                <button className="btn btn-primary" type="submit">Save</button>
            </form>
    )
}

export default CardForm;
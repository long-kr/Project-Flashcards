import React from "react";
import { Link, useParams } from "react-router-dom";

function NotEnoughCard({ids}) {
    const { deckId } = useParams();

    return (
        <div className="d-flex flex-column">
            <h3 className="py-3 w-75 h-100">Not enough cards.</h3>
            <div className="py-3 w-75 h-100">
                You need at least 3 cards to study. There are only {ids.length} card/cards in the deck
            </div>
            <div className="py-3 w-75 h-100">
                <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>Add Card</Link>
            </div>
        </div>
    )
}

export default NotEnoughCard
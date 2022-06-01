import React from "react";
import { Link, useRouteMatch } from "react-router-dom"

let e = 0;

export function FrontCard({card, ids}) {
    const { url } = useRouteMatch();
    //console.log("front card: ", url);

    return (
        <div className="border rounded border-light bg-light p-2 m w-75 h-100">
            <div className="card-body">
                <h5 className="card-title">Card {e + 1} of {ids.length}</h5>
                <p className="card-text">{card.front}</p>
                <Link to={`${url}/${card.id}/back`} className="card-link btn btn-secondary">
                    Flip
                </Link>
            </div>
        </div>
    )
}

export function BackCard({card, setCardId, ids, deck}) {
    
    const handleClick = () => {
        e = e + 1;
        setCardId(ids[e]);
        //console.log(ids[e])
        if(e === ids.length) {
            if(window.confirm("Restart cards? \nClick 'cancel' to return to the home page")){
                e = 0;
                setCardId(ids[e]);
            } else {
                window.location.href="/";
            }
        }      
    }

    return (
        <div className="border rounded border-light bg-light p-2 m w-75 h-100">
            <div className="card-body">
                <h5 className="card-title">Card {e + 1} of {ids.length}</h5>
                <p className="card-text">{card.back}</p>
                <Link to={`/decks/${deck.id}/study`} className="card-link btn btn-secondary">Flip</Link>
                <Link to={`/decks/${deck.id}/study`} className="card-link">
                    <button class="btn btn-primary" onClick={handleClick}>Next</button>
                </Link>
            </div>
        </div>

    )
}
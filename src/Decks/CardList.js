import React from "react";
import { Link, useRouteMatch } from "react-router-dom"



const CardList = ({ card, handleDeleteCard }) =>  {
    const url = useRouteMatch().url;


    return (
        <div className="d-flex flex-row w-100 border border-dark-light rounded">
            <div className="w-50">
                <p className="p-2">{card.front}</p>
            </div >
            <div className="w-50 d-flex flex-column">
                <p className="p-2">{card.back}</p>
                <div className="d-flex justify-content-end py-2 mx-1">
                    <Link className="btn btn-secondary" to={`${url}/cards/${card.id}/edit`}>
                        <span className="oi oi-pencil"></span> Edit
                    </Link>
                    <button className="btn btn-danger ml-3" onClick={() => handleDeleteCard(card.id)}>
                        <span className="oi oi-trash"></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardList;
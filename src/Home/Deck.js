import React from "react";
import { Link } from "react-router-dom";

export const Deck = ({ deck, handleDeleteDeck }) => (
  <article  className="my-2 align-self-stretch">
    <div className="border rounded border-info bg-light p-2 m w-75 h-100 d-flex flex-column">
      <div className="d-flex">
        <h4 className="font-weight-bold flex-fill ">
          {deck.name}
        </h4>
        <p className="ml-auto p-2">{deck.cards.length} cards</p>
      </div>
      <p >{deck.description}</p>
      <div className="d-flex">
          <Link className="mr-2 btn btn-secondary" to={`/decks/${deck.id}`}><span className="oi oi-eye"></span>  View</Link>
          <Link className="mr-2 btn btn-primary" to={`/decks/${deck.id}/study`}><span className="oi oi-book"></span>  Study</Link>
          <Link className="ml-auto mx-2 " to="/">
            <button className="btn btn-danger" onClick={()=> handleDeleteDeck(deck.id)}><span className="oi oi-trash"></span></button>
          </Link>
      </div>
    </div>
  </article>
);

export default Deck;

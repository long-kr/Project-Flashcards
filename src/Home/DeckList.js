import React, { useEffect, useState } from "react";
import { listDecks, deleteDeck } from "../utils/api";
import Deck from "./Deck";

function DeckList() {
    const [decks, setDecks] = useState([]);
    const [condition, setCondition] = useState(false);
  
    //console.log(decks)
    useEffect(() => {
        const abortController = new AbortController();
        
        listDecks(abortController.signal).then(setDecks).catch((err) => console.log("false to fecth", err));
        
        return ()=> abortController.abort();
    },[condition]);

    const handleDeleteDeck = (idDetele) => {
        if(window.confirm("Delete this deck? \nYou will not be able to recover it.")) {
            deleteDeck(idDetele).then(console.log("deleted")); 
            setCondition(!condition);
        }  
    }

    //console.log("line 20: ", decks);
    const list = decks.map((deck) => (
        <Deck  key={deck.id} deck={deck} handleDeleteDeck={handleDeleteDeck}/>
    ))

    if (decks.length === 0) {
        return <p>loading</p>;
    }

    return (
        <main>
            <section className="column">{list}</section>     
        </main>
    );
}

export default DeckList;

    
import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useParams, Link } from "react-router-dom";
import { deleteCard, readDeck, deleteDeck } from "../utils/api";
import Study from "./Study";
import AddCard from "./AddCard";
import EditDeck from "../Home/EditDeck";
import CardList from "./CardList";
import EditCard from "./EditCard";

function DeckHomePage() {
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const [condition, setCondition] = useState(true)
    // console.log(deck)
    const deckId = useParams().deckId;
    const { url, path } = useRouteMatch();
    //console.log("homepage: ", path)
    //console.log(cards);

    useEffect(() => {
        const abort = new AbortController();
        readDeck(deckId, abort.signal)
            .then((deck) => {
                setDeck(deck)
                setCards(deck.cards)
            })
            .catch((err) => console.log("false to fecth", err))
        return ()=> abort.abort()
        
    },[deckId, condition])
    
    if(!deck.id) {
        return <p>Loading...</p>
    }

    const handleDeleteDeck = (idDetele) => {
        if(window.confirm("Delete this deck? \nYou will not be able to recover it.")) {
            deleteDeck(idDetele).then(console.log("deleted")); 
            setCondition(!condition);
        }  
    }

    const handleDeleteCard = (idDetele) => {
        if(window.confirm("Delete this card? \nYou will not be able to recover it.")) {
            setCards((currentResults) =>
                    currentResults.filter((ignored, index) => index !== idDetele));
            deleteCard(idDetele).then(console.log("deleted"));     
            setCondition(!condition);
        }
    }
    
    let listCard = cards.map((card) => (
        <CardList key={card.id} card={card} handleDeleteCard={handleDeleteCard}/>
    ))
    
    return ( 
        <div>
            <Switch>
                <Route exact path={path}>
                    <div>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb w-75">
                                <li className="breadcrumb-item"><Link to="/">
                                    <span className="oi oi-home"></span> Home</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    {deck.name}
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div >
                        <h2>{deck.name}</h2>
                        <p>{deck.description}</p>
                        <div className="d-flex w-75">
                            <Link to={`${url}/edit`} type="button" className="btn btn-secondary mr-2">
                                <span className="oi oi-pencil"></span> Edit
                            </Link>
                            <Link to={`${url}/study`} type="button" className="btn btn-primary mr-2">
                                <span className="oi oi-book"></span> Study
                            </Link>
                            <Link to={`${url}/cards/new`} type="button" className="btn btn-primary mr-2">
                                <span className="oi oi-plus"></span> Add Card
                            </Link>
                            <button className="btn btn-danger ml-auto mr-1" onClick={()=> handleDeleteDeck(deck.id)}>
                                <span className="oi oi-trash"></span>
                            </button>
                        </div>
                    </div>
                    <div className="mt-5 w-75">
                        <h3 className="my-3">Cards</h3>
                        <section className="column">{listCard}</section>
                    </div>
                </Route>
                <Route path={`${path}/edit`}>
                    <EditDeck deck={deck} condition={condition} 
                        setCondition={setCondition}/>
                </Route>
                <Route path={`${path}/study`}>
                    <Study deck={deck} />
                </Route>
                <Route path={`${path}/cards/new`}>
                    <AddCard deck={deck} condition={condition} 
                        setCondition={setCondition}/>
                </Route>
                <Route path={`${path}/cards/:cardId/edit`}>
                    <EditCard deck={deck} condition={condition} 
                        setCondition={setCondition}/>
                </Route>
            </Switch>
            
        </div>
    )
    

}

export default DeckHomePage;
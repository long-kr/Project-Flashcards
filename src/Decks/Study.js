import React, { useEffect, useState } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { readCard } from "../utils/api";
import { FrontCard, BackCard } from "./FrontCard";
import NotEnoughCard from "./NotEnoughCard";


function Study({deck}) {

    const ids = deck.cards.map((card) => card.id);
    const [cardId, setCardId] = useState(ids[0]);
    const [card, setCard] = useState([]);
    
    const { path } = useRouteMatch();
    //console.log("study path: ", path)
    //console.log("study url: ", url )
    //console.log(params);
    //console.log(route);
    //console.log(deck.cards);
    //console.log(ids)

    useEffect(() => {
        const abort = new AbortController();
        //console.log(deck)
        if(ids.length > 0 ) {
            readCard(cardId, abort.signal).then((setCard));
        }
        
        return ()=> abort.abort();
    },[cardId, ids.length])
    
    if(ids.length < 3) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                        <ol className="breadcrumb w-75">
                            <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
                            <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Study</li>
                        </ol>
                </nav>
                <h2>Study: {deck.name}</h2>
                <Switch>
                    <Route exact path={path}>
                        <NotEnoughCard ids={ids} />
                    </Route>
                </Switch>
            </div>
        )
    } 

    return (
            <div>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb w-75">
                      <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
                      <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Study</li>
                  </ol>
                </nav>
                <h2>Study: {deck.name}</h2>
                <Switch>
                    <Route exact path={path}>
                        <FrontCard card={card} ids={ids}/>
                    </Route>
                    <Route path={`${path}/:cardId/back`}>
                        <BackCard card={card} setCardId={setCardId} ids={ids} deck={deck}/>
                    </Route>
                </Switch>
            </div>
    )
    
}
    
    

export default Study;
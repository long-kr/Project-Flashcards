import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Link, Route, useRouteMatch} from "react-router-dom";
import DeckList from "../Home/DeckList";
import CreateDeck from "../Home/CreateDeck";
import DeckHomePage from "../Decks/DeckHomePage";

function Layout() {
  const { path } = useRouteMatch();
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch >
          <Route className="row" exact path={path}>
            <Link className="col-2 btn btn-secondary btn-lg" to="/decks/new">
              <span className="oi oi-plus"></span> Create Deck
            </Link>
            <DeckList />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <DeckHomePage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;

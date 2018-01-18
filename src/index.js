import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import decode from "jwt-decode";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import { userLoggedIn } from "./Actions/Auth";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.teknikaJWT) {
    const payload = decode(localStorage.teknikaJWT);
    const user = {
        token: localStorage.teknikaJWT,
        email: payload.email,
        confirmed: payload.confirmed
    };
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();

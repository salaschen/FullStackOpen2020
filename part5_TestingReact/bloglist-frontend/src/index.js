import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { notifyReducer, blogReducer, userReducer, usersReducer } from "./services/reducers";
import { Provider } from 'react-redux'

const reducer = combineReducers({
    notification: notifyReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
});

const store = createStore(reducer) ;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

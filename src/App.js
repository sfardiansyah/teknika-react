import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import LoginPage from "./Components/Pages/LoginPage";
import DashboardPage from "./Components/Pages/DashboardPage";
import UserRoute from "./Components/Routes/UserRoute";
import GuestRoute from "./Components/Routes/GuestRoute";

const App = ({ location }) => (
    <div className="ui container">
        <Route location={location} path="/" exact component={HomePage} />
        <UserRoute
            location={location}
            path="/dashboard"
            exact
            component={DashboardPage}
        />
        <GuestRoute
            location={location}
            path="/login"
            exact
            component={LoginPage}
        />
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default App;

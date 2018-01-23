import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./Components/Pages/HomePage";
import LoginPage from "./Components/Pages/LoginPage";
import SignupPage from "./Components/Pages/SignupPage";
import DashboardPage from "./Components/Pages/DashboardPage";
import ConfirmationPage from "./Components/Pages/ConfirmationPage";
import ForgotPasswordPage from "./Components/Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Components/Pages/ResetPasswordPage";
import UserRoute from "./Components/Routes/UserRoute";
import GuestRoute from "./Components/Routes/GuestRoute";
import TopNavigation from "./Components/Navigations/TopNavigation";

const App = ({ location, isAuthenticated }) => (
    <div>
        {isAuthenticated && <TopNavigation />}
        <div className="ui container">
            <Route location={location} path="/" exact component={HomePage} />
            <Route
                location={location}
                path="/confirmation/:token"
                exact
                component={ConfirmationPage}
            />
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
            <GuestRoute
                location={location}
                path="/forgot_password"
                exact
                component={ForgotPasswordPage}
            />
            <GuestRoute
                location={location}
                path="/signup"
                exact
                component={SignupPage}
            />
            <GuestRoute
                location={location}
                path="/reset_password/:token"
                exact
                component={ResetPasswordPage}
            />
        </div>
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    };
}

export default connect(mapStateToProps)(App);

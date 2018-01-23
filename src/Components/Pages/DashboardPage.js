import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateArticleForm from "../Forms/CreateArticleForm";
import ConfirmEmailMessage from "../Messages/ConfirmEmailMessage";
import SidebarNavigation from "../Navigations/SidebarNavigation";
import UserRoute from "../Routes/UserRoute";

const DashboardPage = ({ location, isConfirmed }) => (
    <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        <UserRoute
            location={location}
            path="/dashboard"
            exact
            component={CreateArticleForm}
        />
        <SidebarNavigation />
    </div>
);

function mapStateToProps(state) {
    return {
        isConfirmed: !!state.user.confirmed
    };
}

DashboardPage.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    isConfirmed: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(DashboardPage);

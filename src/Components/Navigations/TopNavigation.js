import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import * as actions from "../../Actions/Auth";

const TopNavigation = ({ logout }) => (
    <Menu>
        <Menu.Menu position="right">
            <Dropdown item trigger={<Icon name="user circle" />}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => logout()}>
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    </Menu>
);

TopNavigation.propTypes = {
    logout: PropTypes.func.isRequired
};

export default connect(null, { logout: actions.logout })(TopNavigation);

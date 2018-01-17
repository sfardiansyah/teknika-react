import api from "../api";
import { userLoggedIn } from "./Auth";

export const signup = data => dispatch =>
    api.user.signup(data).then(user => {
        localStorage.teknikaJWT = user.token;
        dispatch(userLoggedIn(user));
    });

import { Action } from "../interfaces/appstate.interface";
import { SET_USER, UNSET_USER } from "../actions/auth.action";
import { AuthInterface } from "../interfaces/authentication.interface";

export function AuthenticationReducer(state: AuthInterface = null, action: Action): AuthInterface
{
    switch(action.type)
    {
        case SET_USER:
            return { account: { ...action.payload } };
        case UNSET_USER:
            return { account: null };
        default:
            return state;
    }
}
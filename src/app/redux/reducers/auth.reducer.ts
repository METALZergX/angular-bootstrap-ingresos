import { Action } from "../interfaces/appstate.interface";
import { SET_USER } from "../accions/auth.accion";
import { AuthInterface } from "../interfaces/authentication.interface";

export function AuthenticationReducer(state: AuthInterface = null, action: Action): AuthInterface
{
    switch(action.type)
    {
        case SET_USER:
            return { account: { ...action.payload } };
        default:
            return state;
    }
}
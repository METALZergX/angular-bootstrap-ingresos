import { User } from "../../models/user.model";
import { Action } from "../interfaces/appstate.interface";

export const { SET_USER, UNSET_USER } = Object.freeze({ SET_USER: 'SET_USER', UNSET_USER: 'UNSET_USER' });

export class SetAccountAction implements Action
{
    readonly type = SET_USER;

    constructor(public payload: User)
    {}
}

export class UnsetAccountAction implements Action
{
    readonly type = UNSET_USER;
}
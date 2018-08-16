import { ACTIVE_LOAD, INACTIVE_LOAD } from "../accions/ui.accion";
import { Action } from "@ngrx/store";
import { UserInterface } from "../interfaces/ui.interface";

export function interfaceReducer(state: UserInterface = { isLoading: false}, action: Action): UserInterface
{
    switch(action.type)
    {
        case ACTIVE_LOAD:
            return { isLoading: true };
        case INACTIVE_LOAD:
            return { isLoading: false };
        default:
            return state;
    }
}
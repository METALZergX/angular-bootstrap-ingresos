import { ActionReducerMap } from "@ngrx/store";

import { UserInterface } from "./ui.interface";
import { interfaceReducer } from "../reducers/ui.reducer";

import { AuthInterface } from "./authentication.interface";
import { AuthenticationReducer } from "../reducers/auth.reducer";
import { ExpenseInterface } from "./expense.interface";
import { ExpenseReducer } from "../reducers/expense.reducer";

export interface Action
{
    type: string, // Action required
    payload?: any // Data for request
}

export interface AppState
{
    interface: UserInterface, // ui.reducer
    authentication: AuthInterface, // auth.reducer
    income: ExpenseInterface // expense.reducer
}

// Definicion de Reducers para el StoreModule
export const ReducerInterface: ActionReducerMap<AppState> = {
    interface: interfaceReducer, 
    authentication: AuthenticationReducer,
    income: ExpenseReducer
};
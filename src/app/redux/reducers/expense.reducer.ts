import { SET_INCOME, UNSET_INCOME } from "../actions/expense.action";
import { Action } from '../interfaces/appstate.interface';
import { Income } from "../../models/expense.model";
import { ExpenseInterface } from "../interfaces/expense.interface";

export function ExpenseReducer(state: ExpenseInterface = { income: [] }, action: Action): ExpenseInterface
{
    switch(action.type)
    {
        case SET_INCOME:
            return { income: [ ...action.payload.map(income => { return { ...income }; }) ] };
        case UNSET_INCOME:
            return { income: [] };
        default:
            return state;
    }
}
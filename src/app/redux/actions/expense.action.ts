import { Action } from "../interfaces/appstate.interface";
import { Income } from "../../models/expense.model";

export const { SET_INCOME, GET_INCOME, UNSET_INCOME } = Object.freeze({ SET_INCOME: 'SET_INCOME', GET_INCOME: 'GET_INCOME', UNSET_INCOME: 'UNSET_INCOME' });

export class SetIncomeAction implements Action
{
    readonly type = SET_INCOME;

    constructor(public payload: Income[])
    {}
}

export class GetIncomeAction implements Action
{
    readonly type = GET_INCOME;
}

export class UnsetIncomeAction implements Action
{
    readonly type = UNSET_INCOME;
}
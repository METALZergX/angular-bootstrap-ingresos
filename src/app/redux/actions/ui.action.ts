import { Action } from '@ngrx/store';

export const { ACTIVE_LOAD, INACTIVE_LOAD } = Object.freeze({ ACTIVE_LOAD: 'ACTIVE_LOAD', INACTIVE_LOAD: 'INACTIVE_LOAD' });

export class ActiveLoaderAction implements Action
{
    readonly type = ACTIVE_LOAD;
}

export class InactiveLoaderAction implements Action
{
    readonly type = INACTIVE_LOAD;
}
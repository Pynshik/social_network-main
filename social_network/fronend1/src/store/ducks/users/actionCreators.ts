import {Action} from 'redux';
import { UserInterface } from '../user/contracts/state';

export enum UsersActionsType {
    SET_ITEMS = 'users/SET_ITEMS',
    FETCH_ITEMS = 'users/FETCH_ITEMS',
}

export interface SetUsersItemsActionInterface extends Action<UsersActionsType>{
    type: UsersActionsType.SET_ITEMS;
    payload: UserInterface[];
}

export interface FetchUsersItemsActionInterface extends Action<UsersActionsType>{
    type: UsersActionsType.FETCH_ITEMS;
}

export const setUsers = (payload: UserInterface[]): SetUsersItemsActionInterface => ({
    type: UsersActionsType.SET_ITEMS,
    payload
});

export const fetchUsers = (): FetchUsersItemsActionInterface => ({
    type: UsersActionsType.FETCH_ITEMS,
});

export type UsersActions = SetUsersItemsActionInterface | FetchUsersItemsActionInterface;
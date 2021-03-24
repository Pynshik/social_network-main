import { Action } from "redux";
import { LoginFormPropsInterface } from "../../../../pages/SignIn/components/LoginModal";
import { RegisterFormPropsInterface } from "../../../../pages/SignIn/components/RegisterModal";
import { LoadingStatus } from "../../../types";
import { UserInterface } from "./state";

export enum UserActionsType {
    SET_USER_DATA = 'user/SET_USER_DATA',
    FETCH_USER_DATA = 'user/FETCH_USER_DATA',
    FETCH_SIGN_IN = 'user/FETCH_SIGN_IN',
    FETCH_SIGN_UP = 'user/FETCH_SIGN_UP',
    FETCH_SIGN_UP_GOOGLE = 'user/FETCH_SIGN_UP_GOOGLE',
    SIGN_OUT = 'user/SIGN_OUT',
    SET_LOADING_STATUS = 'user/SET_LOADING_STATUS',
}

export interface FetchSignInActionInterface extends Action<UserActionsType>{
    type: UserActionsType.FETCH_SIGN_IN;
    payload: LoginFormPropsInterface;
}

export interface signOutActionInterface extends Action<UserActionsType>{
    type: UserActionsType.SIGN_OUT;
}

export interface FetchSignUpActionInterface extends Action<UserActionsType>{
    type: UserActionsType.FETCH_SIGN_UP;
    payload: RegisterFormPropsInterface;
}

export interface FetchSignUpGoogleActionInterface extends Action<UserActionsType>{
    type: UserActionsType.FETCH_SIGN_UP_GOOGLE;
    payload: RegisterFormPropsInterface;
}

export interface FetchUserDataActionInterface extends Action<UserActionsType>{
    type: UserActionsType.FETCH_USER_DATA;
}

export interface SetUserDataActionInterface extends Action<UserActionsType>{
    type: UserActionsType.SET_USER_DATA;
    payload: UserInterface | undefined;
}

export interface SetUserLoadingStatusActionInterface extends Action<UserActionsType>{
    type: UserActionsType.SET_LOADING_STATUS;
    payload: LoadingStatus;
}

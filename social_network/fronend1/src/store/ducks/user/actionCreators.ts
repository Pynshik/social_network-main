import { LoginFormPropsInterface } from '../../../pages/SignIn/components/LoginModal';
import { RegisterFormPropsInterface } from '../../../pages/SignIn/components/RegisterModal';
import { FetchSignInActionInterface, FetchSignUpActionInterface, FetchSignUpGoogleActionInterface, FetchUserDataActionInterface, SetUserDataActionInterface, SetUserLoadingStatusActionInterface, signOutActionInterface, UserActionsType } from './contracts/actionTypes';
import { UserStateInterface } from './contracts/state';

export const fetchSignIn = (payload: LoginFormPropsInterface): FetchSignInActionInterface => ({
    type: UserActionsType.FETCH_SIGN_IN,
    payload
});

export const signOut = (): signOutActionInterface => ({
    type: UserActionsType.SIGN_OUT
});

export const fetchUserData = (): FetchUserDataActionInterface => ({
    type: UserActionsType.FETCH_USER_DATA
});

export const fetchSignUp = (payload: RegisterFormPropsInterface): FetchSignUpActionInterface => ({
    type: UserActionsType.FETCH_SIGN_UP,
    payload
});

export const fetchSignUpGoogle = (payload: RegisterFormPropsInterface): FetchSignUpGoogleActionInterface => ({
    type: UserActionsType.FETCH_SIGN_UP_GOOGLE,
    payload
});

export const setUserData = (payload: UserStateInterface['data']): SetUserDataActionInterface => ({
    type: UserActionsType.SET_USER_DATA,
    payload
});

export const setUserLoadingStatus = (payload: UserStateInterface['status']): SetUserLoadingStatusActionInterface => ({
    type: UserActionsType.SET_LOADING_STATUS,
    payload
});

export type UserActions = SetUserDataActionInterface | SetUserLoadingStatusActionInterface | FetchUserDataActionInterface 
    | signOutActionInterface | FetchSignUpGoogleActionInterface;

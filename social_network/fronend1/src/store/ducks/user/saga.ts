import { call, put, takeLatest } from 'redux-saga/effects'
import { AuthApi } from '../../../services/api/AuthApi';
import { LoadingStatus } from '../../types';
import { setUserLoadingStatus, setUserData } from './actionCreators';
import { FetchSignInActionInterface, FetchSignUpActionInterface, FetchSignUpGoogleActionInterface, UserActionsType } from './contracts/actionTypes';

export function* fetchSignInRequest({payload}: FetchSignInActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const { data } = yield call(AuthApi.signIn, payload);
        window.localStorage.setItem('token', data.token)
        yield put(setUserData(data));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR))
    }
}

export function* fetchUserDataRequest() {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const { data } = yield call(AuthApi.getMe);
        yield put(setUserData(data));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR))
    }
}

export function* fetchSignUpRequest({payload}: FetchSignUpActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        yield call(AuthApi.signUp, payload);
        yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR))
    }
}

export function* fetchSignUpGoogleRequest({payload}: FetchSignUpGoogleActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const { data } = yield call(AuthApi.signUpGoogle, payload);
        yield put(setUserData(data));
        window.localStorage.setItem('token', data.token)
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR))
    }
}

export function* userSaga() {
  yield takeLatest(UserActionsType.FETCH_SIGN_IN, fetchSignInRequest);
  yield takeLatest(UserActionsType.FETCH_SIGN_UP, fetchSignUpRequest);
  yield takeLatest(UserActionsType.FETCH_SIGN_UP_GOOGLE, fetchSignUpGoogleRequest);
  yield takeLatest(UserActionsType.FETCH_USER_DATA, fetchUserDataRequest);
}

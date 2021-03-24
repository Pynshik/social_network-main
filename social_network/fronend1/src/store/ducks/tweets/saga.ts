import { call, put, takeLatest } from 'redux-saga/effects'
import { TweetsApi } from '../../../services/api/tweetsApi';
import { AddTweetState } from './contracts/state';
import { addTweet, setAddTweetState, setTweets, setTweetsLoadingStatus } from './actionCreators';
import {FetchAddTweetActionInterface, RemoveTweetActionInterface} from './contracts/actionTypes';
import {TweetsActionsType} from './contracts/actionTypes';
import { LoadingStatus } from '../../types';

export function* fetchTweetsRequest(): any {
    try {
        const pathname = window.location.pathname; 
        const userId = pathname.includes('/user') ? pathname.split('/').pop() : undefined;
        const tweets = yield call(TweetsApi.fetchTweets, userId);
        yield put(setTweets(tweets));
    } catch (error) {
        yield put(setTweetsLoadingStatus(LoadingStatus.ERROR))
    }
}

export function* fetchAddTweetRequest({ payload }: FetchAddTweetActionInterface): any {
    try {
        const item = yield call(TweetsApi.addTweet, payload);
        yield put(addTweet(item));
    } catch (error) {
        yield put(setAddTweetState(AddTweetState.ERROR))
    }
}

export function* fetchRemoveTweetRequest({ payload }: RemoveTweetActionInterface) {
    try {
        yield call(TweetsApi.removeTweet, payload);
    } catch (error) {
        alert('Ошибка при удалении твита');
    };
}

export function* tweetsSaga() {
  yield takeLatest(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);
  yield takeLatest(TweetsActionsType.FETCH_ADD_TWEET, fetchAddTweetRequest);
  yield takeLatest(TweetsActionsType.REMOVE_TWEET, fetchRemoveTweetRequest);
}
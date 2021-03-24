import { call, put, takeLatest } from 'redux-saga/effects'
import {TweetsApi} from '../../../services/api/tweetsApi';
import { setTweetData, setTweetDataLoadingStatus } from './actionCreators';
import {FetchTweetDataActionInterface, TweetDataActionsType} from '../tweet/contracts/actionTypes';
import { TweetInterface } from '../tweets/contracts/state';
import { LoadingStatus } from '../../types';

export function* fetchTweetDataRequest({ payload: tweetId }: FetchTweetDataActionInterface) {
    try {
        const data: TweetInterface = yield call(TweetsApi.fetchTweetData, tweetId);
        yield put(setTweetData(data));
    } catch (error) {
        yield put(setTweetDataLoadingStatus(LoadingStatus.ERROR))
    }
}

export function* tweetSaga() {
  yield takeLatest(TweetDataActionsType.FETCH_TWEET_DATA, fetchTweetDataRequest);
}
import { LoadingStatus } from '../../types';
import { FetchTweetDataActionInterface, SetTweetDataActionInterface, SetTweetDataLoadingStatusActionInterface, TweetDataActionsType } from './contracts/actionTypes';
import {TweetStateInterface} from './contracts/state';

export const setTweetData = (payload: TweetStateInterface['data']): SetTweetDataActionInterface => ({
    type: TweetDataActionsType.SET_TWEET_DATA,
    payload,
});

export const fetchTweetData = (payload: string): FetchTweetDataActionInterface => ({
    type: TweetDataActionsType.FETCH_TWEET_DATA,
    payload,
});

export const setTweetDataLoadingStatus = (payload: LoadingStatus): SetTweetDataLoadingStatusActionInterface => ({
    type: TweetDataActionsType.SET_LOADING_STATE,
    payload
});


export type TweetDataActions = SetTweetDataActionInterface | FetchTweetDataActionInterface | SetTweetDataLoadingStatusActionInterface;
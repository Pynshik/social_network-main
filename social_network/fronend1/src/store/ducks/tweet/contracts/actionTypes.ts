import {Action} from 'redux';
import {LoadingStatus} from '../../../types';
import { TweetStateInterface } from './state';

export enum TweetDataActionsType {
    SET_TWEET_DATA = 'tweet/SET_TWEET_DATA',
    FETCH_TWEET_DATA = 'tweet/FETCH_TWEET_DATA',
    SET_LOADING_STATE = 'tweet/SET_LOADING_STATE',
}

export interface SetTweetDataActionInterface extends Action<TweetDataActionsType>{
    type: TweetDataActionsType.SET_TWEET_DATA;
    payload: TweetStateInterface['data'];
}

export interface FetchTweetDataActionInterface extends Action<TweetDataActionsType>{
    type: TweetDataActionsType.FETCH_TWEET_DATA;
    payload: string;
}

export interface SetTweetDataLoadingStatusActionInterface extends Action<TweetDataActionsType>{
    type: TweetDataActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

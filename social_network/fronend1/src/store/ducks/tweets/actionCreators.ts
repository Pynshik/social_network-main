import {AddTweetState, TweetInterface, TweetsStateInterface} from './contracts/state';
import { AddTweetActionInterface, FetchAddTweetActionInterface, 
    FetchTweetsActionInterface, RemoveTweetActionInterface, SetAddTweetStateActionInterface, 
    SetTweetsActionInterface, SetTweetsLoadingStatusActionInterface, 
    TweetsActionsType } from './contracts/actionTypes';
import { LoadingStatus } from '../../types';

export const setTweets = (payload: TweetsStateInterface['items']): SetTweetsActionInterface => ({
    type: TweetsActionsType.SET_TWEETS,
    payload
});

export const fetchTweets = (): FetchTweetsActionInterface => ({
    type: TweetsActionsType.FETCH_TWEETS,
});

export const setTweetsLoadingStatus = (payload: LoadingStatus): SetTweetsLoadingStatusActionInterface => ({
    type: TweetsActionsType.SET_LOADING_STATE,
    payload
});

export const setAddTweetState = (payload: AddTweetState): SetAddTweetStateActionInterface => ({
    type: TweetsActionsType.SET_ADD_TWEET_STATE,
    payload
});

export const fetchAddTweet = (payload: { text: string, images: string[]}): FetchAddTweetActionInterface => ({
    type: TweetsActionsType.FETCH_ADD_TWEET,
    payload
});

export const addTweet = (payload: TweetInterface): AddTweetActionInterface => ({
    type: TweetsActionsType.ADD_TWEET,
    payload
});

export const removeTweet = (payload: string): RemoveTweetActionInterface => ({
    type: TweetsActionsType.REMOVE_TWEET,
    payload
});

export type TweetsActions = SetTweetsActionInterface | FetchTweetsActionInterface 
    | SetTweetsLoadingStatusActionInterface | FetchAddTweetActionInterface
    | AddTweetActionInterface | SetAddTweetStateActionInterface 
    | RemoveTweetActionInterface;
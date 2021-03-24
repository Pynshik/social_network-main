import { Action } from "redux";
import { LoadingStatus } from "../../../types";
import { AddTweetState, TweetInterface, TweetsStateInterface } from "./state";

export enum TweetsActionsType {
    SET_TWEETS = 'tweets/SET_TWEETS',
    FETCH_TWEETS = 'tweets/FETCH_TWEETS',
    SET_LOADING_STATE = 'tweets/SET_LOADING_STATE',
    FETCH_ADD_TWEET = 'tweets/FETCH_ADD_TWEET',
    ADD_TWEET = 'tweets/ADD_TWEET',
    REMOVE_TWEET = 'tweets/REMOVE_TWEET',
    SET_ADD_TWEET_STATE = 'tweets/SET_ADD_TWEET_STATE',
}

export interface SetTweetsActionInterface extends Action<TweetsActionsType>{
    type: TweetsActionsType.SET_TWEETS;
    payload: TweetsStateInterface['items'];
}

export interface FetchTweetsActionInterface extends Action<TweetsActionsType>{
    type: TweetsActionsType.FETCH_TWEETS;
}

export interface SetTweetsLoadingStatusActionInterface extends Action<TweetsActionsType>{
    type: TweetsActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetAddTweetStateActionInterface extends Action<TweetsActionsType>{
    type: TweetsActionsType.SET_ADD_TWEET_STATE;
    payload: AddTweetState;
}


export interface FetchAddTweetActionInterface extends Action<TweetsActionsType>{
    type: TweetsActionsType.FETCH_ADD_TWEET;
    payload: {text: string, images: string[]};
}

export interface AddTweetActionInterface extends Action<TweetsActionsType>{
    type: TweetsActionsType.ADD_TWEET;
    payload: TweetInterface;
}

export interface RemoveTweetActionInterface extends Action<TweetsActionsType>{
    type: TweetsActionsType.REMOVE_TWEET;
    payload: string;
}
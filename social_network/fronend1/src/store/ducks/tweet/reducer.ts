import produce, {Draft} from 'immer';
import { TweetDataActions } from './actionCreators';
import {TweetDataActionsType} from '../tweet/contracts/actionTypes';
import { TweetStateInterface } from '../tweet/contracts/state';
import { LoadingStatus } from '../../types';

const initialTweetState: TweetStateInterface = {
    data: undefined,
    LoadingStatus: LoadingStatus.NEVER
};

export const tweetReducer = produce((draft: Draft<TweetStateInterface>, action: TweetDataActions) => {
    switch (action.type) {
        case TweetDataActionsType.SET_TWEET_DATA:
            draft.data = action.payload;
            draft.LoadingStatus = LoadingStatus.LOADED;
            break;

        case TweetDataActionsType.FETCH_TWEET_DATA:
            draft.data = undefined;
            draft.LoadingStatus = LoadingStatus.LOADING;
            break;

        case TweetDataActionsType.SET_LOADING_STATE:
            draft.LoadingStatus = action.payload;
            break;

        default:
            break;
    }

}, initialTweetState)
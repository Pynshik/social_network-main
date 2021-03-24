import { LoadingStatus } from "../../../types";

export enum AddTweetState {
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER'
}

export interface TweetInterface {
    _id: string;
    text: string;
    createdAt: string;
    images?: [];
    user: {
        fullname: string;
        username: string;
        avatarUrl: string;
    };
}

export interface TweetsStateInterface {
    items: TweetInterface[];
    LoadingStatus: LoadingStatus;
    addTweetState: AddTweetState;
}
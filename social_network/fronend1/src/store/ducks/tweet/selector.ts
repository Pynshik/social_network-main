import { RootState } from "../../../store/store";
import { LoadingStatus } from "../../types";
import { TweetInterface } from "../tweets/contracts/state";
import { TweetStateInterface } from "./contracts/state";

export const selectTweet = (state: RootState): TweetStateInterface => state.tweet;

export const selectTweetData = (state: RootState): TweetInterface | undefined => selectTweet(state).data;

export const selectLoadingStatus = (state: RootState): LoadingStatus => selectTweet(state).LoadingStatus;

export const selectIsTweetLoading = (state: RootState): boolean => 
    selectLoadingStatus(state) === LoadingStatus.LOADING;

export const selectIsTweetLoaded= (state: RootState): boolean => 
    selectLoadingStatus(state) === LoadingStatus.LOADED;
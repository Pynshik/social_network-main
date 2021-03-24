import { RootState } from "../../store";
import { LoadingStatus } from "../../types";
import { AddTweetState, TweetsStateInterface } from "./contracts/state";

export const selectTweetsState = (state: RootState): TweetsStateInterface => state.tweets;

export const selectTweetsItems = (state: RootState) => selectTweetsState(state).items;

export const selectLoadingStatus = (state: RootState): LoadingStatus => selectTweetsState(state).LoadingStatus;

export const selectAddTweetState = (state: RootState): AddTweetState => selectTweetsState(state).addTweetState;

export const selectIsTweetsLoading = (state: RootState): boolean => 
    selectLoadingStatus(state) === LoadingStatus.LOADING;

export const selectIsTweetsLoaded = (state: RootState): boolean => 
    selectLoadingStatus(state) === LoadingStatus.LOADED;
    
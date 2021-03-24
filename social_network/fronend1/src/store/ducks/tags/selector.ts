import { createSelector } from "reselect";
import { RootState } from "../../../store/store";
import { LoadingStatus } from "../../types";
import { TagsStateInterface } from "./contracts/state";

export const selectTags = (state: RootState): TagsStateInterface => state.tags;

export const selectTagsItems = createSelector(selectTags, tags => tags.items);

export const selectLoadingStatus = (state: RootState) => selectTags(state).LoadingStatus;

export const selectIsTagsLoading = (state: RootState): boolean => 
    selectLoadingStatus(state) === LoadingStatus.LOADING;

export const selectIsTagsLoaded= (state: RootState): boolean => 
    selectLoadingStatus(state) === LoadingStatus.LOADED;
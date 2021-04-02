import { TagsStateInterface} from './contracts/state';
import {Action} from 'redux';
import { LoadingStatus } from '../../types';

export enum TagsActionsType {
    SET_TAGS = 'tags/SET_TAGS',
    FETCH_TAGS = 'tags/FETCH_TAGS',
    SET_LOADING_STATE = 'tags/SET_LOADING_STATE',
}

export interface SetTagsActionInterface extends Action<TagsActionsType>{
    type: TagsActionsType.SET_TAGS;
    payload: TagsStateInterface['items'];
}

export interface FetchTagsActionInterface extends Action<TagsActionsType>{
    type: TagsActionsType.FETCH_TAGS;
}

export interface SetTagsLoadingStatusActionInterface extends Action<TagsActionsType>{
    type: TagsActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}


export const setTags = (payload: TagsStateInterface['items']): SetTagsActionInterface => ({
    type: TagsActionsType.SET_TAGS,
    payload: payload
});

export const fetchTags = (): FetchTagsActionInterface => ({
    type: TagsActionsType.FETCH_TAGS,
});

export const setTagsLoadingStatus = (payload: LoadingStatus): SetTagsLoadingStatusActionInterface => ({
    type: TagsActionsType.SET_LOADING_STATE,
    payload
});


export type TagsActions = SetTagsActionInterface | FetchTagsActionInterface | SetTagsLoadingStatusActionInterface;
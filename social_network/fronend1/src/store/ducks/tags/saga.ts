import { call, put, takeLatest } from 'redux-saga/effects'
import {TagsApi} from '../../../services/api/tagsApi';
import { LoadingStatus } from '../../types';
import { setTags, setTagsLoadingStatus, TagsActionsType } from './actionCreators';

export function* fetchTagsRequest(): any {
    try {
        const tags = yield call(TagsApi.fetchTags);
        yield put(setTags(tags));
    } catch (error) {
        yield put(setTagsLoadingStatus(LoadingStatus.ERROR))
    }
}

export function* tagsSaga() {
  yield takeLatest(TagsActionsType.FETCH_TAGS, fetchTagsRequest);
}
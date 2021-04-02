import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { fetchTagsRequest } from '../../store/ducks/tags/saga';
import * as actions from "../../store/ducks/tags/actionCreators";
import { TagsApi } from '../../services/api/tagsApi';
import { throwError } from 'redux-saga-test-plan/providers';
import { LoadingStatus } from '../../store/types';

it('should fetch tags', () => {
    
    const fakeTags = [
        { _id: "1", name: "Test", count: 19563 },
        { _id: "2", name: "Test2", count: 25693 },
    ];


    const saga = expectSaga(fetchTagsRequest)
        .provide([
            [call(TagsApi.fetchTags), fakeTags]
        ])
        .put({
            type: actions.TagsActionsType.SET_TAGS,
            payload: fakeTags,
        })

        .run()
})

it('handle error', () => {
    const error = new Error('error');

    const saga = expectSaga(fetchTagsRequest)
        .provide([
            [call(TagsApi.fetchTags), throwError(error)]
        ])
        .put({
            type: actions.TagsActionsType.SET_LOADING_STATE,
            payload: LoadingStatus.ERROR,
        })

        .run()
})
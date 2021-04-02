import * as LoadingStatus from '../../store/types';
import * as actions from '../../store/ducks/tags/actionCreators';

describe('create actions', () => {
    it('should create an action to set tags', () => {
        const tags = [
            { _id: 1, name: "Test", count: 19563},
            { _id: 2, name: "Test2", count: 25693}
        ];
        const expectedAction = {
            type: actions.TagsActionsType.SET_TAGS,
            payload: tags
        };

        expect(actions.setTags(tags)).toEqual(expectedAction);
    });

    it('should create an action to fetch tags', () => {
        const expectedAction = {
            type: actions.TagsActionsType.FETCH_TAGS
        };

        expect(actions.fetchTags()).toEqual(expectedAction);
    });

    it('should create an action to set tags loading status', () => {
        const expectedAction = {
            type: actions.TagsActionsType.SET_LOADING_STATE,
            payload: LoadingStatus,
        };

        expect(actions.setTagsLoadingStatus(LoadingStatus)).toEqual(expectedAction);
    });
})
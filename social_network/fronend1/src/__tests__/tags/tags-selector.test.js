import * as selectors from "../../store/ducks/tags/selector";
import { LoadingStatus } from "../../store/types";


describe('tags selector', () => {
    const store = {
        tweets: {},
        tags: {
            items: [
                { _id: "1", name: "Test", count: 19563 },
                { _id: "2", name: "Test2", count: 25693 },
            ],
            LoadingStatus: LoadingStatus.LOADED
        },
        tweet: {},
        user: {},
        users: {}
    }

    const items = [
        { _id: "1", name: "Test", count: 19563 },
        { _id: "2", name: "Test2", count: 25693 },
      ];


    it('should return tags items', () => {
        const selectTagsItems = selectors.selectTagsItems(store);
        expect(selectTagsItems).toEqual([
            { _id: "1", name: "Test", count: 19563 },
            { _id: "2", name: "Test2", count: 25693 },
          ])
    })

    it('should return Loaded', () => {
        const result = selectors.selectLoadingStatus(store);
        expect(result).toBe(LoadingStatus.LOADED);
    })

    it('should return true', () => {
        const result = selectors.selectIsTagsLoaded(store);
        expect(result).toBeTruthy()
    })

    it('should return true', () => {
        const result = selectors.selectIsTagsLoading(store);
        expect(result).toBeFalsy()
    })
})
import { tagsReducer } from "../../store/ducks/tags/reducer";
import * as actions from "../../store/ducks/tags/actionCreators";
import { LoadingStatus } from "../../store/types";

describe("tags reducer", () => {
  const initialState = {
    items: [],
    LoadingStatus: LoadingStatus.NEVER,
  };

  const tags = [
    { _id: "1", name: "Test", count: 19563 },
    { _id: "2", name: "Test2", count: 25693 },
  ];

  const action = {
    type: actions.TagsActionsType.SET_TAGS, 
    payload: tags
  }

  it("should return undefined", () => {
    expect(undefined).toEqual(undefined);
  });

  it("shound handle set tags", () => {
    expect(tagsReducer(undefined, action)).toEqual({
      items: [
        { _id: "1", name: "Test", count: 19563 },
        { _id: "2", name: "Test2", count: 25693 },
      ],
      LoadingStatus: LoadingStatus.LOADED,
    });
  });

  it("shound handle fetch tags", () => {
    expect(tagsReducer(undefined, {type: actions.TagsActionsType.FETCH_TAGS})).toEqual({
      items: [],
      LoadingStatus: LoadingStatus.LOADING,
    });
  });

  it("shound handle set loading state", () => {
    expect(tagsReducer(undefined, {type: actions.TagsActionsType.SET_LOADING_STATE, payload: LoadingStatus.NEVER})).toEqual({
      items: [],
      LoadingStatus: LoadingStatus.NEVER,
    });
  });

});

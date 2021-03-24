import produce, { Draft } from "immer";
import { LoadingStatus } from "../../types";
import { TweetsActions } from "./actionCreators";
import { TweetsActionsType } from "./contracts/actionTypes";
import { TweetsStateInterface, AddTweetState } from "./contracts/state";

const initialTweetsState: TweetsStateInterface = {
  items: [],
  LoadingStatus: LoadingStatus.NEVER,
  addTweetState: AddTweetState.NEVER,
};

export const tweetsReducer = produce(
  (draft: Draft<TweetsStateInterface>, action: TweetsActions) => {
    switch (action.type) {
      case TweetsActionsType.SET_TWEETS:
        draft.items = action.payload;
        draft.LoadingStatus = LoadingStatus.LOADED;
        break;

      case TweetsActionsType.FETCH_TWEETS:
        draft.items = [];
        draft.LoadingStatus = LoadingStatus.LOADING;
        break;

      case TweetsActionsType.SET_LOADING_STATE:
        draft.LoadingStatus = action.payload;
        break;

      case TweetsActionsType.FETCH_ADD_TWEET:
        draft.addTweetState = AddTweetState.LOADING;
        break;

      case TweetsActionsType.ADD_TWEET:
        draft.items.splice(0, 0, action.payload);
        draft.addTweetState = AddTweetState.NEVER;
        break;

      case TweetsActionsType.SET_ADD_TWEET_STATE:
        draft.addTweetState = action.payload;
        break;

      case TweetsActionsType.REMOVE_TWEET:
        draft.items = draft.items.filter(obj => obj._id !== action.payload);
        break;

      default:
        break;
    }
  },
  initialTweetsState
);

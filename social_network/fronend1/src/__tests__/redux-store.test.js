import { store } from "../store/store";
import { TagsActionsType } from "../store/ducks/tags/actionCreators";
import { TweetsActionsType } from "../store/ducks/tweets/contracts/actionTypes";
import { TweetDataActionsType } from "../store/ducks/tweet/contracts/actionTypes";
import { UserActionsType } from "../store/ducks/user/contracts/actionTypes";
import { UsersActionsType } from '../store/ducks/users/actionCreators';

import { LoadingStatus } from "../store/types";

describe("testing store", () => {
  describe("testing tags store through adding a tag", () => {
    const tags = [
      { _id: "1", name: "Test", count: 19563 },
      { _id: "2", name: "Test2", count: 25693 },
    ];

    beforeAll(() => {
      store.dispatch({
        type: TagsActionsType.SET_TAGS,
        payload: tags,
      });
    });

    it("should add tags", () => {
      expect(store.getState().tags.items.length).toBe(2);
    });

    it("should set tag count", () => {
      expect(store.getState().tags.items[1].count).toBe(25693);
    });
  });

  describe("testing tweets store through adding a tweet", () => {
    beforeAll(() => {
      store.dispatch({
        type: TweetsActionsType.ADD_TWEET,
        payload: {
          _id: "1",
          text: "test text",
          createdAt: "Apr 11 2020 12:54:43 GMT-0700 (PDT)",
          user: {
            fullname: "Only test user",
            username: "Super test user",
            avatarUrl: "",
          },
        },
      });
    });

    it("should add a new tweet", () => {
      expect(store.getState().tweets.items.length).toBe(1);
    });

    it("should set a tweet text", () => {
      expect(store.getState().tweets.items[0].text).toBe("test text");
    });

    it("should set user name", () => {
      expect(store.getState().tweets.items[0].user.username).toBe(
        "Super test user"
      );
    });
  });

  describe("testing tweet store through set a tweet data", () => {
    beforeAll(() => {
      store.dispatch({
        type: TweetDataActionsType.SET_TWEET_DATA,
        payload: {
          _id: "3",
          text: "text",
          createdAt: "Apr 11 2020 12:54:43 GMT-0700 (PDT)",
          user: {
            fullname: "Only test user",
            username: "Super test user",
            avatarUrl: "",
          },
        },
      });
    });

    it("should set a new text", () => {
      expect(store.getState().tweets.items.length).toBe(1);
    });

    it("should set a tweet text", () => {
      expect(store.getState().tweet.data.text).toBe("text");
    });

    it("should set user name", () => {
      expect(store.getState().tweet.data.user.username).toBe("Super test user");
    });
  });

  describe("testing user store through set a new user", () => {
    beforeAll(() => {
      store.dispatch({
        type: UserActionsType.SET_USER_DATA,
        payload: {
          _id: "1",
          email: "test@test.com",
          fullname: "User only test",
          username: "User",
          password: "123123123",
          avatarUrl: "",
          location: "",
          about: "",
          website: "",
        },
      });
    });

    it("should set a new user", () => {
      expect(store.getState().user.status).toBe(LoadingStatus.SUCCESS);
    });

    it("should set a user username", () => {
      expect(store.getState().user.data.username).toBe("User");
    });
  });

  
  describe("testing users store through set users", () => {
    beforeAll(() => {
      store.dispatch({
        type: UsersActionsType.SET_ITEMS,
        payload: [
          {
            _id: "1",
            email: "test@test.com",
            fullname: "User only test",
            username: "User",
            password: "123123123",
            avatarUrl: "",
            location: "",
            about: "",
            website: "",
          },
          {
            _id: "2",
            email: "test@test2.com",
            fullname: "User only test2",
            username: "User2",
            password: "123123123",
            avatarUrl: "",
            location: "",
            about: "",
            website: "",
          }
        ],
      });
    });

    it("should set users", () => {
      expect(store.getState().users.items.length).toBe(2);
    });

    it("should set a user email", () => {
      expect(store.getState().users.items[1].email).toBe("test@test2.com");
    });
  });
});

import * as LoadingStatus from '../../store/types';
import * as actions from '../../store/ducks/users/actionCreators';

describe('create actions', () => {
    it('should create an action to set users', () => {
        const users = [
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
          ];
        const expectedAction = {
            type: actions.UsersActionsType.SET_ITEMS,
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
          };

        expect(actions.setUsers(users)).toEqual(expectedAction);
    });

    it('should create an action to fetch users', () => {
        const expectedAction = {
            type: actions.UsersActionsType.FETCH_ITEMS
        };

        expect(actions.fetchUsers()).toEqual(expectedAction);
    });
})
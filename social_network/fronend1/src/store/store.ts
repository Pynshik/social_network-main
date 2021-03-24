import {applyMiddleware, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import rootSaga from './sagas';
import { TweetsStateInterface } from './ducks/tweets/contracts/state';
import { TagsStateInterface } from './ducks/tags/contracts/state';
import { TweetStateInterface } from './ducks/tweet/contracts/state';
import { UserStateInterface } from './ducks/user/contracts/state';
import { UsersStateInterface } from './ducks/users/contracts/state';

export interface RootState {
    tweets: TweetsStateInterface;
    tags: TagsStateInterface;
    tweet: TweetStateInterface;
    user: UserStateInterface;
    users: UsersStateInterface;
}

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

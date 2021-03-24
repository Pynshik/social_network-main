import TwitterIcon from '@material-ui/icons/Twitter';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Home } from './pages/Home';
import SignIn from './pages/SignIn';
import {User} from './pages/User/index';
import {Layout} from './pages/Layout';
import { useHomeStyles } from './pages/Home/theme';
import { fetchUserData } from './store/ducks/user/actionCreators';
import { selectIsAuth, selectUserLoadingStatus } from './store/ducks/user/selector';
import { LoadingStatus } from './store/types';
import { Search } from './pages/Search';

function App() {
  const classes = useHomeStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const loadingStatus = useSelector(selectUserLoadingStatus);
  const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.LOADING;

  React.useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch])

  React.useEffect(() => {
    if (!isAuth && isReady) {
      history.push('/signin');
    } else if(history.location.pathname === '/') {
      history.push('/home');
    }
  }, [isAuth, isReady, history])

  if (!isReady) {
    return (
      <div className={classes.centered}>
        <TwitterIcon color="primary" style={{ width: 80, height: 80 }} />
      </div>
    );
  }

  return (
    <div className="App">
      <Switch>
        <Route path='/signin' component={SignIn} exact />
        <Layout>
          <Route path='/home' component={Home} />
          <Route path='/users/:id' component={User} />
          <Route path='/search' component={Search} />
        </Layout>
      </Switch>
    </div>
  );
}

export default App;

import React from 'react';
import { Paper, Typography, CircularProgress } from '@material-ui/core';

import { useHomeStyles } from '../Home/theme'
import { Tweet } from '../../components/Tweet';
import { AddTweetForm } from '../../components/AddTweetForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsTweetsLoading, selectTweetsItems } from '../../store/ducks/tweets/selector';
import { Route } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { FullTweet } from './components/FullTweet';
import { fetchTweets } from '../../store/ducks/tweets/actionCreators';
import { fetchTags } from '../../store/ducks/tags/actionCreators';


export const Home = (): React.ReactElement => {
    const classes = useHomeStyles();
    const dispatch = useDispatch();
    const tweets = useSelector(selectTweetsItems);
    const isLoading = useSelector(selectIsTweetsLoading);

    React.useEffect(() => {
        dispatch(fetchTweets());
        dispatch(fetchTags());
    }, [dispatch]);

    return (
        <Paper className={classes.tweetsWrapper} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
                <Route path="/home/:any">
                    <BackButton />
                </Route>
                <Route path={['/home', '/home/search']} exact>
                    <Typography variant="h6">Твиты</Typography>
                </Route>
                <Route path="/home/tweet/">
                    <Typography variant="h6">Твитнуть</Typography>
                </Route>
            </Paper>
            <Route path={['/home', '/home/search']} exact>
                <Paper>
                    <div className={classes.addForm}><AddTweetForm classes={classes} /></div>
                    <div className={classes.addFormBottomLine} />
                </Paper>
            </Route>
            <Route path="/home" exact>
                {isLoading ? (
                    <div className={classes.tweetsCentred}>
                        <CircularProgress />
                    </div>
                ) : (
                        tweets.map(tweet =>
                            <Tweet key={tweet._id}
                                classes={classes}
                                {...tweet}
                                images={tweet.images}
                            />)
                    )}
            </Route>

            <Route path="/home/tweet/:id" component={FullTweet} exact />
        </Paper>
    );
}
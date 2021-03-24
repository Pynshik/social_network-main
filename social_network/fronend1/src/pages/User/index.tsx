import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Tweet } from '../../components/Tweet';
import { selectIsTweetsLoading, selectTweetsItems } from '../../store/ducks/tweets/selector';
import { BackButton } from '../../components/BackButton';
import { useHomeStyles } from '../Home/theme';

import './User.scss';
import classNames from 'classnames';
import { fetchTweets } from '../../store/ducks/tweets/actionCreators';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UserInterface } from '../../store/ducks/user/contracts/state';
import { AuthApi } from '../../services/api/AuthApi';

export const User = () => {
    const classes = useHomeStyles();
    const tweets = useSelector(selectTweetsItems);
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsTweetsLoading);
    
    const [activeTab, setActiveTab] = React.useState<number>(0);
    const [userData, setUserData] = React.useState<UserInterface | undefined>();

    const handleChange = (event: any, newValue: any) => {
        setActiveTab(newValue);
    };

    React.useEffect(() => {
        const userId = window.location.pathname.split('/').pop();
        dispatch(fetchTweets());
        if(userId) {
            AuthApi.getUserInfo(userId).then(({ data }) => {
                setUserData(data);
            })
            .catch((error) => console.log(error));
        }
    }, [dispatch]);

    return (
        <Paper className={classNames(classes.tweetsWrapper, 'user')} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
                <BackButton />

                <div>
                    <Typography variant="h5">{userData?.fullname}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        {tweets.length} твит(a/ов)
                    </Typography>
                </div>
            </Paper>

            <div className="user__header"></div>
            <div className="user__info">
                <Avatar />
                <h2 className="user__info-fullname">{userData?.fullname}</h2>
                <span className="user__info-username">@{userData?.username}</span>
                <p className="user__info-description">Description</p>
                <ul className="user__info-details">
                    <li>City, Country</li>
                    <li><a className="link" href="#">website</a></li>
                    <br />
                    <li>Дата рождения: dateOfBirth</li>
                    <li>Регистрация: dateOfRegistration</li>
                </ul>
            </div>
            <Tabs
                value={activeTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
            >
                <Tab label="Твиты" />
                <Tab label="Твиты и ответы" />
                <Tab label="Медиа" />
                <Tab label="Нравится" />
            </Tabs>
            <div className='user__tweets'>
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
            </div>
        </Paper>
    )
}

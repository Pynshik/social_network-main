import React from 'react';
import mediumZoom from 'medium-zoom'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import format from 'date-fns/format';
import ruLang from "date-fns/locale/ru";
import { Divider, Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import LikeIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Reply';

import { Tweet } from '../../../components/Tweet';
import { fetchTweetData, setTweetData } from '../../../store/ducks/tweet/actionCreators';
import { selectIsTweetLoading, selectTweetData } from '../../../store/ducks/tweet/selector';
import { useHomeStyles } from '../theme';
import { ImageList } from '../../../components/ImageList';

export const FullTweet: React.FC = (): React.ReactElement | null => {
    const classes = useHomeStyles();
    const dispatch = useDispatch();
    const tweetData = useSelector(selectTweetData);
    const isLoading = useSelector(selectIsTweetLoading);
    const params: { id?: string } = useParams();
    const id = params.id;

    React.useEffect(() => {
        if (id) {
            dispatch(fetchTweetData(id));
        }

        //@ts-ignore
        window.mediumZoom = mediumZoom;

        return () => {
            dispatch(setTweetData(undefined));
        };
    }, [dispatch, id])

    React.useEffect(() => {
        if (!isLoading)
            mediumZoom('.tweet-images img');
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className={classes.tweetsCentred}>
                <CircularProgress />
            </div>
        );
    }

    if (tweetData) {
        return (
            <>
                <Paper className={classes.fullTweet}>
                    <div style={{ padding: 0 }} className={classNames(classes.tweetsHeader)}>
                        <Avatar
                            className={classes.tweetAvatar}
                            alt={`Аватарка пользователя ${tweetData.user.username}`}
                            src={tweetData.user.avatarUrl}
                        />
                        <div>
                            <Typography >
                                <b>{tweetData.user.fullname}</b>
                                <div>
                                    <span className={classes.tweetUserName}>@{tweetData.user.username}</span>&nbsp;
                </div>
                            </Typography>
                        </div>
                    </div>
                    <Typography className={classes.fullTweetText} variant="body1" gutterBottom>
                        {tweetData.text}
                        <div className="tweet-images">
                            {tweetData.images && <ImageList images={tweetData.images} />}
                        </div>
                    </Typography>
                    <Typography>
                        <span className={classes.tweetUserName}>{format(new Date(tweetData.createdAt), 'H:mm', { locale: ruLang })} · </span>
                        <span className={classes.tweetUserName}>{format(new Date(tweetData.createdAt), 'dd MMM yyyy г.', { locale: ruLang })}</span>
                    </Typography>
                    <Divider />
                    <div className={classNames(classes.tweetFooter)}>
                        <IconButton>
                            <CommentIcon style={{ fontSize: 25 }} />
                        </IconButton>
                        <IconButton>
                            <RepeatIcon style={{ fontSize: 25 }} />
                        </IconButton>
                        <IconButton>
                            <LikeIcon style={{ fontSize: 25 }} />
                        </IconButton>
                        <IconButton>
                            <ShareIcon style={{ fontSize: 25 }} />
                        </IconButton>
                    </div>
                </Paper>
                <Divider />
                <Tweet
                    _id="1"
                    text="Any more to move?"
                    createdAt={new Date().toString()}
                    user={{
                        fullname: 'Arlene Andrews',
                        username: 'ArleneAndrewq_1',
                        avatarUrl: 'https://images.unsplash.com/photo-1611615617506-752b70023339?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
                    }}
                    classes={classes}
                />
                <Tweet
                    _id="1"
                    text="Any more to move?"
                    createdAt={new Date().toString()}
                    user={{
                        fullname: 'Arlene Andrews',
                        username: 'ArleneAndrewq_1',
                        avatarUrl: 'https://images.unsplash.com/photo-1611615617506-752b70023339?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
                    }}
                    classes={classes}
                />
                <Tweet
                    _id="1"
                    text="Any more to move?"
                    createdAt={new Date().toString()}
                    user={{
                        fullname: 'Arlene Andrews',
                        username: 'ArleneAndrewq_1',
                        avatarUrl: 'https://images.unsplash.com/photo-1611615617506-752b70023339?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
                    }}
                    classes={classes}
                />
            </>
        );
    }

    return null;
};
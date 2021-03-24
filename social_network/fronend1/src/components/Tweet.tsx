import React from "react";
import classNames from 'classnames';
import { useHomeStyles } from "../pages/Home/theme";
import { IconButton, Paper, Typography, Avatar } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import LikeIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Reply';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { ImageList } from "./ImageList";
import { removeTweet } from "../store/ducks/tweets/actionCreators";
import { useDispatch } from "react-redux";

interface TweetPropsInterface {
  _id: string;
  text: string;
  classes: ReturnType<typeof useHomeStyles>;
  createdAt: string;
  images?: string[];
  user: {
    fullname: string;
    username: string;
    avatarUrl: string;
  },
};

export const Tweet: React.FC<TweetPropsInterface> = ({
  _id, 
  text, 
  createdAt, 
  user, 
  images,
  classes 
}: TweetPropsInterface): React.ReactElement => {
const dispatch = useDispatch();
const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);

const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  event.stopPropagation();
  event.preventDefault();
  setAnchorEl(event.currentTarget);
};

const handleClose = (event: React.MouseEvent<HTMLElement>) => {
  event.stopPropagation();
  event.preventDefault();
  setAnchorEl(null);
};

const handleRemove = (event: React.MouseEvent<HTMLElement>): void => {
  handleClose(event);
  if(window.confirm('Вы действительно хотите удалить твит?')) {
    dispatch(removeTweet(_id));
  }
};

  return (
    <Link className={classes.tweetWrapper} to={`/home/tweet/${_id}`}>
      <Paper
        className={classNames(classes.tweet, classes.tweetsHeader)}
        variant="outlined"
      >
        <Avatar
          className={classes.tweetAvatar}
          alt={`Аватарка пользователя ${user.username}`}
          src={user.avatarUrl}
        />
        <div className={classes.tweetContent}>
          <div className={classes.tweetHeader}>
            <div>
              <b>{user.fullname}</b>{" "}
              <span className={classes.tweetUserName}>@{user.username}</span>&nbsp;
              <span className={classes.tweetUserName}>·</span>&nbsp;
              <span className={classes.tweetUserName}>{formatDate(new Date(createdAt))}</span>
            </div>
            <div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                  <MenuItem onClick={handleClose}>
                    Редактировать
                  </MenuItem>
                  <MenuItem onClick={handleRemove}>
                    Удалить твит
                  </MenuItem>
              </Menu>
            </div>
          </div>
          <Typography variant="body1" gutterBottom>
            {text}
            {images && <ImageList images={images} />}
          </Typography>
          <div className={classes.tweetFooter}>
            <div>
              <IconButton>
                <CommentIcon style={{ fontSize: 20 }} />
              </IconButton>
              <span>1</span>
            </div>
            <div>
              <IconButton>
                <RepeatIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
            <div>
              <IconButton>
                <LikeIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
            <div>
              <IconButton>
                <ShareIcon style={{ fontSize: 20 }} />
              </IconButton>
            </div>
          </div>
        </div>
      </Paper>
    </Link>
  );
};

import React from 'react';
import { IconButton, Typography, Button, Hidden } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import NotificationIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MessageIcon from '@material-ui/icons/EmailOutlined';
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined';
import ListIcon from '@material-ui/icons/ListAltOutlined';
import UserIcon from '@material-ui/icons/PersonOutlineOutlined';
import CreateIcon from '@material-ui/icons/Create';
import { useHomeStyles } from '../pages/Home/theme';

import { ModalBlock } from './ModalBlock';
import { AddTweetForm } from './AddTweetForm';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {selectUserData} from '../store/ducks/user/selector';

interface SideMenuPropsInterface {
    classes: ReturnType<typeof useHomeStyles>;
};

export const SideMenu: React.FC<SideMenuPropsInterface> = ({ classes }: SideMenuPropsInterface): React.ReactElement => {
    const [visibleAddTweet, setVisibleAddTweet] = React.useState<boolean>(false);
    const userData = useSelector(selectUserData, () => {
        return true;
    });

    const handleClickAddTweet = () => {
        setVisibleAddTweet(true);
    };

    const onCloseAddTweet = () => {
        setVisibleAddTweet(false);
    };

    return (
        <ul className={classes.sideMenuList}>
            <li className={classes.sideMenuListItem}>
                <Link to="/home">
                    <IconButton className={classes.logo}>
                        <TwitterIcon color="primary" className={classes.logoIcon} />
                    </IconButton>
                </Link>
            </li>
            <li className={classes.sideMenuListItem}>
                <div>
                    <SearchIcon className={classes.sideMenuListIcon} />
                    <Hidden smDown>
                        <Typography className={classes.sideMenuListItemLabel} variant="h6">Поиск</Typography>
                    </Hidden>
                </div>
            </li>
            <li className={classes.sideMenuListItem}>
                <div>
                    <NotificationIcon className={classes.sideMenuListIcon} />
                    <Hidden smDown>
                        <Typography className={classes.sideMenuListItemLabel} variant="h6">Уведомления</Typography>
                    </Hidden>
                </div>
            </li>
            <li className={classes.sideMenuListItem}>
                <div>
                    <MessageIcon className={classes.sideMenuListIcon} />
                    <Hidden smDown>
                        <Typography className={classes.sideMenuListItemLabel} variant="h6">Сообщения</Typography>
                    </Hidden>
                </div>
            </li>
            <li className={classes.sideMenuListItem}>
                <div>
                    <BookmarkIcon className={classes.sideMenuListIcon} />
                    <Hidden smDown>
                        <Typography className={classes.sideMenuListItemLabel} variant="h6">Закладки</Typography>
                    </Hidden>
                </div>
            </li>
            <li className={classes.sideMenuListItem}>
                <div>
                    <ListIcon className={classes.sideMenuListIcon} />
                    <Hidden smDown>
                        <Typography className={classes.sideMenuListItemLabel} variant="h6">Список</Typography>
                    </Hidden>
                </div>
            </li>
            <li className={classes.sideMenuListItem}>
                <Link to={`/users/${userData?._id}`}>
                    <div>
                        <UserIcon className={classes.sideMenuListIcon} />
                        <Hidden smDown>
                            <Typography className={classes.sideMenuListItemLabel} variant="h6">Профиль</Typography>
                        </Hidden>
                    </div>
                </Link>
            </li>
            <li className={classes.sideMenuListItem}>
                <Button
                    onClick={handleClickAddTweet}
                    className={classes.sideMenuButton}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    <Hidden smDown>Твитнуть</Hidden>
                    <Hidden mdUp>
                        <CreateIcon />
                    </Hidden>
                </Button>
                <ModalBlock
                    onClose={onCloseAddTweet}
                    visible={visibleAddTweet}
                >
                    <div style={{ width: 550 }}>
                        <AddTweetForm maxRows={15} classes={classes} />
                    </div>
                </ModalBlock>
            </li>
        </ul>
    );
}
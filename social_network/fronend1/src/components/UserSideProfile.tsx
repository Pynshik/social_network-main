import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHomeStyles } from "../pages/Home/theme";
import { Typography, Avatar, Hidden } from "@material-ui/core";
import ArrowBottomIcon from '@material-ui/icons/ExpandMore';
import { selectUserData } from "../store/ducks/user/selector";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {Link} from "react-router-dom";
import { signOut } from "../store/ducks/user/actionCreators";

interface UserSideProfilePropsInterface {
    classes: ReturnType<typeof useHomeStyles>;
}

export const UserSideProfile: React.FC<UserSideProfilePropsInterface> = ({
    classes
}: UserSideProfilePropsInterface) => {
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpenPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopup = (): void => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        window.localStorage.removeItem('token');
        dispatch(signOut());
    };

    if (!userData) {
        return null;
    }

    return (
        <>
            <div onClick={handleOpenPopup} className={classes.sideProfile}>
                <Avatar />
                <Hidden smDown>
                <div className={classes.sideProfileInfo}>
                    <b>{userData?.fullname}</b>
                    <Typography>@{userData.username}</Typography>
                </div>
                <ArrowBottomIcon />
                </Hidden>
            </div>
            <Menu
                classes={{ paper: classes.profileMenu }}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClosePopup}
            >
                <Link to={`/users/${userData._id}`}>
                    <MenuItem onClick={handleClosePopup}>Профиль</MenuItem>
                </Link>
                <MenuItem onClick={handleSignOut}>Выйти</MenuItem>
            </Menu>
        </>
    );
};

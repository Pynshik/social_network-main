import React from 'react';
import {makeStyles, Button, Typography } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/PeopleOutline';
import MessageIcon from '@material-ui/icons/ModeCommentOutlined';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';
import { GoogleAuth } from '../../components/GoogleAuth';

export const useStylesSignIn = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        height: '100vh',
    },
    blueSide: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#71C9F8',
        flex: '1 2 45%',
        overflow: 'hidden',
        position: 'relative',
    },
    blueSideBigIcon: {
        position: 'absolute',
        left: '45%',
        top: '45%',
        transform: 'translate(-50%, -50%)',
        width: '250%',
        height: '250%',
    },
    blueSideList: {
        position: 'relative',
        listStyleType: 'none',
        width: 370,
        padding: 0,
        margin: 0,
        '& h6': {
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            fontWeight: 500,
        },
    },
    blueSideListIcon: {
        fontSize: 32,
        marginRight: 15,
    },
    blueSideListItem: {
        marginBottom: 30,
    },
    loginSide: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        flex: '0 0 55%',
        padding: 20,
        overflow: 'hidden',
    },
    loginSideWrapper: {
        width: 380,
    },
    loginSideIcon: {
        fontSize: 50,
    },
    loginSideTitle: {
        fontWeight: 700,
        marginTop: 30,
    },
    loginSideField: {
        marginBottom: theme.spacing(3),
    },
    registerField: {
        marginBottom: theme.spacing(3),
    },
    loginFormControl: {
        marginBottom: theme.spacing(3),
        overflow: 'auto',
    },
}));

const SignIn: React.FC = (): React.ReactElement => {
    const classes  = useStylesSignIn();
    const [visibleModal, setVisibleModal] = React.useState<'signIn' | 'signUp'>();

    const handleClickOpenSignIn = () => {
        setVisibleModal('signIn');
    };

    const handleClickOpenSignUp = () => {
        setVisibleModal('signUp');
    };

    const handleCloseModal = (): void => {
        setVisibleModal(undefined);
    };

    return (
        <div className = {classes.wrapper}>
            <section className = {classes.blueSide}>
                <TwitterIcon color="primary" className={classes.blueSideBigIcon}/>
                <ul className={classes.blueSideList}>
                    <li className={classes.blueSideListItem}>
                        <Typography gutterBottom variant="h6">
                            <SearchIcon className={classes.blueSideListIcon} />
                            Читайте о том, что вам интересно.
                        </Typography>
                    </li>
                    <li className={classes.blueSideListItem}>
                        <Typography gutterBottom variant="h6">
                            <PeopleIcon className={classes.blueSideListIcon} />
                            Узнайте, о чем говорят в мире.
                        </Typography>
                    </li>
                    <li className={classes.blueSideListItem}>
                        <Typography gutterBottom variant="h6">
                            <MessageIcon className={classes.blueSideListIcon} />
                            Присоединяйтесь к общению.
                        </Typography>
                    </li>
                </ul>
            </section>
            <section className = { classes.loginSide}>
                <div className = {classes.loginSideWrapper}>
                    <TwitterIcon color="primary" className={classes.loginSideIcon}/>
                    <Typography className={classes.loginSideTitle} variant="h2">
                        В курсе происходящего
                    </Typography>
                    <Typography className={classes.loginSideTitle} variant="h6">
                        Присоединяйтесь к Твиттеру прямо сейчас!
                    </Typography>
                    <br />
                    <Button 
                        onClick={handleClickOpenSignUp} 
                        style={{ marginBottom: 20}} 
                        variant="contained" 
                        color="primary">
                        Зарегистрироваться
                    </Button>
                    <Button 
                        onClick={handleClickOpenSignIn} 
                        variant="outlined" 
                        color="primary">
                        Войти
                    </Button>
                    <GoogleAuth />
                <LoginModal open={visibleModal === 'signIn'} onClose={handleCloseModal} />
                <RegisterModal open={visibleModal === 'signUp'} onClose={handleCloseModal} />
                </div>
            </section> 
        </div>
    )
}

export default SignIn;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchSignUpGoogle } from '../store/ducks/user/actionCreators';
import { selectIsAuth } from '../store/ducks/user/selector';

const styles = {
    googleButton: {
        height: '36px',
        width: '120px',
        display: 'flex',
        backgroundColor: '#fff',
        color: '#757575',
        boxShadow: '0 2px 4px 0 rgb(0 0 0 / 25%)',
        transition: 'background-color .218s,border-color .218s,box-shadow .218s',
        backgroundImage: 'none',
        cursor: 'pointer',
        outline: 'none',
        overflow: 'hidden',
        alignItems: 'center',
        '&::hover': {
            border: '1px solid blue',
        }
    },
    googleIcon: {
        width: '18px',
        height: '18px',
        margin: '0 15px 0 5px',
        padding: '3px',
        alignItems: 'center',
        backgroundImage: 'url(google-icon.png)',
        backgroundSize: 'cover',
    },
};

export const GoogleAuth = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const history = useHistory();
    
    React.useEffect(() => {
        if(!isAuth) {
            history.push('/signin');
        } else {
            history.push('/home');
        }
    },[])

    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: '931705110004-o2e60qde6fu2voo6f6a582lbrj2kbvos.apps.googleusercontent.com'
        })
        .then(() => console.log('init OK'), () => console.log('init ERR'))
        .catch((error: any) => console.log(error))
    });

    const signIn = () => {
        //@ts-ignore
        const _authOk = async (googleUser) => {
            try {
                const data = {
                    email: googleUser.getBasicProfile().getEmail(),
                    username: googleUser.getBasicProfile().getEmail(),
                    fullname: googleUser.getBasicProfile().getName(),
                    avatarUrl: googleUser.getBasicProfile().getImageUrl(),
                }
                 //@ts-ignore
                dispatch(fetchSignUpGoogle(data));
            } catch (error) {
                console.log('error in GoogleAuth');
            } 
        };

        const _authErr = () => {
            console.log('Auth Err');
        }
        
        const GoogleAuth = gapi.auth2.getAuthInstance();
        GoogleAuth.signIn(
            {
                scope: 'profile email'
            }
        ).then(_authOk, _authErr)
        .catch((error: any) => console.log(error))
    }

    return (
        <div style={{margin: '24px 0 0 126px',}}>
            <div onClick={signIn} style={styles.googleButton}>
                <div style={styles.googleIcon}></div>
                    Войти
            </div>
        </div>
    )
}

//@ts-ignore
const gapi = window.gapi;
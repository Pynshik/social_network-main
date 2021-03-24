import grey from '@material-ui/core/colors/grey';
import { makeStyles, Theme } from '@material-ui/core';

export const useHomeStyles = makeStyles((theme: Theme) => ({
    centered: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    wrapper: {
        height: '100vh',
    },
    logo: {
        margin: '10px 0',
    },
    logoIcon: {
        fontSize: 36,
    },
    sideMenuList: {
        position: 'sticky',
        top: 0,
        listStyle: 'none',
        padding: 0,
        margin: 0,
        maxWidth: 230,
    },
    sideMenuListItem: {
        cursor: 'pointer',
        '& div': {
            display: 'inline-flex',
            alignItems: 'center',
            position: 'relative',
            padding: '0 25px 0 20px',
            height: 50,
            borderRadius: 30,
            transition: 'background-color 0.1s ease-in-out',
        },
        '& a': {
            textDecoration: 'none',
            color: 'black',
        },
        '&:hover': {
            '& div': {
                backgroundColor: 'rgba(29, 161, 242, 0.1)',
                '& h6': {
                    color: theme.palette.primary.main,
                },
                '& svg path': {
                    fill: theme.palette.primary.main,
                },
            },
        }
    },
    sideMenuListItemLabel: {
        fontWeight: 700,
        fontSize: 20,
        marginLeft: 15,
    },
    sideMenuListIcon: {
        fontSize: 28,
        marginLeft: -5,
    },
    sideMenuButton: {
        padding: theme.spacing(3.2),
        marginTop: theme.spacing(2),
        minwidth: '100%',
    },
    sideProfile: {
        display: 'flex',
        position: 'fixed',
        width: 208,
        bottom: 10,
        cursor: 'pointer',
        padding:'10px 15px',
        alignItems: 'center',
        borderRadius: '50px',
        justifyContent: 'space-between',
        
    },
    sideProfileInfo: {
        marginRight: 40,
    },
    profileMenu: {
        top: 'auto !important',
        width: '210px !important',
        bottom: '70px !important',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: 20,
        boxShadow: '1px 1px 15px rgb(0 0 0 / 10%)',
        '& a': {
            color: 'black',
            textDecoration: 'none',
        }
    },
    tweetsWrapper: {
        height: '100%',
        borderRadius: 0,
        borderTop: '0',
        borderBottom: '0',
    },
    tweet: {
        display: 'flex',
        cursor: 'pointer',
        paddingTop: 15,
        paddingLeft: 10,
        '&:hover': {
            backgroundColor: 'rgb(245, 248, 250)',
        },
    },
    tweetWrapper: {
        color: 'inherit',
        textDecoration: 'none',
    },
    tweetsCentred: {
        textAlign: 'center',
        marginTop: 30,
    },
    tweetAvatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: 15,
    },
    tweetsHeader: {
        display: 'flex',
  
        borderRadius: 0,
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        padding: '10px 15px',
        '& h6': {
            fontWeight: 800,
        },
    },
    tweetHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tweetContent: {
        flex: 1,
    },
    tweetFooter: {
        display: 'flex',
        width: '100%',
        position: 'relative',
        left: -13,
        justifyContent: 'space-between',
    },
    tweetUserName: {
        color: grey[500],
    },
    fullTweet: {
        padding: 22,
    },
    fullTweetText: {
        fontSize: 20,
        marginTop: 10,
        wordBreak: 'break-word',
    },
    rightSide: {
        paddingTop: 20,
        position: 'sticky',
        top: 0,
    },
    rightSideBlock: {
        backgroundColor: '#F5F8FA',
        borderRadius: 15,
        marginTop: 20,
        '& .MuiList-root': {
            paddingTop: 0,
        },
    },
    rightSideBlockHeader: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        backgroundColor: 'transparent',
        padding: '13px 18px',
        '& b': {
            fontSize: 20,
            fontWeight: 800,
        },
    },
    rightSideBlockItem: {
        cursor: 'pointer',
        '& .MuiTypogbraphy-body1': {
            fontWeight: 700,
        },
        '& .MuiListItemAvatar-root': {
            minWidth: 50,
        },
        '& .MuiListItemText-root': {
            margin: 0,
        },
        '&:hover': {
            backgroundColor: '#edf3f6',
        },
        '& a': {
            color: 'inherit',
            textDecoration: 'none',
        },
    },
    addForm: {
        padding: 20,
    },
    addFormBody: {
        display: 'flex',
        width: '100%',
    },
    addFormBottom: {
        display: 'flex',
    },
    addFormBottomActions: {
        marginTop: 10,
        paddingLeft: 55,
        justifyContent: 'flex-start',
    },
    addFormTextarea: {
        width: '100%',
        border: 0,
        fontSize: 20,
        outline: 'none',
        fontFamily: 'inherit',
        resize: 'none',
    },
    addFormBottomLine: {
        height: 12,
        backgroundColor: '#E6ECF0',
    },
    addFormCircleProgress: {
        position: 'relative',
        width: 20,
        height: 20,
        margin: '0 15px 0 5px',
        '& .MuiCircularProgress-root': {
            position: 'absolute',
        },
    },
    addFormBottomRight: {
        display: 'flex',
        alignItems: 'center',

    },
    imagesList: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
    },
    imagesListItem: {
        width: 50,
        height: 50,
        marginRight: 10,
        marginBottom: 10,
        position: 'relative',
        '& img': {
            width: '100%',
            height:'100%',
            'object-fit': 'cover',
            borderRadius: 6,
        },
        '& svg': {
            fill: 'white',
        },
    },
    imagesListItemRemove: {
        position: 'absolute',
        top: -8,
        right: -6,
        padding: '0 !important',
        backgroundColor:'#1da1f2 !important',
    },
}));

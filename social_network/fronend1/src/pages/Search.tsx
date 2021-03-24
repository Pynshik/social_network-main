import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import { SearchTextField } from '../components/SearchTextField';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { TweetsApi } from '../services/api/tweetsApi';
import { useHomeStyles } from './Home/theme';
import { TweetInterface } from '../store/ducks/tweets/contracts/state';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { Tweet } from '../components/Tweet';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BackButton } from '../components/BackButton';

export const Search = () => {
    const classes = useHomeStyles();

    const [activeTab, setActiveTab] = React.useState<number>(0);
    const [searchText, setSearchText] = React.useState<string>();
    const [tweets, setTweets] = React.useState<TweetInterface[] | undefined>();

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.currentTarget.value);
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (searchText) {
                TweetsApi.searchTweets(searchText).then((data) => {
                    setTweets(data);
                })
                .catch((error: any) => console.log(error))
            }
        }
    }

    const handleChange = (event: any, newValue: any) => {
        setActiveTab(newValue);
    };

    return (
        <>
            <div style={{ display: 'flex', marginTop: '40px' }}>
                <BackButton />
                <div>
                    <SearchTextField
                        value={searchText}
                        onChange={handleChangeSearch}
                        onKeyPress={handleKeyPress}
                        variant="outlined"
                        placeholder="Поиск по Твиттеру"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />
                </div>
            </div>
            <Paper className={classNames(classes.tweetsWrapper, 'user')} variant="outlined">
                <Tabs
                    value={activeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    centered
                >
                    <Tab label="Твиты" />
                    <Tab label="Люди" disabled/>
                </Tabs>
                <div className='user__tweets'>
                    {tweets ? tweets.map(tweet =>
                        <Tweet key={tweet._id}
                            classes={classes}
                            {...tweet}
                            images={tweet.images}
                        />
                    ) : (
                        <p>
                            По вашему запросу ничего не найдено
                        </p>
                    )}
                </div>
            </Paper>
        </>
    )
}
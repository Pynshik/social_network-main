import React from 'react';
import classNames from 'classnames';
import Alert from '@material-ui/lab/Alert';
import { Avatar, Button, CircularProgress, TextareaAutosize } from "@material-ui/core";
import { useHomeStyles } from '../pages/Home/theme';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddTweet, setAddTweetState } from '../store/ducks/tweets/actionCreators';
import { selectAddTweetState } from '../store/ducks/tweets/selector';
import { AddTweetState } from '../store/ducks/tweets/contracts/state';
import { UploadImages } from './UploadImages';
import { uploadImage } from '../utils/uploadImage';

export interface ImageObj{
    blobUrl: string,
    file: File,
}

interface AddTweetFormPropsnterface {
    classes: ReturnType<typeof useHomeStyles>;
    maxRows?: number,
}

const MAX_LENGTH = 280;

export const AddTweetForm: React.FC<AddTweetFormPropsnterface> = ({
    classes,
    maxRows
}: AddTweetFormPropsnterface): React.ReactElement => {
    const dispatch = useDispatch();
    const [text, setText] = React.useState<string>('');
    const [images, setImages] = React.useState<ImageObj[]>([]);

    const addTweetState = useSelector(selectAddTweetState);
    const textLimitPecent = Math.round(text.length / MAX_LENGTH * 100);
    const limit = MAX_LENGTH - text.length;

    const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget) {
            setText(e.currentTarget.value);
        }
    };

    const handleClickAddTweet = async (): Promise<void> => {
        try {
            let result = [];
            dispatch(setAddTweetState(AddTweetState.LOADING));
            for (let i = 0; i < images.length; i++){
                const file = images[i].file;
                const {url} = await uploadImage(file);
                result.push(url);
            }
            dispatch(fetchAddTweet({ text, images: result }));
            setText('');
            setImages([]);
        } catch (error) {
            console.log('error in AddTweetForm');
        }
    };

    return (
        <div>
            <div className={classes.addFormBody}>
                <Avatar
                    className={classes.tweetAvatar}
                    alt={`Аватарка пользователя UserAvatar`}
                />
                <TextareaAutosize
                    onChange={handleChangeTextarea}
                    className={classes.addFormTextarea}
                    placeholder="Что происходит?"
                    value={text}
                    rowsMax={maxRows}
                />
            </div>
            <div className={classes.addFormBottom}>
                <div className={classNames(classes.tweetFooter, classes.addFormBottomActions)}>
                    <UploadImages images={images} onChangeImages={setImages} />
                </div>
                <div className={classes.addFormBottomRight}>
                    {text && (
                        <>
                            <span>{limit}</span>
                            <div className={classes.addFormCircleProgress}>
                                <CircularProgress
                                    variant="static"
                                    size={20}
                                    thickness={5}
                                    value={text.length >= MAX_LENGTH ? 100 : textLimitPecent}
                                    style={text.length >= MAX_LENGTH ? { color: 'red' } : undefined} />
                                <CircularProgress
                                    style={{ color: 'rgba(0, 0, 0, 0.1)' }}
                                    variant="static"
                                    size={20}
                                    thickness={4}
                                    value={100}
                                />
                            </div>
                        </>
                    )}
                    <Button
                        onClick={handleClickAddTweet}
                        disabled={addTweetState === AddTweetState.LOADING || !text || text.length > MAX_LENGTH}
                        color="primary"
                        variant="contained">
                        {addTweetState === AddTweetState.LOADING ?  (
                        <CircularProgress color="inherit" size={16}/> 
                        ) : (
                            'Твитнуть'
                        )}
                    </Button>
                </div>
            </div>
            {addTweetState === AddTweetState.ERROR && (
                <Alert severity="error">Ошибка при добавлении твита</Alert>
            )}
        </div>
    )
}
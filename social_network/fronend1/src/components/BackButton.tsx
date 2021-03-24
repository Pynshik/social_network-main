import React from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const BackButton: React.FC = (): React.ReactElement => {
    const history = useHistory();
    
    const handleClickButton = () => {
        history.goBack();
    }

    return (
        <IconButton onClick={handleClickButton} style={{ margin: '-7px 20px 0 0' }} color="primary">
            <ArrowBackIcon />
        </IconButton>
    )
}
import React from 'react';
import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import { useHomeStyles } from '../pages/Home/theme';
import { selectUsersItems } from '../store/ducks/users/selector';
import { useSelector } from 'react-redux';

export const Users = () => {
  const classes = useHomeStyles();
  const items = useSelector(selectUsersItems);

  return (
    <Paper className={classes.rightSideBlock}>
      <Paper className={classes.rightSideBlockHeader} variant="outlined">
        <b>Кого читать</b>
      </Paper>
      <List>
        {
          items.map(item => (
            <ListItem className={classes.rightSideBlockItem}>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Malek"
                  src="https://images.unsplash.com/photo-1610917040803-1fccf9623064?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80"
                />
              </ListItemAvatar>
              <ListItemText
                primary="Dock Of Shame"
                secondary={
                  <Typography component="span" variant="body2">
                    @{item.username}
              </Typography>
                }
              />
              <Button color="primary">
                <PersonAddIcon />
              </Button>
            </ListItem>
          ))
        }
        <Divider component="li" />
      </List>
    </Paper>
  )
}
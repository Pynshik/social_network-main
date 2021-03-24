import React from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import { useHomeStyles } from "../pages/Home/theme";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { selectIsTagsLoaded, selectTagsItems } from "../store/ducks/tags/selector";

interface TagsPropsInterface {
    classes: ReturnType<typeof useHomeStyles>;
};

export const Tags: React.FC<TagsPropsInterface> = ({ classes }: TagsPropsInterface): React.ReactElement | null => {
    const tags = useSelector(selectTagsItems);
    const isLoaded = useSelector(selectIsTagsLoaded);

    if(!isLoaded) {
        return null;
    }

    return (
        <Paper className={classes.rightSideBlock}>
            <Paper className={classes.rightSideBlockHeader} variant="outlined">
                <b>Актуальные темы</b>
            </Paper>
            <List>
                {tags?.map(tag => (
                    <React.Fragment key={tag._id}>
                        <ListItem className={classes.rightSideBlockItem}>
                            <Link to={`/home/search?q=${tag.name}`}>
                                <ListItemText
                                    primary={tag.name}
                                    secondary={
                                        <Typography component="span" variant="body2">
                                            Твитов: {tag.count}
                                        </Typography>
                                    }
                                />
                            </Link>
                        </ListItem>
                        <Divider component="li" />
                    </React.Fragment>
                ))
                }
            </List>
        </Paper>
    );
};

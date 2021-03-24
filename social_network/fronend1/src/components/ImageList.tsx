import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from '@material-ui/icons/Clear';
import { useHomeStyles } from "../pages/Home/theme";

interface ImageListPropsInterface {
  images: string[];
  removeImage?: (url: string) => void;
}

export const ImageList: React.FC<ImageListPropsInterface> = ({ images, removeImage }) => {
  const classes = useHomeStyles();
  if (!images.length) {
    return null;
  }

  return (
    <div className={classes.imagesList}>
      {
        images.map((url) => (
          <div className={classes.imagesListItem}>
            {removeImage && (
              <IconButton 
                className={classes.imagesListItemRemove} 
                onClick={(): void => removeImage(url)}>
                <ClearIcon style={{ fontSize: 15 }} />
              </IconButton>
              )}
            <img key={url} src={url} />
            </div>
        ))}
    </div>
  )
}
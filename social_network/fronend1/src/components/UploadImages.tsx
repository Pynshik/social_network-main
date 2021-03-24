import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { ImageObj } from './AddTweetForm';
import { ImageList } from './ImageList';

interface UploadImagesPropsInterface {
    images: ImageObj[],
    onChangeImages: (callback: (prev: ImageObj[]) => ImageObj[]) => void;
}

export const UploadImages: React.FC<UploadImagesPropsInterface> = ({ images, onChangeImages }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const removeImage = (url: string) => {
        onChangeImages(prev => prev.filter(obj => url !== obj.blobUrl));
    }

    const handleChangeFileInput = React.useCallback((event: Event) => {
        if (event.target) {
            const target = (event.target as HTMLInputElement);
            const file = target.files?.[0];
            if (file) {
                const fileObj = new Blob([file]);
                onChangeImages(prev => [...prev, {
                    blobUrl: URL.createObjectURL(fileObj),
                    file,
                }]);
            }
        }
    }, []);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('change', handleChangeFileInput);
        }
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('change', handleChangeFileInput);
            }
        }
    }, []);

    return (
        <div>
            <ImageList images={images.map(obj => obj.blobUrl)} removeImage={removeImage} />
            <IconButton onClick={handleClickImage} color="primary">
                <ImageOutlinedIcon style={{ fontSize: 26 }} />
            </IconButton>
            <input type="file" ref={inputRef} hidden />
        </div>
    )
};
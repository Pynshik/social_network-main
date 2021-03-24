import cloudinary from 'cloudinary';

if(!cloudinary) {
    throw new Error('Отсутствуют конфигурации для Cloudinary');
}

// @ts-ignore
cloudinary.config({
    cloud_name: 'dm3symelk',
    api_key: '536929649312284',
    api_secret: 'wZTC4D_6o0tKijlLAjKYNxeSe7A',
});

export default cloudinary;

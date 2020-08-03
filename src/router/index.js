import {lazy} from 'react';

import {HOME,UPLOAD_PATH, ABOUT_PATH, VIEW_UPLOADS_PATH } from '../constants';

const LoadableHome = lazy(()=> import('../containers/Home'));
const LoadableUploadImage = lazy(()=> import('../containers/ImageUpload'));
const LoadableViewUploadedImage = lazy(()=> import('../containers/ViewUploads'));


const routes = [
    {
        path: `${HOME}`,
        title: 'Home',
        component:LoadableHome,
        exact:true
    },
    {
        path: `${UPLOAD_PATH}`,
        title: 'Image Upload',
        component: LoadableUploadImage,
        exact: true
    },
    {
        path: `${VIEW_UPLOADS_PATH}`,
        title: 'All Uploads',
        component: LoadableViewUploadedImage,
        exact: true
    },
    {
        path: `${ABOUT_PATH}`,
        title: 'All Uploads',
        component: LoadableHome,
        exact: true
    },
]

export default routes;

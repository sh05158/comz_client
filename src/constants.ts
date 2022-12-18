export enum PAGE_PATHS  {
    DEFAULT = '/',
    HOME = '/home',
    LOGIN = '/login',
    SIGNUP = '/signup',
    MENU = '/menu',
    FRIENDS = '/menu/friends',
    CHATTING = '/menu/chatting',
    CHATTING_ROOM = '/room',
}

export const HOST = 'http://helpcomz.ml:8000';
// export const HOST = 'http://localhost:8000';

export const API_HOST = process.env.API_HOST || `${HOST}`;

export const BASE_IMG_URL = '/asset/base_profile.jpg';

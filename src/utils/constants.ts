import { TStringArray } from './types';

export const TITLE_LIST:TStringArray = {
    'bun': "Булки",
    'sauce': "Соусы",
    'main': "Начинки",
};

export const BASE_URL = "https://norma.nomoreparties.space/api";
export const API_HOST_WS_URL = 'wss://norma.nomoreparties.space/orders'

export const ORDERS_API = `${BASE_URL}/orders`;
export const INGREDIENTS_API = `${BASE_URL}/ingredients`;

export const LOGIN_API = `${BASE_URL}/auth/login`;
export const REGISTER_API = `${BASE_URL}/auth/register`;
export const LOGOUT_API = `${BASE_URL}/auth/logout`;
export const TOKEN_API = `${BASE_URL}/auth/token`;
export const GET_USER = `${BASE_URL}/auth/user`;

export const FORGOT_PSSWRD = `${BASE_URL}/password-reset`;
export const RESET_PSSWRD = `${BASE_URL}/password-reset/reset`;
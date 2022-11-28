import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const getCookie = () => {
  if (cookies.get('Authorization')) {
    return cookies.get('Authorization');
  } else {
    return null;
  }
};

const getRefreshToken = () => {
  if (cookies.get('RefreshToken')) {
    return cookies.get('RefreshToken');
  } else {
    return null;
  }
};

const setCookie = (token: string) => {
  document.cookie = `Authorization=${token}; max-age=18000; path=/`;
};

const setRefreshToken = (token: string) => {
  document.cookie = `RefreshToken=${token}; max-age=604800; path=/`;
};

const deleteCookie = (name: string) => {
  let date = new Date('2020-01-01').toUTCString();
  document.cookie = name + '=; expires=' + date + '; path=/';
  window.location.reload();
};

export { getCookie, getRefreshToken, setCookie, setRefreshToken, deleteCookie };

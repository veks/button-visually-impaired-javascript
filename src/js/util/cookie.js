/**
 * --------------------------------------------------------------------------
 * Button visually impaired (v1.0.0): util/cookie.js
 * Licensed under MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE.md)
 * --------------------------------------------------------------------------
 */

const setCookie = function (name = '', value = '') {
  let now = new Date();
  let time = now.getTime();
  time += 24 * 60 * 60 * 1000;
  now.setTime(time);
  document.cookie = `bvi_${name}=${value};path=/;expires=${now.toUTCString()};domain=${location.host}`;
};

const getCookie = function (name = '') {
  name = `bvi_${name}=`;
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookies = decodedCookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();

    if (cookie.indexOf(name) !== -1) {
      return cookie.substring(name.length, cookie.length);
    }
  }
};

const removeCookie = function (name = '') {
  document.cookie = `bvi_${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${location.host}`;
};

export {
  setCookie,
  getCookie,
  removeCookie,
};

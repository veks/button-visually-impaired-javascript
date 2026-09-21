/**
 * Сохраняет значение cookie с префиксом `bvi_` на один день.
 * @param {string} name - Имя cookie без префикса.
 * @param {string|number|boolean} [value=''] - Значение, преобразуемое в строку.
 * @returns {void}
 */
const setCookie = function (name = '', value = '') {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

  document.cookie = `bvi_${name}=${encodeURIComponent(value)};path=/;expires=${expires.toUTCString()};SameSite=Lax`
}

/**
 * Читает cookie с префиксом `bvi_`.
 * @param {string} name - Имя cookie без префикса.
 * @returns {string|undefined} Значение cookie или `undefined`, если оно не найдено.
 */
const getCookie = function (name = '') {
  const cookieName = `bvi_${name}=`
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()

    if (cookie.indexOf(cookieName) === 0) {
      return decodeURIComponent(cookie.substring(cookieName.length, cookie.length))
    }
  }
}

/**
 * Удаляет cookie с префиксом `bvi_`.
 * @param {string} name - Имя cookie без префикса.
 * @returns {void}
 */
const removeCookie = function (name = '') {
  document.cookie = `bvi_${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;SameSite=Lax`
}

export {
  setCookie,
  getCookie,
  removeCookie,
}

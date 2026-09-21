/**
 * Преобразует строковое представление включённого состояния в boolean.
 * @param {*} string - Значение для преобразования.
 * @returns {boolean} `true` для `on`, `true` или `1`; иначе `false`.
 */
const stringToBoolean = string => {
  switch (string) {
    case 'on':
    case 'true':
    case '1':
      return true
    default:
      return false
  }
}

export { stringToBoolean }

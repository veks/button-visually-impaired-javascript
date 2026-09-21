/**
 * Перебирает собственные ключи объекта.
 * @param {Object} object - Исходный объект.
 * @param {(key: string) => void} callback - Функция для каждого ключа.
 * @returns {void}
 */
const getObject = (object, callback) => {
  Object.keys(object).forEach(key => {
    if (typeof callback === 'function') {
      callback(key)
    }
  })
}

/**
 * Перебирает элементы итерируемого значения.
 * @param {Iterable<*>} array - Итерируемое значение.
 * @param {(item: *) => void} callback - Функция для каждого элемента.
 * @returns {void}
 */
const getArray = (array, callback) => {
  Array.from(array).forEach(key => {
    if (typeof callback === 'function') {
      callback(key)
    }
  })
}

export { getObject, getArray }

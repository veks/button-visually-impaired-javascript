const DATA = 'data-bvi'

/**
 * Строит имя служебного атрибута `data-bvi`. Имя всегда в нижнем регистре: CSS обращается к нему как
 * `[data-bvi-fontsize]`. Без ключа получается сам `data-bvi` (в нём хранится действие кнопки).
 * @param {string} [key] - Суффикс атрибута.
 * @returns {string} Имя атрибута.
 */
const dataName = key => key ? `${DATA}-${String(key).toLowerCase()}` : DATA

/**
 * Состояние элемента в одном месте: атрибуты (`getAttr`...), служебные `data-bvi-*` (`getData`...),
 * классы (`addClass`...) и стили (`setStyle`).
 */
const Manipulator = {
  /**
   * Читает значение атрибута.
   * @param {Element} element - Элемент.
   * @param {string} name - Имя атрибута.
   * @returns {string|null} Значение или `null`, если атрибута нет.
   */
  getAttr (element, name) {
    return element.getAttribute(name)
  },

  /**
   * Записывает атрибут, приводя значение к строке.
   * @param {Element} element - Элемент.
   * @param {string} name - Имя атрибута.
   * @param {string|number|boolean} value - Новое значение.
   * @returns {void}
   */
  setAttr (element, name, value) {
    element.setAttribute(name, String(value))
  },

  /**
   * Проверяет наличие атрибута.
   * @param {Element} element - Элемент.
   * @param {string} name - Имя атрибута.
   * @returns {boolean} `true`, если атрибут есть.
   */
  hasAttr (element, name) {
    return element.hasAttribute(name)
  },

  /**
   * Удаляет атрибут.
   * @param {Element} element - Элемент.
   * @param {string} name - Имя атрибута.
   * @returns {void}
   */
  removeAttr (element, name) {
    element.removeAttribute(name)
  },

  /**
   * Добавляет один или несколько классов.
   * @param {Element} element - Элемент.
   * @param {...string} classNames - Добавляемые классы.
   * @returns {void}
   */
  addClass (element, ...classNames) {
    element.classList.add(...classNames)
  },

  /**
   * Убирает один или несколько классов.
   * @param {Element} element - Элемент.
   * @param {...string} classNames - Убираемые классы.
   * @returns {void}
   */
  removeClass (element, ...classNames) {
    element.classList.remove(...classNames)
  },

  /**
   * Переключает класс или принудительно включает и выключает его.
   * @param {Element} element - Элемент.
   * @param {string} className - Класс.
   * @param {boolean} [force] - `true` добавляет класс, `false` убирает; без него класс переключается.
   * @returns {boolean} `true`, если после вызова класс есть у элемента.
   */
  toggleClass (element, className, force) {
    return element.classList.toggle(className, force)
  },

  /**
   * Проверяет наличие класса.
   * @param {Element} element - Элемент.
   * @param {string} className - Класс.
   * @returns {boolean} `true`, если класс есть.
   */
  hasClass (element, className) {
    return element.classList.contains(className)
  },

  /**
   * Задаёт встроенный стиль. Пустое значение убирает его.
   * @param {HTMLElement} element - Элемент.
   * @param {string} property - Свойство в camelCase (`display`, `overflow`, `height`) или CSS-переменная (`--bvi-panel-offset`).
   * @param {string} value - Значение свойства.
   * @returns {void}
   */
  setStyle (element, property, value) {
    const style = /** @type {any} */ (element.style)

    if (property.startsWith('--')) {
      style.setProperty(property, value)
    } else {
      style[property] = value
    }
  },

  /**
   * Читает служебный атрибут `data-bvi-*`.
   * @param {Element} element - Элемент.
   * @param {string} [key] - `fontSize` → `data-bvi-fontsize`; без ключа читается `data-bvi` (действие кнопки).
   * @returns {string|null} Значение или `null`, если атрибута нет.
   */
  getData (element, key) {
    return Manipulator.getAttr(element, dataName(key))
  },

  /**
   * Записывает служебный атрибут `data-bvi-*`.
   * @param {Element} element - Элемент.
   * @param {string} key - Суффикс атрибута: `fontSize` → `data-bvi-fontsize`.
   * @param {string|number|boolean} value - Новое значение.
   * @returns {void}
   */
  setData (element, key, value) {
    Manipulator.setAttr(element, dataName(key), value)
  },

  /**
   * Удаляет служебный атрибут `data-bvi-*`.
   * @param {Element} element - Элемент.
   * @param {string} key - Суффикс атрибута.
   * @returns {void}
   */
  removeData (element, key) {
    Manipulator.removeAttr(element, dataName(key))
  },
}

export { Manipulator }

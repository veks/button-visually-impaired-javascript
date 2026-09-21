import { SelectorEngine } from './selector-engine'

/**
 * Проверяет, является ли значение DOM-элементом.
 * @param {*} object - Проверяемое значение.
 * @returns {boolean} Является ли значение DOM-элементом.
 */
const isElement = object => {
  if (!object || typeof object !== 'object') {
    return false
  }

  return typeof object.nodeType !== 'undefined'
}

/**
 * Возвращает элемент по ссылке на него или CSS-селектору.
 * @param {Element|string|null} object - Элемент, CSS-селектор или `null` (тогда результат `null`).
 * @param {ParentNode} [root=document] - Корень поиска.
 * @returns {Element|null} Найденный элемент или `null`.
 */
const getElement = (object, root = document) => {
  if (isElement(object)) {
    return /** @type {Element} */ (object)
  }

  return typeof object === 'string' && object.length > 0 ? SelectorEngine.one(object, root) : null
}

/**
 * Создаёт HTML-элемент с необязательным классом.
 * @param {string} tag - Имя тега.
 * @param {string} [className] - Имя CSS-класса.
 * @returns {HTMLElement} Созданный элемент.
 */
const createElement = (tag, className = '') => {
  const element = document.createElement(tag)

  if (className) {
    element.className = className
  }

  return element
}

/**
 * Вставляет HTML-строку или элемент относительно `target`.
 * @param {Element} target - Целевой элемент.
 * @param {InsertPosition} position - Позиция вставки.
 * @param {string|Element} content - Вставляемая разметка или элемент.
 * @returns {void}
 */
const insert = (target, position, content) => {
  if (typeof content === 'string') {
    target.insertAdjacentHTML(position, content)
  } else {
    target.insertAdjacentElement(position, content)
  }
}

/**
 * Удаляет элемент из DOM, если он существует.
 * @param {Element|null} element - Удаляемый элемент.
 * @returns {void}
 */
const removeElement = element => {
  if (element) {
    element.remove()
  }
}

/**
 * Оборачивает дочерние узлы родителя в указанный элемент.
 * @param {Element} parent - Родительский элемент.
 * @param {Element|string} wrapper - Обёртка или имя её тега.
 * @param {string} className - Класс обёртки.
 * @returns {void}
 */
const wrapInner = (parent, wrapper, className) => {
  if (typeof wrapper === 'string') {
    wrapper = createElement(wrapper)
  }

  parent.appendChild(wrapper).className = className

  while (parent.firstChild !== wrapper) {
    wrapper.appendChild(/** @type {ChildNode} */ (parent.firstChild))
  }
}

/**
 * Удаляет обёртку, сохраняя её дочерние узлы в DOM.
 * @param {Element|null} wrapper - Удаляемая обёртка.
 * @returns {void}
 */
const unwrap = wrapper => {
  if (!wrapper || !wrapper.parentNode) return

  const docFrag = document.createDocumentFragment()

  while (wrapper.firstChild) {
    const child = wrapper.removeChild(wrapper.firstChild)
    docFrag.appendChild(child)
  }

  wrapper.parentNode.replaceChild(docFrag, wrapper)
}

export { createElement, getElement, insert, isElement, removeElement, wrapInner, unwrap }

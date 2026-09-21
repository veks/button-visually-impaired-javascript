/**
 * Кандидаты на фокус: окончательно отбираются по tabIndex, доступности и видимости.
 * @type {string}
 */
const FOCUSABLE = 'a[href], button, input, select, textarea, summary, [tabindex]'

/**
 * Проверяет видимость элемента с поддержкой старых браузеров.
 * @param {Element} element - Проверяемый элемент.
 * @returns {boolean} Видим ли элемент.
 */
const isVisible = element => typeof element.checkVisibility === 'function'
  ? element.checkVisibility({ visibilityProperty: true })
  : element.getClientRects().length > 0

/**
 * Поиск элементов. Методы, которым нужен один результат, возвращают элемент или null,
 * а не массив: так вызывающему коду не нужно брать `[0]`.
 */
const SelectorEngine = {
  /**
   * Все элементы по селектору обычным массивом.
   * @param {string} selector - CSS-селектор.
   * @param {ParentNode} [root=document] - Область поиска; по умолчанию вся страница.
   * @returns {HTMLElement[]} Найденные элементы; пустой массив, если ничего нет.
   */
  all (selector, root = document) {
    return /** @type {HTMLElement[]} */ ([...root.querySelectorAll(selector)])
  },

  /**
   * Первый элемент по селектору.
   * @param {string} selector - CSS-селектор.
   * @param {ParentNode} [root=document] - Область поиска.
   * @returns {HTMLElement|null} Элемент или `null`, если ничего не найдено.
   */
  one (selector, root = document) {
    return /** @type {HTMLElement|null} */ (root.querySelector(selector))
  },

  /**
   * Прямые потомки, подходящие под селектор.
   * @param {Element} element - Родитель.
   * @param {string} selector - CSS-селектор потомков.
   * @returns {HTMLElement[]} Подходящие дочерние элементы.
   */
  children (element, selector) {
    return /** @type {HTMLElement[]} */ ([...element.children].filter(child => child.matches(selector)))
  },

  /**
   * Ближайший предок (сам элемент не в счёт).
   * @param {Element} element - Элемент, от которого идёт поиск вверх.
   * @param {string} selector - CSS-селектор предка.
   * @returns {HTMLElement|null} Предок или `null`, если такого нет.
   */
  ancestor (element, selector) {
    return /** @type {HTMLElement|null} */ (element.parentElement ? element.parentElement.closest(selector) : null)
  },

  /**
   * Ближайший сосед в заданном направлении.
   * @param {Element} element - Исходный элемент.
   * @param {string} selector - CSS-селектор соседа.
   * @param {'next'|'previous'} [direction='next'] - Искать после элемента или перед ним.
   * @returns {HTMLElement|null} Первый подходящий сосед или `null`.
   */
  sibling (element, selector, direction = 'next') {
    const step = direction === 'previous' ? 'previousElementSibling' : 'nextElementSibling'

    for (let node = element[step]; node; node = node[step]) {
      if (node.matches(selector)) {
        return /** @type {HTMLElement} */ (node)
      }
    }

    return null
  },

  /**
   * Подходит ли значение под селектор (не элемент, например `window`, — просто `false`).
   * @param {*} element - Проверяемое значение.
   * @param {string} selector - CSS-селектор.
   * @returns {boolean} `true`, если это элемент и он подходит под селектор.
   */
  is (element, selector) {
    return element instanceof Element && element.matches(selector)
  },

  /**
   * Элементы внутри, на которые можно перейти с клавиатуры: видимые, доступные и с tabIndex ≥ 0.
   * @param {ParentNode} root - Область поиска.
   * @param {string} [selector] - Оставить только подходящие под селектор.
   * @returns {HTMLElement[]} Элементы в порядке документа.
   */
  focusable (root, selector) {
    return SelectorEngine.all(FOCUSABLE, root)
      .filter(element => element.tabIndex >= 0 && !element.matches(':disabled') && isVisible(element))
      .filter(element => !selector || element.matches(selector))
  },
}

export { SelectorEngine }

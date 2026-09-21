/**
 * Подписки на события с учётом жизненного цикла плагина.
 *
 * `on()` возвращает функцию отписки, а `scope()` собирает подписки в набор, который снимается
 * одним вызовом `clear()`. Так `destroy()` и повторная инициализация не оставляют лишних обработчиков.
 */
/**
 * Обработчик события: тип события выводится из имени (`click` → `MouseEvent`, `keydown` → `KeyboardEvent`).
 * @template {string} T
 * @typedef {(event: T extends keyof GlobalEventHandlersEventMap ? GlobalEventHandlersEventMap[T] : Event) => void} Handler
 */

const EventHandler = {
  /**
   * Подписывает обработчик на событие.
   * @template {string} T
   * @param {EventTarget} target - Элемент, окно или другой источник событий.
   * @param {T} type - Тип события, например `click`.
   * @param {Handler<T>} handler - Обработчик.
   * @param {AddEventListenerOptions|boolean} [options] - Параметры `addEventListener`.
   * @returns {() => void} Функция отписки.
   */
  on (target, type, handler, options) {
    const listener = /** @type {EventListener} */ (handler)

    target.addEventListener(type, listener, options)

    return () => target.removeEventListener(type, listener, options)
  },

  /**
   * Набор подписок, которые снимаются вместе.
   * @returns {{
   *   on: <T extends string>(target: EventTarget, type: T, handler: Handler<T>, options?: AddEventListenerOptions|boolean) => void,
   *   add: (cleanup: () => void) => void,
   *   clear: () => void
   * }} Набор подписок.
   */
  scope () {
    /** @type {(() => void)[]} */
    const cleanups = []

    return {
      /**
       * Подписывает обработчик и запоминает отписку в наборе.
       * @template {string} T
       * @param {EventTarget} target - Источник событий.
       * @param {T} type - Тип события.
       * @param {Handler<T>} handler - Обработчик.
       * @param {AddEventListenerOptions|boolean} [options] - Параметры `addEventListener`.
       * @returns {void}
       */
      on (target, type, handler, options) {
        cleanups.push(EventHandler.on(target, type, handler, options))
      },

      /**
       * Добавляет в набор своё действие отмены, например `onvoiceschanged = null`.
       * @param {() => void} cleanup - Функция, которую вызовет `clear()`.
       * @returns {void}
       */
      add (cleanup) {
        cleanups.push(cleanup)
      },

      /**
       * Снимает все подписки набора и очищает его.
       * @returns {void}
       */
      clear () {
        cleanups.splice(0).forEach(cleanup => cleanup())
      },
    }
  },
}

export { EventHandler }

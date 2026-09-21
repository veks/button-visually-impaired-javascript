import { Default, DefaultOptions, DefaultType } from '../config'
import I18n from '../i18n'
import Speech from '../speech'
import {
  checkConfig,
  createElement,
  EventHandler,
  getArray,
  getElement,
  getObject,
  insert,
  Manipulator,
  removeElement,
  SelectorEngine,
  stringToBoolean,
  unwrap,
  wrapInner,
} from '../util'
import {
  getCookie,
  removeCookie,
  setCookie,
} from '../util/cookie'
import { version } from '../../../package.json'
import { DATA_CONTROLS } from './controls'
import {
  getPanelShowLinkTemplate,
  getPanelTemplate,
} from '../panel'

/**
 * Параметры инициализации плагина.
 * @typedef {Object} BviOptions
 * @property {string} [target='.bvi-open'] - Селектор элементов открытия режима.
 * @property {number} [fontSize=16] - Базовый размер шрифта.
 * @property {'white'|'black'|'blue'|'brown'|'green'} [theme='white'] - Цветовая тема.
 * @property {boolean|'grayscale'} [images='grayscale'] - Режим показа изображений.
 * @property {'normal'|'average'|'big'} [letterSpacing='normal'] - Межбуквенный интервал.
 * @property {'normal'|'average'|'big'} [lineHeight='normal'] - Межстрочный интервал.
 * @property {boolean} [speech=true] - Использовать синтез речи.
 * @property {string} [speechVoice=''] - Идентификатор голоса.
 * @property {'arial'|'times'} [fontFamily='arial'] - Семейство шрифта.
 * @property {boolean} [builtElements=false] - Стилизовать встроенные элементы.
 * @property {boolean} [panelFixed=true] - Закреплять панель при прокрутке.
 * @property {boolean} [panelHide=false] - Скрывать панель при запуске.
 * @property {boolean} [reload=false] - Перезагружать страницу при отключении.
 * @property {'ru-RU'|'en-US'|'es-ES'|'de-DE'|'fr-FR'|'pt-BR'|'it-IT'|'tr-TR'|'pl-PL'|'zh-CN'|'ja-JP'} [lang='ru-RU'] - Язык интерфейса.
 * @property {boolean} [copyright=true] - Показывать ссылку на проект.
 */

/**
 * Направление перемещения фокуса для клавиш со стрелками.
 * @type {Record<string, number>}
 */
const ARROW_STEPS = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

/**
 * Управляет режимом сайта для слабовидящих: панелью, настройками, DOM и синтезом речи.
 * @class
 * @classdesc Создаёт и обслуживает экземпляр режима на странице.
 */
class Bvi {
  /**
   * Создаёт экземпляр плагина, регистрирует триггеры и восстанавливает состояние.
   * @param {BviOptions} [options={}] - Параметры работы плагина.
   */
  constructor (options) {
    this._config = this._getConfig(options)
    this._elements = SelectorEngine.all(this._config.target)
    this._i18n = new I18n({ lang: this._config.lang })
    this._speech = new Speech({ lang: this._config.lang })
    this._onPanelScroll = this._handlePanelScroll.bind(this)
    this._onPanelResize = this._handlePanelResize.bind(this)
    this._onVoicesChanged = this._renderSpeechVoices.bind(this)
    this._onModalKeydown = this._handleModalKeydown.bind(this)
    this._onArrowKeys = this._handleArrowKeys.bind(this)
    /** @type {HTMLElement|null} */
    this._modalOpener = null
    this._offModalKeydown = null
    this._listeners = EventHandler.scope()
    this._panelListeners = EventHandler.scope()

    this._addOpenListeners()
    this._init()

    console.log(`Bvi console: ready Button visually impaired v${version}`)
  }

  /**
   * Включает или отключает режим согласно сохранённому состоянию.
   * @private
   * @returns {void}
   */
  _init () {
    this._disablePanelIfSettingsAreMissing()

    if (!stringToBoolean(getCookie('panelActive'))) {
      this._remove()
      return
    }

    this._set()
    this._renderPanel()
    this._addPanelListeners()
    this._images()
    this._speech.mount()
    this._speech.startStatusTimer()
  }

  /**
   * Регистрирует обработчики открытия режима.
   * @private
   * @returns {void}
   */
  _addOpenListeners () {
    if (!this._elements) {
      return
    }

    this._elements.forEach(element => {
      /**
       * Включает режим для слабовидящих по клику на кнопку-триггер.
       * @param {Event} event - Клик по элементу из опции `target`.
       * @returns {void}
       */
      const listener = event => {
        event.preventDefault()
        this._saveDefaultSettings()
        setCookie('panelActive', true)
        this._init()
        this._speech.speak(this._i18n.voice('panelOn'))
      }

      this._listeners.on(element, 'click', listener)
    })
  }

  /**
   * Регистрирует обработчики панели и обновляет её элементы управления.
   * @private
   * @returns {void}
   */
  _addPanelListeners () {
    this._panelListeners.clear()
    this._panelListeners.on(window, 'scroll', this._onPanelScroll)
    this._panelListeners.on(window, 'resize', this._onPanelResize)
    this._panelListeners.on(document, 'keydown', this._onArrowKeys)

    this._setActiveControls()
    this._bindFontSizeControls()
    this._bindDataControls()
    this._bindResetControl()
    this._bindSpeechVoiceControl()
    this._bindPanelActions()
    this._bindModalOverlay()
    this._renderSpeechVoices()
    this._observePanelSize()
  }

  /**
   * Пересчитывает закрепление и его заполнитель при изменении viewport.
   * @private
   * @returns {void}
   */
  _handlePanelResize () {
    this._handlePanelScroll()
  }

  /**
   * Синхронизирует заполнитель, когда перенос кнопок меняет высоту панели.
   * @private
   * @returns {void}
   */
  _observePanelSize () {
    const panel = SelectorEngine.one('.bvi-panel')

    if (!panel || typeof ResizeObserver === 'undefined') {
      return
    }

    const observer = new ResizeObserver(() => this._syncPanelPlaceholder(panel))

    observer.observe(panel)
    this._panelListeners.add(() => observer.disconnect())
  }

  /**
   * Связывает кнопки изменения размера шрифта с настройкой.
   * @private
   * @returns {void}
   */
  _bindFontSizeControls () {
    this._onClick('.bvi-font-size-minus', element => {
      this._changeFontSize(-1, element, 'fontSizeMinus')
    })

    this._onClick('.bvi-font-size-plus', element => {
      this._changeFontSize(1, element, 'fontSizePlus')
    })
  }

  /**
   * Связывает декларативные контролы с настройками и голосовыми сообщениями.
   * @private
   * @returns {void}
   */
  _bindDataControls () {
    getObject(DATA_CONTROLS, settingName => {
      getObject(DATA_CONTROLS[settingName], settingValue => {
        const [selector, speechKey] = DATA_CONTROLS[settingName][settingValue]

        this._onClick(selector, element => {
          if (settingName === 'speech' && settingValue === 'false') {
            this._speech.speak(this._i18n.voice(speechKey))
          }

          this._setSetting(settingName, settingValue)

          if (settingName !== 'speech' || settingValue !== 'false') {
            this._speech.speak(this._i18n.voice(speechKey))
          }

          this._activateSiblingLink(element)

          if (settingName === 'speech') {
            this._speech.mount()
            this._speech.startStatusTimer()
          }
        })
      })
    })
  }

  /**
   * Связывает кнопку сброса с исходными настройками.
   * @private
   * @returns {void}
   */
  _bindResetControl () {
    this._onClick('.bvi-reset', () => {
      this._speech.speak(this._i18n.voice('resetSettings'))

      const config = /** @type {Record<string, string|number|boolean>} */ (this._config)

      getObject(config, key => {
        this._setSetting(key, config[key])
      })

      this._setActiveControls()
    })
  }

  /**
   * Связывает селектор голоса с настройкой `speechVoice`.
   * @private
   * @returns {void}
   */
  _bindSpeechVoiceControl () {
    const select = /** @type {HTMLSelectElement|null} */ (SelectorEngine.one('.bvi-speech-voice'))

    if (!select) {
      return
    }

    this._bindVoicesChanged()

    this._panelListeners.on(select, 'change', () => {
      this._setSetting('speechVoice', select.value)
      this._speech.speak(this._i18n.voice('speechVoiceChanged'))
    })
  }

  /**
   * Подписывается на появление списка голосов синтезатора.
   * @private
   * @returns {void}
   */
  _bindVoicesChanged () {
    if (!this._speech.isSupported()) {
      return
    }

    const synth = window.speechSynthesis

    if (typeof synth.addEventListener === 'function') {
      this._panelListeners.on(synth, 'voiceschanged', this._onVoicesChanged)
    } else {
      synth.onvoiceschanged = this._onVoicesChanged
      this._panelListeners.add(() => {
        synth.onvoiceschanged = null
      })
    }
  }

  /**
   * Заполняет селектор голосами для текущего языка.
   * @private
   * @returns {void}
   */
  _renderSpeechVoices () {
    const select = /** @type {HTMLSelectElement|null} */ (SelectorEngine.one('.bvi-speech-voice'))

    if (!select || !this._speech.isSupported()) {
      return
    }

    const selectedValue = getCookie('speechVoice') || ''
    const voices = this._getSpeechVoices(window.speechSynthesis.getVoices(), selectedValue)
    const currentOptions = JSON.stringify(Array.from(select.options).map(option => option.value))
    const nextOptions = JSON.stringify(['', ...voices.map(voice => this._getSpeechVoiceValue(voice))])

    if (currentOptions === nextOptions) {
      this._setSpeechVoiceSelectValue(select, selectedValue)
      return
    }

    select.innerHTML = `<option value="">${this._i18n.text('speechVoiceDefault')}</option>`

    voices.forEach(voice => {
      const option = /** @type {HTMLOptionElement} */ (createElement('option'))

      option.value = this._getSpeechVoiceValue(voice)
      option.textContent = voice.lang ? `${voice.name} (${voice.lang})` : voice.name
      select.appendChild(option)
    })

    this._setSpeechVoiceSelectValue(select, selectedValue)
  }

  /**
   * Возвращает стабильный идентификатор голоса.
   * @private
   * @param {SpeechSynthesisVoice} voice - Голос синтезатора.
   * @returns {string} Идентификатор голоса.
   */
  _getSpeechVoiceValue (voice) {
    return voice.voiceURI || voice.name
  }

  /**
   * Выбирает уникальные голоса текущего языка и ранее выбранный голос.
   * @private
   * @param {SpeechSynthesisVoice[]} voices - Все доступные голоса.
   * @param {string} [selectedValue=''] - Идентификатор выбранного голоса.
   * @returns {SpeechSynthesisVoice[]} Подходящие голоса.
   */
  _getSpeechVoices (voices, selectedValue = '') {
    const langPrefix = this._config.lang.toLowerCase().split('-')[0]
    /** @type {string[]} */
    const values = []

    return voices.filter(voice => {
      if (!voice || !(voice.voiceURI || voice.name)) {
        return false
      }

      const value = this._getSpeechVoiceValue(voice)
      const voiceLang = String(voice.lang || '').toLowerCase()
      const isSelected = selectedValue && value === selectedValue
      const isCurrentLang = voiceLang === this._config.lang.toLowerCase() || voiceLang.startsWith(langPrefix)

      if (!isSelected && !isCurrentLang) {
        return false
      }

      if (values.indexOf(value) !== -1) {
        return false
      }

      values.push(value)
      return true
    })
  }

  /**
   * Устанавливает значение селектора, если соответствующий вариант существует.
   * @private
   * @param {HTMLSelectElement} select - Селектор голосов.
   * @param {string} value - Идентификатор голоса.
   * @returns {void}
   */
  _setSpeechVoiceSelectValue (select, value) {
    const hasValue = Array.from(select.options).some(option => option.value === value)

    select.value = hasValue ? value : ''
  }

  /**
   * Связывает действия панели с обработчиками. Меню раскрывается плавно, поэтому высота места под
   * закреплённую панель обновляется по окончании анимации.
   * @private
   * @returns {void}
   */
  _bindPanelActions () {
    const menu = SelectorEngine.one('.bvi-menu')

    if (menu) {
      this._panelListeners.on(menu, 'transitionend', event => {
        const panel = SelectorEngine.one('.bvi-panel')

        if (event.target === menu && panel) {
          this._syncPanelPlaceholder(panel)
        }
      })
    }

    SelectorEngine.all('.bvi-link[data-bvi]').forEach(element => {
      this._onClick(element, element => {
        const action = Manipulator.getData(element)

        if (action === 'close') {
          this._setSetting('panelActive', 'false')
          this._init()
        }

        if (action === 'menu') {
          this._toggleMenu(element)
        }

        if (action === 'modal') {
          this._showModal()
        }

        if (action === 'modal-close') {
          this._hideModal()
        }

        if (action === 'panel-hide') {
          this._hidePanel()
        }

        if (action === 'panel-show') {
          this._showPanel()
        }
      })
    })
  }

  /**
   * Раскрывает или сворачивает группы настроек на узких экранах.
   * @private
   * @param {HTMLElement} toggle - Кнопка меню.
   * @returns {void}
   */
  _toggleMenu (toggle) {
    const panel = SelectorEngine.one('.bvi-panel')

    if (!panel) {
      return
    }

    const open = !Manipulator.hasClass(panel, 'bvi-menu-open')

    Manipulator.toggleClass(panel, 'bvi-menu-open', open)
    Manipulator.setAttr(toggle, 'aria-expanded', String(open))
  }

  /**
   * Закрывает модальное окно при клике по подложке.
   * @private
   * @returns {void}
   */
  _bindModalOverlay () {
    const modal = SelectorEngine.one('.bvi-modal')

    this._onClick(modal, (element, event) => {
      if (event.target === modal) {
        this._hideModal()
      }
    })
  }

  /**
   * Изменяет размер шрифта в допустимом диапазоне.
   * @private
   * @param {number} delta - Шаг изменения.
   * @param {HTMLElement} activeElement - Нажатая кнопка.
   * @param {string} speechKey - Ключ голосовой подсказки.
   * @returns {void}
   */
  _changeFontSize (delta, activeElement, speechKey) {
    const size = parseFloat(getCookie('fontSize') || '') + delta

    if (size <= 0 || size >= 40) {
      return
    }

    this._setSetting('fontSize', size)
    this._speech.speak(this._i18n.voice(speechKey))
    this._activateSiblingLink(activeElement)
  }

  /**
   * Сохраняет настройку в cookie и атрибуте контейнера.
   * @private
   * @param {string} name - Имя настройки.
   * @param {string|number|boolean} value - Новое значение.
   * @returns {void}
   */
  _setSetting (name, value) {
    this._setAttrDataBviBody(name, value)
    setCookie(name, value)
  }

  /**
   * Обновляет визуальное и ARIA-состояние контролов.
   * @private
   * @returns {void}
   */
  _setActiveControls () {
    SelectorEngine.all('.bvi-link').forEach(link => {
      Manipulator.removeClass(link, 'active')
      this._setPressed(link, false)
    })

    getObject(DATA_CONTROLS, settingName => {
      const value = String(getCookie(settingName))
      const control = DATA_CONTROLS[settingName][value]

      if (!control) {
        return
      }

      const element = SelectorEngine.one(control[0])

      if (element) {
        Manipulator.addClass(element, 'active')
        this._setPressed(element, true)
      }
    })
  }

  /**
   * Устанавливает `aria-pressed` на элементе управления.
   * @private
   * @param {HTMLElement} element - Элемент управления.
   * @param {boolean} pressed - Состояние кнопки.
   * @returns {void}
   */
  _setPressed (element, pressed) {
    if (Manipulator.hasAttr(element, 'aria-pressed')) {
      Manipulator.setAttr(element, 'aria-pressed', pressed)
    }
  }

  /**
   * Активирует элемент и деактивирует соседние кнопки.
   * @private
   * @param {HTMLElement|null} element - Активируемая кнопка.
   * @returns {void}
   */
  _activateSiblingLink (element) {
    if (!element || !element.parentElement) {
      return
    }

    getArray(SelectorEngine.children(element.parentElement, '.bvi-link'), sibling => {
      Manipulator.removeClass(sibling, 'active')
      this._setPressed(sibling, false)
    })

    Manipulator.addClass(element, 'active')
    this._setPressed(element, true)
  }

  /**
   * Добавляет панель и кнопку её показа в DOM.
   * @private
   * @returns {void}
   */
  _renderPanel () {
    const bviBody = SelectorEngine.one('.bvi-body')

    if (!bviBody || SelectorEngine.one('.bvi-panel')) {
      return
    }

    const panelHidden = stringToBoolean(getCookie('panelHide'))

    insert(bviBody, 'beforebegin', getPanelTemplate(this._i18n, panelHidden, this._config.copyright))
    insert(bviBody, 'afterbegin', getPanelShowLinkTemplate(this._i18n, panelHidden))
    this._handlePanelScroll()
  }

  /**
   * Закрепляет панель при прокрутке.
   * @private
   * @returns {void}
   */
  _handlePanelScroll () {
    const panel = SelectorEngine.one('.bvi-panel')

    if (!panel || !stringToBoolean(getCookie('panelFixed'))) {
      return
    }

    const scrollTop = window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop

    const fixed = scrollTop > 200

    if (fixed !== Manipulator.hasClass(panel, 'bvi-fixed-top')) {
      if (fixed) {
        insert(panel, 'beforebegin', '<div class="bvi-panel-placeholder" aria-hidden="true"></div>')
      } else {
        this._removePanelPlaceholder()
      }

      Manipulator.toggleClass(panel, 'bvi-fixed-top', fixed)
    }

    this._syncPanelPlaceholder(panel)
  }

  /**
   * Синхронизирует высоту заполнителя закреплённой панели и отступ прокрутки страницы (`--bvi-panel-offset`),
   * чтобы элемент в фокусе и якорь не оказывались под закреплённой панелью.
   * @private
   * @param {HTMLElement} panel - Панель для измерения.
   * @returns {void}
   */
  _syncPanelPlaceholder (panel) {
    const fixed = Manipulator.hasClass(panel, 'bvi-fixed-top') && panel.offsetHeight > 0

    Manipulator.setStyle(document.documentElement, '--bvi-panel-offset', fixed ? `${panel.offsetHeight}px` : '')

    const placeholder = SelectorEngine.one('.bvi-panel-placeholder')

    if (!placeholder) {
      return
    }

    const margin = parseFloat(getComputedStyle(panel).marginBottom) || 0

    Manipulator.setStyle(placeholder, 'height', panel.offsetHeight ? `${panel.offsetHeight + margin}px` : '0')
  }

  /**
   * Удаляет заполнитель места панели.
   * @private
   * @returns {void}
   */
  _removePanelPlaceholder () {
    const placeholder = SelectorEngine.one('.bvi-panel-placeholder')

    if (placeholder) {
      removeElement(placeholder)
    }
  }

  /**
   * Создаёт контейнер режима и применяет сохранённые настройки.
   * @private
   * @returns {void}
   */
  _set () {
    if (!SelectorEngine.one('.bvi-body')) {
      Manipulator.addClass(document.documentElement, 'bvi-active')
      Manipulator.addClass(document.body, 'bvi-active')
      wrapInner(document.body, 'div', 'bvi-body')
    }

    getObject(this._config, key => this._setAttrDataBviBody(key, getCookie(key)))
    getArray(this._elements, element => {
      Manipulator.setStyle(element, 'display', 'none')
    })

    this._clearImageClasses()
  }

  /**
   * Полностью убирает плагин со страницы и снимает обработчики; сохранённые настройки не трогает.
   * Нужен при размонтировании компонента (React, Vue и т. п.). Публичный API: внутри пакета не вызывается.
   * @public
   * @noinspection JSUnusedGlobalSymbols
   * @returns {void}
   */
  destroy () {
    this._listeners.clear()
    this._teardown()
    this._speech.destroy()
  }

  /**
   * Возвращает DOM к состоянию до включения режима.
   * @private
   * @returns {void}
   */
  _teardown () {
    const bviPanel = SelectorEngine.one('.bvi-panel')
    const bviBody = SelectorEngine.one('.bvi-body')
    const bviLinkFixedTop = SelectorEngine.one('.bvi-link-fixed-top')

    this._removePanelPlaceholder()
    Manipulator.setStyle(document.documentElement, '--bvi-panel-offset', '')
    this._speech.stopStatusTimer()
    this._panelListeners.clear()
    this._stopModalKeydown()

    if (bviPanel) {
      removeElement(bviPanel)
    }

    this._clearImageClasses()

    if (bviBody) {
      unwrap(bviBody)
    }

    if (bviLinkFixedTop) {
      removeElement(bviLinkFixedTop)
    }

    Manipulator.removeClass(document.documentElement, 'bvi-active')
    Manipulator.removeClass(document.body, 'bvi-active', 'bvi-noscroll')
    Manipulator.setStyle(document.body, 'overflow', '')

    getArray(this._elements, element => {
      Manipulator.setStyle(element, 'display', '')
    })

    this._speech.destroyControls()
  }

  /**
   * Отключает режим и очищает его cookie.
   * @private
   * @returns {void}
   */
  _remove () {
    this._teardown()
    this._speech.speak(this._i18n.voice('panelOff'))

    if (stringToBoolean(getCookie('reload'))) {
      document.location.reload()
    }

    getObject(this._config, key => removeCookie(key))
    removeCookie('panelActive')
  }

  /**
   * Маркирует изображения для применения специальных стилей.
   * @private
   * @returns {void}
   */
  _images () {
    SelectorEngine.all('img').forEach(element => {
      if (!Manipulator.hasClass(element, 'bvi-no-style')) {
        Manipulator.addClass(element, 'bvi-img')
      }
    })

    this._renderImageCaptions()

    SelectorEngine.all('.bvi-body *').forEach(element => {
      const style = getComputedStyle(element)
      const hasBackgroundImage = style.backgroundImage !== 'none' && style.background !== 'none'

      if (hasBackgroundImage && !Manipulator.hasClass(element, 'bvi-no-style')) {
        Manipulator.addClass(element, 'bvi-background-image')
      }
    })
  }

  /**
   * Добавляет подписи к содержательным изображениям. Декоративные (`alt=""`) остаются без подписи.
   * @private
   * @returns {void}
   */
  _renderImageCaptions () {
    SelectorEngine.all('.bvi-body img.bvi-img').forEach(image => {
      const alt = Manipulator.getAttr(image, 'alt')

      if (alt !== null && !alt.trim()) {
        return
      }

      const caption = createElement('span', 'bvi-img-caption')

      Manipulator.setData(caption, 'caption', alt === null
        ? this._i18n.text('imageWithoutDescription')
        : `${this._i18n.text('imageCaption')}: ${alt.trim()}`)
      insert(image, 'afterend', caption)
    })
  }

  /**
   * Удаляет добавленные классы и подписи изображений.
   * @private
   * @returns {void}
   */
  _clearImageClasses () {
    SelectorEngine.all('.bvi-img-caption').forEach(element => {
      removeElement(element)
    })

    SelectorEngine.all('img.bvi-img').forEach(element => {
      Manipulator.removeClass(element, 'bvi-img')
    })

    SelectorEngine.all('.bvi-background-image').forEach(element => {
      Manipulator.removeClass(element, 'bvi-background-image')
    })
  }

  /**
   * Открывает окно настроек и переносит в него фокус.
   * @private
   * @returns {void}
   */
  _showModal () {
    const modal = SelectorEngine.one('.bvi-modal')

    Manipulator.setStyle(document.body, 'overflow', 'hidden')
    Manipulator.addClass(document.body, 'bvi-noscroll')

    if (modal) {
      if (!Manipulator.hasClass(modal, 'show')) {
        this._modalOpener = /** @type {HTMLElement|null} */ (document.activeElement)
      }

      Manipulator.addClass(modal, 'show')

      if (!this._offModalKeydown) {
        this._offModalKeydown = EventHandler.on(document, 'keydown', this._onModalKeydown)
      }

      const close = SelectorEngine.one('.bvi-modal-close', modal)

      if (close) {
        close.focus()
      }
    }
  }

  /**
   * Закрывает окно настроек и возвращает исходный фокус.
   * @private
   * @returns {void}
   */
  _hideModal () {
    const modal = SelectorEngine.one('.bvi-modal')

    Manipulator.removeClass(document.body, 'bvi-noscroll')
    Manipulator.setStyle(document.body, 'overflow', '')
    this._stopModalKeydown()

    if (modal) {
      Manipulator.removeClass(modal, 'show')
    }

    if (this._modalOpener && document.contains(this._modalOpener)) {
      this._modalOpener.focus()
    }

    this._modalOpener = null
  }

  /**
   * Перемещает фокус между кнопками группы стрелками, `Home` и `End`: группа — верхняя панель,
   * окно настроек или блок озвучки. `Tab` работает как обычно.
   * @private
   * @param {KeyboardEvent} event - Событие клавиатуры.
   * @returns {void}
   */
  _handleArrowKeys (event) {
    const step = ARROW_STEPS[event.key]
    const edge = event.key === 'Home' || event.key === 'End'

    if ((step === undefined && !edge) || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return
    }

    const current = /** @type {HTMLElement} */ (event.target)

    if (!SelectorEngine.is(current, '.bvi-link')) {
      return
    }

    const group = SelectorEngine.ancestor(current, '.bvi-modal-content, .bvi-speech-link, .bvi-panel')

    if (!group) {
      return
    }

    const buttons = SelectorEngine.focusable(group, '.bvi-link')
    const index = buttons.indexOf(current)

    if (index === -1) {
      return
    }

    let target = event.key === 'Home' ? 0 : buttons.length - 1

    if (step !== undefined) {
      target = (index + step + buttons.length) % buttons.length
    }

    event.preventDefault()
    buttons[target].focus()
  }

  /**
   * Снимает обработчик клавиатуры модального окна.
   * @private
   * @returns {void}
   */
  _stopModalKeydown () {
    if (this._offModalKeydown) {
      this._offModalKeydown()
      this._offModalKeydown = null
    }
  }

  /**
   * Обрабатывает Escape и удерживает Tab-фокус в модальном окне.
   * @private
   * @param {KeyboardEvent} event - Событие клавиатуры.
   * @returns {void}
   */
  _handleModalKeydown (event) {
    const modal = SelectorEngine.one('.bvi-modal')

    if (!modal || !Manipulator.hasClass(modal, 'show')) {
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      this._hideModal()
      return
    }

    if (event.key !== 'Tab') {
      return
    }

    const focusable = SelectorEngine.focusable(modal)

    if (!focusable.length) {
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  /**
   * Скрывает панель и показывает кнопку её возврата.
   * @private
   * @returns {void}
   */
  _hidePanel () {
    const panel = SelectorEngine.one('.bvi-panel')
    const link = SelectorEngine.one('.bvi-link-fixed-top')

    if (panel) {
      Manipulator.addClass(panel, 'bvi-panel-hide')
      this._syncPanelPlaceholder(panel)
    }

    if (link) {
      Manipulator.removeClass(link, 'bvi-hide')
      Manipulator.addClass(link, 'bvi-show')
    }

    setCookie('panelHide', 'true')
    this._speech.speak(this._i18n.voice('panelHide'))
  }

  /**
   * Показывает панель и скрывает кнопку её возврата.
   * @private
   * @returns {void}
   */
  _showPanel () {
    const panel = SelectorEngine.one('.bvi-panel')
    const link = SelectorEngine.one('.bvi-link-fixed-top')

    if (link) {
      Manipulator.removeClass(link, 'bvi-show')
      Manipulator.addClass(link, 'bvi-hide')
    }

    if (panel) {
      Manipulator.removeClass(panel, 'bvi-panel-hide')
      this._syncPanelPlaceholder(panel)
    }

    setCookie('panelHide', 'false')
    this._speech.speak(this._i18n.voice('panelShow'))
  }

  /**
   * Сохраняет исходные значения конфигурации.
   * @private
   * @returns {void}
   */
  _saveDefaultSettings () {
    const config = /** @type {Record<string, string|number|boolean>} */ (this._config)

    getObject(config, key => setCookie(key, config[key]))
  }

  /**
   * Отключает автозапуск при неполном наборе настроек.
   * @private
   * @returns {void}
   */
  _disablePanelIfSettingsAreMissing () {
    getObject(this._config, key => {
      if (typeof getCookie(key) === 'undefined') {
        removeCookie('panelActive')
      }
    })
  }

  /**
   * Объединяет и проверяет настройки плагина.
   * @private
   * @param {BviOptions} [config={}] - Пользовательские параметры.
   * @returns {Required<BviOptions>} Проверенная конфигурация: все параметры заполнены значениями по умолчанию.
   */
  _getConfig (config) {
    /** @type {Record<string, any>} */
    const options = { ...Default, ...config }
    /** @type {Record<string, any>} */
    const extended = {}

    for (const keyDefault in Default) {
      extended[keyDefault] = options[keyDefault]
    }

    checkConfig(extended, DefaultType, DefaultOptions)

    return /** @type {Required<BviOptions>} */ (extended)
  }

  /**
   * Устанавливает атрибут `data-bvi-*` на контейнере режима.
   * @private
   * @param {string} [name=''] - Имя настройки.
   * @param {string|number|boolean} [value=''] - Значение настройки.
   * @returns {void}
   */
  _setAttrDataBviBody (name = '', value = '') {
    const bviBody = SelectorEngine.one('.bvi-body')

    if (bviBody) {
      Manipulator.setData(bviBody, name, value)
    }
  }

  /**
   * Регистрирует обработчик клика на элементе панели.
   * @private
   * @param {string|Element|null} selectorOrElement - CSS-селектор или элемент.
   * @param {(element: HTMLElement, event: Event) => void} callback - Обработчик клика; получает элемент, на котором он зарегистрирован, и событие.
   * @returns {void}
   */
  _onClick (selectorOrElement, callback) {
    const element = getElement(selectorOrElement)

    if (!element) {
      return
    }

    this._panelListeners.on(element, 'click', event => {
      event.preventDefault()
      callback(/** @type {HTMLElement} */ (element), event)
    })
  }

}

export { Bvi }
export default Bvi

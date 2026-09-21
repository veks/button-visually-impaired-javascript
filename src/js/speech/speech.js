/**
 * Управление синтезом речи, кнопками воспроизведения и подсветкой текста.
 * @file
 */
import I18n from '../i18n'
import { getSpeechControlsTemplate } from './template'
import {
  createElement,
  EventHandler,
  findVoice,
  insert,
  Manipulator,
  removeElement,
  SelectorEngine,
  stringToBoolean,
  synth,
  unwrap,
  wrapInner,
} from '../util'
import { getCookie } from '../util/cookie'

/**
 * Управляет озвучиванием текста, состоянием кнопок и подсветкой слов.
 * @class
 * @classdesc Оборачивает Web Speech API и связывает его с DOM-контролами.
 */
class Speech {
  /**
   * Создаёт контроллер синтеза речи.
   * @param {{lang?: string}} [options={}] - Параметры речи.
   */
  constructor (options = {}) {
    this._lang = options.lang || 'ru-RU'
    this._i18n = new I18n({ lang: this._lang })
    this._statusTimer = null
    this._playback = null
    this._listeners = EventHandler.scope()
  }

  /**
   * Добавляет контролы речи к найденным блокам текста.
   * @returns {void}
   */
  mount () {
    this.destroyControls()

    if (!this.isEnabled()) {
      return
    }

    SelectorEngine.all('.bvi-speech').forEach((speechBlock, index) => {
      const id = `bvi-speech-text-id-${index + 1}`

      wrapInner(speechBlock, 'div', `bvi-speech-text ${id}`)
      insert(speechBlock, 'afterbegin', getSpeechControlsTemplate(this._i18n))
    })

    this._bindControls()
  }

  /**
   * Останавливает речь и удаляет связанные DOM-контролы.
   * @returns {void}
   */
  destroy () {
    this.stopStatusTimer()
    this.destroyControls()

    if (this.isSupported()) {
      this._cancelSpeech()
    }

    this._playback = null
  }

  /**
   * Отменяет все реплики в очереди синтезатора и снимает с него паузу: иначе после паузы следующая озвучка не начнётся.
   * @private
   * @returns {void}
   */
  _cancelSpeech () {
    synth().cancel()

    if (synth().paused) {
      synth().resume()
    }
  }

  /**
   * Удаляет контролы речи и восстанавливает исходный текст.
   * @returns {void}
   */
  destroyControls () {
    this._listeners.clear()
    this._restoreAllHighlightedText()
    SelectorEngine.all('.bvi-speech-text').forEach(element => unwrap(element))
    SelectorEngine.all('.bvi-speech-link').forEach(element => removeElement(element))
  }

  /**
   * Запускает опрос синтезатора раз в секунду: когда речь закончилась (очередь пуста, пауз нет),
   * кнопки блоков возвращаются в состояние «остановлено». Ничего не делает, если озвучка выключена.
   * @returns {void}
   */
  startStatusTimer () {
    this.stopStatusTimer()

    if (!this.isEnabled()) {
      return
    }

    this._statusTimer = setInterval(() => {
      if (this._playback && this._playback.paused) {
        return
      }

      if (!synth().pending && !synth().speaking && !synth().paused) {
        this.disableButtons()
      }
    }, 1000)
  }

  /**
   * Останавливает опрос состояния синтезатора.
   * @returns {void}
   */
  stopStatusTimer () {
    if (this._statusTimer) {
      clearInterval(this._statusTimer)
      this._statusTimer = null
    }
  }

  /**
   * Озвучивает текст и при необходимости подсвечивает произносимые слова.
   * @param {string} text - Текст для озвучивания.
   * @param {HTMLElement|null} [element=null] - Блок для подсветки слов.
   * @param {boolean} [echo=false] - Включить подсветку во время озвучивания.
   * @returns {void}
   */
  speak (text, element = null, echo = false) {
    if (!this.isEnabled()) {
      return
    }

    this._restoreAllHighlightedText()
    this._cancelSpeech()
    this._startPlayback(String(text), element, echo)
  }

  /**
   * Делит текст на фрагменты и ставит их в очередь синтезатора, при необходимости готовя подсветку слов.
   * @private
   * @param {string} text - Полный текст блока.
   * @param {HTMLElement|null} element - Блок, в котором подсвечиваются произносимые слова.
   * @param {boolean} [echo=false] - Подсвечивать ли слова во время озвучки.
   * @param {number} [startPosition=0] - Индекс символа, с которого начать; нужен для продолжения после паузы.
   * @returns {void}
   */
  _startPlayback (text, element, echo = false, startPosition = 0) {
    const sourceText = String(text)
    const target = echo && element ? this._prepareHighlighting(element) : null
    const chunks = this._splitText(sourceText.slice(startPosition), startPosition)

    const playback = {
      echo,
      element,
      paused: false,
      pauseFallback: false,
      position: startPosition,
      target,
      text: sourceText,
    }

    this._playback = playback

    chunks.forEach((chunk, index) => {
      const utter = this._createUtterance(chunk.text)

      if (target) {
        this._addHighlighting(utter, target, chunk.start, index === chunks.length - 1, playback)
      }

      try {
        synth().speak(utter)
      } catch (error) {
        this._playback = null
        this._restoreAllHighlightedText()
      }
    })
  }

  /**
   * Проверяет, включён ли синтез речи в настройках и браузере.
   * @returns {boolean} Доступна ли озвучка.
   */
  isEnabled () {
    return this.isSupported() && stringToBoolean(getCookie('speech'))
  }

  /**
   * Проверяет наличие Web Speech API.
   * @returns {boolean} Поддерживается ли синтез речи.
   */
  isSupported () {
    return 'speechSynthesis' in window
  }

  /**
   * Переводит кнопки речи в состояние «остановлено».
   * @returns {void}
   */
  disableButtons () {
    SelectorEngine.all('.bvi-speech-play').forEach(element => this._setDisabled(element, false))
    SelectorEngine.all('.bvi-speech-pause').forEach(element => this._setDisabled(element, true))
    SelectorEngine.all('.bvi-speech-resume').forEach(element => this._setDisabled(element, true))
    SelectorEngine.all('.bvi-speech-stop').forEach(element => this._setDisabled(element, true))
  }

  /**
   * Делает кнопку доступной или недоступной: класс `disabled` и свойство `disabled` меняются вместе.
   * @private
   * @param {HTMLElement} element - Кнопка озвучки.
   * @param {boolean} disabled - `true` — кнопка недоступна.
   * @returns {void}
   */
  _setDisabled (element, disabled) {
    const button = /** @type {HTMLButtonElement} */ (element)

    Manipulator.toggleClass(button, 'disabled', disabled)
    button.disabled = disabled
  }

  /**
   * Подписывает кнопки «Воспроизвести», «Пауза», «Продолжить» и «Стоп» во всех блоках озвучки на обработчики.
   * @private
   * @returns {void}
   */
  _bindControls () {
    this._onClickAll('.bvi-speech-play', button => this._playBlock(button))
    this._onClickAll('.bvi-speech-pause', button => this._pauseBlock(button))
    this._onClickAll('.bvi-speech-resume', button => this._resumeBlock(button))
    this._onClickAll('.bvi-speech-stop', button => this._stopBlock(button))
  }

  /**
   * Возвращает контейнер кнопок озвучки, в котором лежит кнопка.
   * @private
   * @param {HTMLElement} button - Нажатая кнопка.
   * @returns {HTMLElement|null} Контейнер `.bvi-speech-link` или `null`.
   */
  _getControls (button) {
    return SelectorEngine.ancestor(button, '.bvi-speech-link')
  }

  /**
   * Озвучивает текст блока, к которому относится нажатая кнопка, и переводит кнопки блока в состояние «воспроизведение».
   * @private
   * @param {HTMLElement} button - Нажатая кнопка «Воспроизвести».
   * @returns {void}
   */
  _playBlock (button) {
    const controls = this._getControls(button)
    const text = controls ? SelectorEngine.sibling(controls, '.bvi-speech-text') : null

    if (!controls || !text) {
      return
    }

    const hadFocus = controls.contains(document.activeElement)

    this.speak(text.textContent, text, true)
    this.disableButtons()

    this._setControlsState(controls, 'playing', hadFocus)
  }

  /**
   * Ставит воспроизведение на паузу и переводит кнопки блока в состояние «пауза».
   * @private
   * @param {HTMLElement} button - Нажатая кнопка «Пауза».
   * @returns {void}
   */
  _pauseBlock (button) {
    const controls = this._getControls(button)

    if (!controls) {
      return
    }

    synth().pause()
    this._pauseWithFallback()
    this._setControlsState(controls, 'paused')
  }

  /**
   * Продолжает воспроизведение после паузы. Если пауза была заменена отменой речи (`pauseFallback`),
   * озвучка запускается заново с сохранённой позиции.
   * @private
   * @param {HTMLElement} button - Нажатая кнопка «Продолжить».
   * @returns {void}
   */
  _resumeBlock (button) {
    const controls = this._getControls(button)

    if (!controls) {
      return
    }

    if (this._playback && this._playback.pauseFallback) {
      const position = this._getResumePosition()
      const playback = this._playback

      this._restoreHighlightedText(playback.target)
      this._startPlayback(playback.text, playback.element, playback.echo, position)
    } else {
      if (this._playback) {
        this._playback.paused = false
      }

      synth().resume()
    }

    this._setControlsState(controls, 'playing')
  }

  /**
   * Останавливает воспроизведение, сбрасывает состояние и убирает подсветку слов.
   * @private
   * @param {HTMLElement} button - Нажатая кнопка «Стоп».
   * @returns {void}
   */
  _stopBlock (button) {
    const controls = this._getControls(button)

    if (!controls) {
      return
    }

    this._cancelSpeech()
    this._playback = null
    this._setControlsState(controls, 'stopped')
    this._restoreAllHighlightedText()
  }

  /**
   * Обновляет доступность кнопок управления воспроизведением.
   * @private
   * @param {HTMLElement} controls - Контейнер кнопок.
   * @param {'playing'|'paused'|'stopped'} state - Состояние воспроизведения.
   * @param {boolean} [hadFocus] - Был ли фокус внутри контейнера.
   * @returns {void}
   */
  _setControlsState (controls, state, hadFocus = controls.contains(document.activeElement)) {
    /**
     * Кнопка внутри контейнера: все четыре кнопки создаёт шаблон, поэтому она всегда есть.
     * @param {string} name - Суффикс класса `bvi-speech-*`.
     * @returns {HTMLElement} Кнопка.
     */
    const button = name => /** @type {HTMLElement} */ (SelectorEngine.one(`.bvi-speech-${name}`, controls))
    const play = button('play')
    const pause = button('pause')
    const resume = button('resume')
    const stop = button('stop')

    this._setDisabled(play, state !== 'stopped')
    this._setDisabled(pause, state !== 'playing')
    this._setDisabled(resume, state !== 'paused')
    this._setDisabled(stop, state === 'stopped')

    if (hadFocus) {
      ({ playing: pause, paused: resume, stopped: play })[state].focus()
    }
  }

  /**
   * Помечает воспроизведение приостановленным. Если `pause()` ненадёжна (Firefox) или синтезатор продолжил
   * говорить спустя 120 мс, речь отменяется, а продолжение запускается заново с сохранённой позиции.
   * @private
   * @returns {void}
   */
  _pauseWithFallback () {
    if (!this._playback) {
      return
    }

    this._playback.paused = true

    if (this._needsCancelForPause()) {
      this._playback.pauseFallback = true
      this._cancelSpeech()
      return
    }

    setTimeout(() => {
      if (!this._playback || !this._playback.paused) {
        return
      }

      if (synth().speaking && !synth().paused) {
        this._playback.pauseFallback = true
        this._cancelSpeech()
      }
    }, 120)
  }

  /**
   * Определяет, нужно ли заменять паузу отменой речи: в Firefox `pause()` не останавливает речь надёжно.
   * @private
   * @returns {boolean} `true`, если браузер — Firefox.
   */
  _needsCancelForPause () {
    return typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent)
  }

  /**
   * Вычисляет позицию продолжения: ближайшая граница слова после последней произнесённой позиции,
   * чтобы озвучка не начиналась с середины слова.
   * @private
   * @returns {number} Индекс символа в полном тексте блока; `0`, если воспроизведения нет.
   */
  _getResumePosition () {
    if (!this._playback) {
      return 0
    }

    const position = Number(this._playback.position) || 0
    const text = this._playback.text

    if (position <= 0) {
      return 0
    }

    const nextSpace = text.slice(position).search(/\s/)

    if (nextSpace < 0) {
      return position
    }

    return Math.min(position + nextSpace + 1, text.length)
  }

  /**
   * Делит текст на фрагменты до 120 символов, предпочитая границы по знакам препинания и пробелам:
   * длинные реплики синтезатор нередко обрывает.
   * @private
   * @param {string} text - Текст для озвучки.
   * @param {number} [startOffset=0] - Смещение текста в полном тексте блока: по нему подсветка узнаёт абсолютную позицию.
   * @returns {{start: number, text: string}[]} Фрагменты и индекс начала каждого в полном тексте.
   */
  _splitText (text, startOffset = 0) {
    const chunkLength = 120
    const patternRegex = new RegExp(
      '^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}' +
      '|^[\\s\\S]{1,' + chunkLength + '}$' +
      '|^[\\s\\S]{1,' + chunkLength + '} ',
    )
    const chunks = []
    let value = String(text)

    while (value.length > 0) {
      const match = value.match(patternRegex)

      if (!match) {
        chunks.push({
          start: startOffset + String(text).length - value.length,
          text: value.slice(0, chunkLength),
        })
        value = value.slice(chunkLength)
        continue
      }

      chunks.push({
        start: startOffset + String(text).length - value.length,
        text: match[0],
      })
      value = value.substring(match[0].length)
    }

    return chunks
  }

  /**
   * Создаёт реплику синтезатора. Голос выбирается так: сохранённый в настройках (cookie `speechVoice`),
   * иначе подходящий языку плагина (`findVoice`), иначе выбор остаётся за браузером по `utter.lang`.
   * @private
   * @param {string} text - Текст фрагмента.
   * @returns {SpeechSynthesisUtterance} Реплика с громкостью, скоростью, тоном, языком и голосом.
   */
  _createUtterance (text) {
    const utter = new SpeechSynthesisUtterance(text.trim())
    const voices = synth().getVoices()
    const selectedVoice = getCookie('speechVoice')

    utter.volume = 1
    utter.rate = 1
    utter.pitch = 1
    utter.lang = this._lang

    const configuredVoice = voices.find(voice => {
      return selectedVoice && this._isSelectedVoice(voice, selectedVoice)
    })

    if (configuredVoice) {
      utter.voice = configuredVoice
      utter.lang = configuredVoice.lang
      return utter
    }

    const langVoice = findVoice(voices, this._lang)

    if (langVoice) {
      utter.voice = langVoice
      utter.lang = langVoice.lang
    }

    return utter
  }

  /**
   * Проверяет, совпадает ли голос с сохранённым в настройках: по `voiceURI` или по имени.
   * @private
   * @param {SpeechSynthesisVoice} voice - Проверяемый голос.
   * @param {string} selectedVoice - Значение из cookie `speechVoice`.
   * @returns {boolean} `true`, если это выбранный голос.
   */
  _isSelectedVoice (voice, selectedVoice) {
    return voice && (voice.voiceURI === selectedVoice || voice.name === selectedVoice)
  }

  /**
   * Оборачивает каждое слово блока в `span.bvi-speech-word` с границами в `data-bvi-start` и `data-bvi-end`,
   * чтобы подсвечивать произносимое слово. Исходный HTML сохраняется для восстановления.
   * @private
   * @param {HTMLElement} element - Блок с текстом.
   * @returns {HTMLElement} Тот же блок, готовый к подсветке.
   */
  _prepareHighlighting (element) {
    if (!Manipulator.getData(element, 'originalHtml')) {
      Manipulator.setData(element, 'originalHtml', element.innerHTML)
    }

    const text = element.textContent
    const fragment = document.createDocumentFragment()
    const tokens = text.match(/\S+|\s+/g) || []
    let offset = 0

    tokens.forEach(token => {
      if (/^\s+$/.test(token)) {
        fragment.appendChild(document.createTextNode(token))
      } else {
        const word = createElement('span')

        word.className = 'bvi-speech-word'
        Manipulator.setData(word, 'start', offset)
        Manipulator.setData(word, 'end', offset + token.length)
        word.textContent = token
        fragment.appendChild(word)
      }

      offset += token.length
    })

    element.innerHTML = ''
    element.appendChild(fragment)
    Manipulator.addClass(element, 'bvi-highlighting')

    return element
  }

  /**
   * Подписывает реплику на события синтезатора: `onboundary` подсвечивает слово и запоминает позицию,
   * `onend` последней реплики убирает подсветку. Если границы слов не приходят 700 мс (браузер не даёт их),
   * включается запасная подсветка блока целиком.
   * @private
   * @param {SpeechSynthesisUtterance} utter - Реплика фрагмента.
   * @param {HTMLElement} element - Блок, подготовленный `_prepareHighlighting`.
   * @param {number} [offset=0] - Индекс начала фрагмента в полном тексте блока.
   * @param {boolean} [isLast=false] - Последний ли это фрагмент воспроизведения.
   * @param {Object|null} [playback=null] - Состояние воспроизведения: события уже прерванного воспроизведения игнорируются.
   * @returns {void}
   */
  _addHighlighting (utter, element, offset = 0, isLast = false, playback = null) {
    let hasBoundary = false
    const fallbackTimer = setTimeout(() => {
      if (!hasBoundary) {
        Manipulator.addClass(element, 'bvi-highlighting-fallback')
      }
    }, 700)

    /**
     * Относится ли событие к воспроизведению, которое уже прервали или заменили новым.
     * @returns {boolean} `true`, если событие устарело и его нужно игнорировать.
     */
    const isStale = () => playback !== null && this._playback !== playback

    utter.onboundary = event => {
      if (isStale()) {
        return
      }

      hasBoundary = true
      clearTimeout(fallbackTimer)
      Manipulator.removeClass(element, 'bvi-highlighting-fallback')
      this._setPlaybackPosition(offset + event.charIndex)
      this._highlightWordAt(element, offset + event.charIndex)
    }

    utter.onend = () => {
      clearTimeout(fallbackTimer)

      if (isStale()) {
        return
      }

      if (this._playback && this._playback.paused) {
        return
      }

      if (isLast) {
        this._restoreHighlightedText(element)
        this._playback = null
      }
    }
  }

  /**
   * Запоминает индекс последнего произнесённого символа для продолжения после паузы.
   * @private
   * @param {number|string} position - Индекс символа в полном тексте блока.
   * @returns {void}
   */
  _setPlaybackPosition (position) {
    if (this._playback) {
      this._playback.position = Number(position) || 0
    }
  }

  /**
   * Подсвечивает слово, в границы которого попадает символ, и снимает подсветку с предыдущего слова.
   * @private
   * @param {HTMLElement} element - Блок с подготовленными словами.
   * @param {number|string} position - Индекс символа в полном тексте блока.
   * @returns {void}
   */
  _highlightWordAt (element, position) {
    const index = Number(position) >>> 0
    const active = SelectorEngine.one('.bvi-speech-word-active', element)

    if (active) {
      Manipulator.removeClass(active, 'bvi-speech-word-active')
    }

    const word = SelectorEngine.all('.bvi-speech-word', element).find(item => {
      const start = Number(Manipulator.getData(item, 'start'))
      const end = Number(Manipulator.getData(item, 'end'))

      return index >= start && index < end
    })

    if (word) {
      Manipulator.addClass(word, 'bvi-speech-word-active')
    }
  }

  /**
   * Снимает подсветку во всех блоках озвучки и возвращает им исходный HTML.
   * @private
   * @returns {void}
   */
  _restoreAllHighlightedText () {
    SelectorEngine.all('.bvi-speech-text.bvi-highlighting').forEach(element => {
      this._restoreHighlightedText(element)
    })
  }

  /**
   * Возвращает блоку исходный HTML и убирает классы подсветки.
   * @private
   * @param {HTMLElement|null} element - Блок озвучки; `null` игнорируется.
   * @returns {void}
   */
  _restoreHighlightedText (element) {
    if (!element) {
      return
    }

    Manipulator.removeClass(element, 'bvi-highlighting', 'bvi-highlighting-fallback')

    const original = Manipulator.getData(element, 'originalHtml')

    if (original) {
      element.innerHTML = original
      Manipulator.removeData(element, 'originalHtml')
    }
  }

  /**
   * Подписывает клик на все элементы, найденные по селектору; подписки снимаются вместе с остальными в `destroyControls()`.
   * @private
   * @param {string} selector - CSS-селектор кнопок.
   * @param {(button: HTMLElement) => void} callback - Обработчик; получает нажатую кнопку, `preventDefault()` уже вызван.
   * @returns {void}
   */
  _onClickAll (selector, callback) {
    SelectorEngine.all(selector).forEach(element => {
      this._listeners.on(element, 'click', event => {
        event.preventDefault()
        callback(element)
      })
    })
  }
}

export { Speech }
export default Speech

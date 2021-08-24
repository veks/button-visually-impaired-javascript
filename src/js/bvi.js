/**
 * --------------------------------------------------------------------------
 * Button visually impaired (v1.0.0): bvi.js
 * Licensed under MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE.md)
 * --------------------------------------------------------------------------
 */

import {
  checkConfig,
  stringToBoolean,
  wrapInner,
  unwrap,
  getObject,
  getArray,
  synth,
} from './util'

import {
  setCookie,
  getCookie,
  removeCookie,
} from './util/cookie'
import I18n from './i18n'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const Default = {
  target: '.bvi-open',
  fontSize: 16,
  theme: 'white',
  images: 'grayscale',
  letterSpacing: 'normal',
  lineHeight: 'normal',
  speech: true,
  fontFamily: 'arial',
  builtElements: false,
  panelFixed: true,
  panelHide: false,
  reload: false,
  lang: 'ru-RU',
}

const DefaultType = {
  target: 'string',
  fontSize: 'number',
  theme: 'string',
  images: '(string|boolean)',
  letterSpacing: 'string',
  lineHeight: 'string',
  speech: 'boolean',
  fontFamily: 'string',
  builtElements: 'boolean',
  panelFixed: 'boolean',
  panelHide: 'boolean',
  reload: 'boolean',
  lang: 'string',
}

const DefaultOptions = {
  target: '',
  fontSize: '(^[1-9]$|^[1-3][0-9]?$|^39$)',
  theme: '(white|black|blue|brown|green)',
  images: '(true|false|grayscale)',
  letterSpacing: '(normal|average|big)',
  lineHeight: '(normal|average|big)',
  speech: '(true|false)',
  fontFamily: '(arial|times)',
  builtElements: '(true|false)',
  panelFixed: '(true|false)',
  panelHide: '(true|false)',
  reload: '(true|false)',
  lang: '(ru-RU|en-US)',
}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
class Bvi {
  constructor(options) {
    this._config = this._getConfig(options)
    this._elements = document.querySelectorAll(this._config.target)
    this._i18n = new I18n({
      lang: this._config.lang
    })

    this._addEventListeners()
    this._init()

    console.log('Bvi console: ready Button visually impaired v1.0.0')
  }

  // Private

  _init() {
    getObject(this._config, key => {
      if (typeof getCookie(key) === 'undefined') {
        removeCookie('panelActive')
      }
    })

    if (stringToBoolean(getCookie('panelActive'))) {
      this._set()
      this._getPanel()
      this._addEventListenersPanel()
      this._images()
      this._speechPlayer()

      if ('speechSynthesis' in window && stringToBoolean(getCookie('speech'))) {

        setInterval(() => {
          if (synth().pending === false) {
            let play = document.querySelectorAll('.bvi-speech-play')
            let pause = document.querySelectorAll('.bvi-speech-pause')
            let resume = document.querySelectorAll('.bvi-speech-resume')
            let stop = document.querySelectorAll('.bvi-speech-stop')
            const el = (elements, callback) => {
              elements.forEach(element => {
                return callback(element)
              })
            }

            el(play, element => element.classList.remove('disabled'))
            el(pause, element => element.classList.add('disabled'))
            el(resume, element => element.classList.add('disabled'))
            el(stop, element => element.classList.add('disabled'))
          }
        }, 1000)
      }

    } else {
      this._remove()
    }
  }

  _addEventListeners() {
    if (!this._elements) {
      return false
    }

    this._elements.forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault()

        getObject(this._config, key => setCookie(key, this._config[key]))
        setCookie('panelActive', true)

        this._init()
        this._speech(`${this._i18n.v('panelOn')}`)
      })
    })

  }

  _addEventListenersPanel() {
    const elements = {
      fontSizeMinus: document.querySelector('.bvi-fontSize-minus'),
      fontSizePlus: document.querySelector('.bvi-fontSize-plus'),
      themeWhite: document.querySelector('.bvi-theme-white'),
      themeBlack: document.querySelector('.bvi-theme-black'),
      themeBlue: document.querySelector('.bvi-theme-blue'),
      themeBrown: document.querySelector('.bvi-theme-brown'),
      themeGreen: document.querySelector('.bvi-theme-green'),
      imagesOn: document.querySelector('.bvi-images-on'),
      imagesOff: document.querySelector('.bvi-images-off'),
      imagesGrayscale: document.querySelector('.bvi-images-grayscale'),
      speechOn: document.querySelector('.bvi-speech-on'),
      speechOff: document.querySelector('.bvi-speech-off'),
      lineHeightNormal: document.querySelector('.bvi-line-height-normal'),
      lineHeightAverage: document.querySelector('.bvi-line-height-average'),
      lineHeightBig: document.querySelector('.bvi-line-height-big'),
      letterSpacingNormal: document.querySelector('.bvi-letter-spacing-normal'),
      letterSpacingAverage: document.querySelector('.bvi-letter-spacing-average'),
      letterSpacingBig: document.querySelector('.bvi-letter-spacing-big'),
      fontFamilyArial: document.querySelector('.bvi-font-family-arial'),
      fontFamilyTimes: document.querySelector('.bvi-font-family-times'),
      builtElementsOn: document.querySelector('.bvi-built-elements-on'),
      builtElementsOff: document.querySelector('.bvi-built-elements-off'),
      reset: document.querySelector('.bvi-reset'),
      links: document.querySelectorAll('.bvi-link'),
      modal: document.querySelector('.bvi-modal')
    }

    const activeLink = element => {
      for (let sibling of element.parentNode.children) {
        sibling.classList.remove('active')
      }

      element.classList.add('active')
    }

    const click = (element, callback) => {
      element.addEventListener('click', event => {
        event.preventDefault()

        if (typeof callback === 'function') {
          callback(event)
        }
      })
    }

    const activeAll = () => {
      let links = document.querySelectorAll('.bvi-link')

      links.forEach(link => {
        link.classList.remove('active')
      })

      getObject(this._config, key => {
        if (key === 'theme') {
          let value = getCookie(key)
          document.querySelector(`.bvi-theme-${value}`).classList.add('active')
        }

        if (key === 'images') {
          let value = getCookie(key) === 'grayscale' ? 'grayscale' : stringToBoolean(getCookie(key)) ? 'on' : 'off'

          document.querySelector(`.bvi-images-${value}`).classList.add('active')
        }

        if (key === 'speech') {
          let value = stringToBoolean(getCookie(key)) ? 'on' : 'off'

          document.querySelector(`.bvi-speech-${value}`).classList.add('active')
        }

        if (key === 'lineHeight') {
          let value = getCookie(key)

          document.querySelector(`.bvi-line-height-${value}`).classList.add('active')
        }

        if (key === 'letterSpacing') {
          let value = getCookie(key)

          document.querySelector(`.bvi-letter-spacing-${value}`).classList.add('active')
        }

        if (key === 'fontFamily') {
          let value = getCookie(key)

          document.querySelector(`.bvi-font-family-${value}`).classList.add('active')
        }

        if (key === 'builtElements') {
          let value = stringToBoolean(getCookie(key)) ? 'on' : 'off'

          document.querySelector(`.bvi-built-elements-${value}`).classList.add('active')
        }
      })
    }

    activeAll()

    // Font size
    click(elements.fontSizeMinus, () => {
      let size = parseFloat(getCookie('fontSize')) - 1

      if (size !== 0) {
        this._setAttrDataBviBody('fontSize', size)
        setCookie('fontSize', size)
        this._speech(`${this._i18n.v('fontSizeMinus')}`)
        activeLink(elements.fontSizeMinus)
      }
    })

    click(elements.fontSizePlus, () => {
      let size = parseFloat(getCookie('fontSize')) + 1

      if (size !== 40) {
        this._setAttrDataBviBody('fontSize', size)
        setCookie('fontSize', size)
        this._speech(`${this._i18n.v('fontSizePlus')}`)
        activeLink(elements.fontSizePlus)
      }
    })

    // Theme
    click(elements.themeWhite, () => {
      this._setAttrDataBviBody('theme', 'white')
      setCookie('theme', 'white')
      this._speech(`${this._i18n.v('siteColorBlackOnWhite')}`)
      activeLink(elements.themeWhite)
    })

    click(elements.themeBlack, () => {
      this._setAttrDataBviBody('theme', 'black')
      setCookie('theme', 'black')
      this._speech(`${this._i18n.v('siteColorWhiteOnBlack')}`)
      activeLink(elements.themeBlack)
    })

    click(elements.themeBlue, () => {
      this._setAttrDataBviBody('theme', 'blue')
      setCookie('theme', 'blue')
      this._speech(`${this._i18n.v('siteColorDarkBlueOnBlue')}`)
      activeLink(elements.themeBlue)
    })

    click(elements.themeBrown, () => {
      this._setAttrDataBviBody('theme', 'brown')
      setCookie('theme', 'brown')
      this._speech(`${this._i18n.v('siteColorBeigeBrown')}`)
      activeLink(elements.themeBrown)
    })

    click(elements.themeGreen, () => {
      this._setAttrDataBviBody('theme', 'green')
      setCookie('theme', 'green')
      this._speech(`${this._i18n.v('siteColorGreenOnDarkBrown')}`)
      activeLink(elements.themeGreen)
    })

    // Images
    click(elements.imagesOn, () => {
      this._setAttrDataBviBody('images', 'true')
      setCookie('images', 'true')
      this._speech(`${this._i18n.v('imagesOn')}`)
      activeLink(elements.imagesOn)
    })

    click(elements.imagesOff, () => {
      this._setAttrDataBviBody('images', 'false')
      setCookie('images', 'false')
      this._speech(`${this._i18n.v('imagesOFF')}`)
      activeLink(elements.imagesOff)
    })

    click(elements.imagesGrayscale, () => {
      this._setAttrDataBviBody('images', 'grayscale')
      setCookie('images', 'grayscale')
      this._speech(`${this._i18n.v('imagesGrayscale')}`)
      activeLink(elements.imagesGrayscale)
    })

    // Speech
    click(elements.speechOn, () => {
      this._setAttrDataBviBody('speech', 'true')
      setCookie('speech', 'true')
      this._speech(`${this._i18n.v('speechOn')}`)
      activeLink(elements.speechOn)
      this._speechPlayer()
    })

    click(elements.speechOff, () => {
      this._speech(`${this._i18n.v('speechOff')}`)
      this._setAttrDataBviBody('speech', 'false')
      setCookie('speech', 'false')
      activeLink(elements.speechOff)
      this._speechPlayer()
    })

    // Line height
    click(elements.lineHeightNormal, () => {
      this._setAttrDataBviBody('lineHeight', 'normal')
      setCookie('lineHeight', 'normal')
      this._speech(`${this._i18n.v('lineHeightNormal')}`)
      activeLink(elements.lineHeightNormal)
    })

    click(elements.lineHeightAverage, () => {
      this._setAttrDataBviBody('lineHeight', 'average')
      setCookie('lineHeight', 'average')
      this._speech(`${this._i18n.v('lineHeightAverage')}`)
      activeLink(elements.lineHeightAverage)
    })

    click(elements.lineHeightBig, () => {
      this._setAttrDataBviBody('lineHeight', 'big')
      setCookie('lineHeight', 'big')
      this._speech(`${this._i18n.v('lineHeightBig')}`)
      activeLink(elements.lineHeightBig)
    })

    // Letter spacing
    click(elements.letterSpacingNormal, () => {
      this._setAttrDataBviBody('letterSpacing', 'normal')
      setCookie('letterSpacing', 'normal')
      this._speech(`${this._i18n.v('LetterSpacingNormal')}`)
      activeLink(elements.letterSpacingNormal)
    })

    click(elements.letterSpacingAverage, () => {
      this._setAttrDataBviBody('letterSpacing', 'average')
      setCookie('letterSpacing', 'average')
      this._speech(`${this._i18n.v('LetterSpacingAverage')}`)
      activeLink(elements.letterSpacingAverage)
    })

    click(elements.letterSpacingBig, () => {
      this._setAttrDataBviBody('letterSpacing', 'big')
      setCookie('letterSpacing', 'big')
      this._speech(`${this._i18n.v('LetterSpacingBig')}`)
      activeLink(elements.letterSpacingBig)
    })

    // Font family
    click(elements.fontFamilyArial, () => {
      this._setAttrDataBviBody('fontFamily', 'arial')
      setCookie('fontFamily', 'arial')
      this._speech(`${this._i18n.v('fontArial')}`)
      activeLink(elements.fontFamilyArial)
    })

    click(elements.fontFamilyTimes, () => {
      this._setAttrDataBviBody('fontFamily', 'times')
      setCookie('fontFamily', 'times')
      this._speech(`${this._i18n.v('fontTimes')}`)
      activeLink(elements.fontFamilyTimes)
    })

    // Built elements
    click(elements.builtElementsOn, () => {
      this._setAttrDataBviBody('builtElements', 'true')
      setCookie('builtElements', 'true')
      this._speech(`${this._i18n.v('builtElementsOn')}`)
      activeLink(elements.builtElementsOn)
    })

    click(elements.builtElementsOff, () => {
      this._setAttrDataBviBody('builtElements', 'false')
      setCookie('builtElements', 'false')
      this._speech(`${this._i18n.v('builtElementsOFF')}`)
      activeLink(elements.builtElementsOff)
    })

    // Reset
    click(elements.reset, () => {
      this._speech(`${this._i18n.v('resetSettings')}`)
      getObject(this._config, key => {
        this._setAttrDataBviBody(key, this._config[key])
        setCookie(key, this._config[key])
        activeAll()
      })
    })

    getArray(elements.links, element => {
      click(element, event => {
        let target = event.target.getAttribute('data-bvi')

        if (target === 'close') {
          this._setAttrDataBviBody('panelActive', 'false')
          setCookie('panelActive', 'false')
          this._init()
        }

        if (target === 'modal') {
          document.body.style.overflow = 'hidden'
          document.body.classList.add('bvi-noscroll')
          elements.modal.classList.toggle('show')
        }

        if (target === 'modal-close') {
          document.body.classList.remove('bvi-noscroll')
          document.body.style.overflow = ''
          elements.modal.classList.remove('show')
        }

        if (target === 'panel-hide') {
          document.querySelector('.bvi-panel').classList.add('bvi-panel-hide')
          document.querySelector('.bvi-link-fixed-top').classList.remove('bvi-hide')
          document.querySelector('.bvi-link-fixed-top').classList.add('bvi-show')
          setCookie('panelHide', 'true')
          this._speech(`${this._i18n.v('panelHide')}`)
        }

        if (target === 'panel-show') {
          document.querySelector('.bvi-link-fixed-top').classList.remove('bvi-show')
          document.querySelector('.bvi-link-fixed-top').classList.add('bvi-hide')
          document.querySelector('.bvi-panel').classList.remove('bvi-panel-hide')
          setCookie('panelHide', 'false')
          this._speech(`${this._i18n.v('panelShow')}`)
        }
      })
    })

    click(elements.modal, event => {
      if (event.target.contains(elements.modal)) {
        document.body.classList.remove('bvi-noscroll')
        document.body.style.overflow = ''
        elements.modal.classList.remove('show')
      }
    })
  }

  _getPanel() {
    const scroll = () => {
      let scroll = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop

      if (stringToBoolean(getCookie('panelFixed'))) {
        if (scroll > 200) {
          document.querySelector('.bvi-panel').classList.add('bvi-fixed-top')
        } else {
          document.querySelector('.bvi-panel').classList.remove('bvi-fixed-top')
        }
      }
    }

    let panelHide = stringToBoolean(getCookie('panelHide')) ? ' bvi-panel-hide' : ''
    let linkHide = !stringToBoolean(getCookie('panelHide')) ? ' bvi-hide' : 'bvi-show'
    let html = `
    <div class='bvi-panel${panelHide}'>
        <div class="bvi-blocks bvi-block-center">
            <div class="bvi-block">
                <div class="bvi-block-title">${this._i18n.t('fontSize')}</div>
                <a class="bvi-link bvi-fontSize-minus">А-</a>
                <a class="bvi-link bvi-fontSize-plus">А+</a>
            </div>
            <div class="bvi-block">
                <div class="bvi-block-title">${this._i18n.t('siteColors')}</div>
                <a href="#" class="bvi-link bvi-theme-white">Ц</a>
                <a href="#" class="bvi-link bvi-theme-black">Ц</a>
                <a href="#" class="bvi-link bvi-theme-blue">Ц</a>
                <a href="#" class="bvi-link bvi-theme-brown">Ц</a>
                <a href="#" class="bvi-link bvi-theme-green">Ц</a>
            </div>
            <div class="bvi-block">
                <div class="bvi-block-title">${this._i18n.t('images')}</div>
                <a href="#" class="bvi-link bvi-images-on">
                    <i class="bvi-images bvi-images-image"></i>
                </a>
                <a href="#" class="bvi-link bvi-images-off">
                    <i class="bvi-images bvi-images-minus-circle"></i>
                </a>
                <a href="#" class="bvi-link bvi-images-grayscale">
                    <i class="bvi-images bvi-images-adjust"></i>
                </a>
            </div>
            <div class="bvi-block">
                <div class="bvi-block-title">${this._i18n.t('speech')}</div>
                <a href="#" class="bvi-link bvi-speech-off">
                    <i class="bvi-images bvi-images-volume-off"></i>
                </a>
                <a href="#" class="bvi-link bvi-speech-on">
                    <i class="bvi-images bvi-images-volume-up"></i>
                </a>
            </div>
            <div class="bvi-block">
                <div class="bvi-block-title">${this._i18n.t('settings')}</div>
                <a href="#" class="bvi-link" data-bvi="modal">
                    <i class="bvi-images bvi-images-cog"></i>
                </a>
                <a href="#" class="bvi-link" data-bvi="close">
                    ${this._i18n.t('regularVersionOfTheSite')}
                </a>
                <a href="#" class="bvi-link" data-bvi="panel-hide">
                    <i class="bvi-images bvi-images-minus"></i>
                </a>
            </div>
        </div>
        <div class="bvi-modal">
            <div class="bvi-modal-dialog">
                <div class="bvi-modal-content">
                    <div class="bvi-modal-header">
                        <div class="bvi-modal-title">${this._i18n.t('settings')}</div>
                        <a href="#" class="bvi-link bvi-modal-close" data-bvi="modal-close">×</a>
                    </div>
                    <div class="bvi-modal-body">
                        <div class="bvi-blocks bvi-block-center">
                            <div class="bvi-block">
                                <div class="bvi-block-title">${this._i18n.t('letterSpacing')}</div>
                                <a href="#" class="bvi-link bvi-letter-spacing-normal">${this._i18n.t('normal')}</a>
                                <a href="#" class="bvi-link bvi-letter-spacing-average">${this._i18n.t('average')}</a>
                                <a href="#" class="bvi-link bvi-letter-spacing-big">${this._i18n.t('big')}</a>
                            </div>
                            <div class="bvi-block">
                                <div class="bvi-block-title">${this._i18n.t('lineHeight')}</div>
                                <a href="#" class="bvi-link bvi-line-height-normal">${this._i18n.t('normal')}</a>
                                <a href="#" class="bvi-link bvi-line-height-average">${this._i18n.t('average')}</a>
                                <a href="#" class="bvi-link bvi-line-height-big">${this._i18n.t('big')}</a>
                            </div>
                            <div class="bvi-block">
                                <div class="bvi-block-title">${this._i18n.t('font')}</div>
                                <a href="#" class="bvi-link bvi-font-family-arial">${this._i18n.t('arial')}</a>
                                <a href="#" class="bvi-link bvi-font-family-times">${this._i18n.t('times')}</a>
                            </div>
                            <div class="bvi-block">
                                <div class="bvi-block-title">${this._i18n.t('builtElements')}</div>
                                <a href="#" class="bvi-link bvi-built-elements-on">${this._i18n.t('on')}</a>
                                <a href="#" class="bvi-link bvi-built-elements-off">${this._i18n.t('off')}</a>
                            </div>
                        </div>
                        <div class="bvi-blocks bvi-block-center">
                            <a href="https://bvi.isvek.ru" class="bvi-copyright" target="_blank">bvi.isvek.ru</a>
                        </div>
                    </div>
                    <div class="bvi-modal-footer">
                        <a href="#" class="bvi-link bvi-reset">${this._i18n.t('reset')}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    let link = `<a href="#" class="bvi-link bvi-link-fixed-top bvi-no-styles ${linkHide}" data-bvi="panel-show">` +
      '<i class="bvi-images bvi-images-eye bvi-images-size-32 bvi-no-styles"></i></a>'

    window.addEventListener('scroll', scroll)
    document.querySelector('.bvi-body').insertAdjacentHTML('beforebegin', html)
    document.querySelector('.bvi-body').insertAdjacentHTML('afterbegin', link)
    scroll()
  }

  _set() {
    document.body.classList.add('bvi-active')
    wrapInner(document.body, 'div', 'bvi-body')
    getObject(this._config, key => this._setAttrDataBviBody(key, getCookie(key)))
    getArray(this._elements, element => element.style.display = 'none')

    document.querySelectorAll('img')
      .forEach(element => {
        if (element.classList.contains('bvi-img')) {
          element.classList.remove('bvi-img')
        }
      })

    document.querySelectorAll('body *')
      .forEach(element => {
        if (element.classList.contains('bvi-background-image')) {
          element.classList.remove('bvi-background-image')
        }
      })
  }

  _remove() {
    let bviPanel = document.querySelector('.bvi-panel')
    let bviBody = document.querySelector('.bvi-body')
    let bviLinkFixedTop = document.querySelector('.bvi-link-fixed-top')

    if (bviPanel) {
      bviPanel.remove()
    }

    if (bviBody) {
      unwrap(bviBody)
    }

    if (bviLinkFixedTop) {
      bviLinkFixedTop.remove()
    }

    this._speech(`${this._i18n.v('panelOff')}`)

    document.body.classList.remove('bvi-active')

    getArray(this._elements, element => element.style.display = '')

    if (stringToBoolean(getCookie('reload'))) {
      document.location.reload()
    }

    getObject(this._config, key => {
      removeCookie(key)
    })

    this._speechPlayer()

    removeCookie('panelActive')
  }

  _images() {
    document.querySelectorAll('img').forEach(element => {
      if (!element.classList.contains('bvi-no-style')) {
        element.classList.add('bvi-img')
      }
    })

    document.querySelectorAll('.bvi-body *').forEach(element => {
      let style = getComputedStyle(element)
      if (style.backgroundImage !== 'none' && style.background !== 'none' && !element.classList.contains('bvi-no-style')) {
        element.classList.add('bvi-background-image')
      }
    })
  }

  _getConfig(config) {
    config = {...Default, ...config}
    let extended = {}

    for (let keyDefault in Default) {
      extended[keyDefault] = config[keyDefault]
    }

    checkConfig(extended, DefaultType, DefaultOptions)

    return extended
  }

  _setAttrDataBviBody(name = '', value = '') {
    document.querySelector('.bvi-body').setAttribute(`data-bvi-${name}`, value)
  }

  _speechPlayer() {
    let selectorSpeechText = document.querySelectorAll('.bvi-speech-text')
    let selectorSpeechLink = document.querySelectorAll('.bvi-speech-link')
    let selectorBviSpeech = document.querySelectorAll('.bvi-speech')

    if ('speechSynthesis' in window && stringToBoolean(getCookie('speech'))) {

      if (selectorBviSpeech) {
        if (selectorSpeechText) {
          selectorSpeechText.forEach(element => unwrap(element))
        }

        if (selectorSpeechLink) {
          selectorSpeechLink.forEach(element => element.remove())
        }

        selectorBviSpeech.forEach((speechDivBlock, index) => {
          let id = `bvi-speech-text-id-${index + 1}`
          let html = `
            <div class="bvi-speech-link">
              <a href="#" class="bvi-link bvi-speech-play" title="Воспроизвести">Воспроизвести</a>
              <a href="#" class="bvi-link bvi-speech-pause disabled" title="Пауза">Пауза</a>
              <a href="#" class="bvi-link bvi-speech-resume disabled" title="Продолжить">Продолжить</a>
              <a href="#" class="bvi-link bvi-speech-stop disabled" title="Стоп">Стоп</i></a>
          </div>`

          wrapInner(speechDivBlock, 'div', `bvi-speech-text ${id}`)
          speechDivBlock.insertAdjacentHTML('afterbegin', html)
        })

        let selectorPlay = document.querySelectorAll('.bvi-speech-play')
        let selectorPause = document.querySelectorAll('.bvi-speech-pause')
        let selectorResume = document.querySelectorAll('.bvi-speech-resume')
        let selectorStop = document.querySelectorAll('.bvi-speech-stop')
        const el = (elements, callback) => {
          elements.forEach(element => {
            element.addEventListener('click', event => {
              event.preventDefault()
              if (typeof callback === 'function') {
                return callback(element, event)
              }
            }, false)
          })
        }

        el(selectorPlay, (element, event) => {
          let target = event.target
          let text = target.parentNode.nextElementSibling;
          let closest = event.target.closest('.bvi-speech-link')
          let play = document.querySelectorAll('.bvi-speech-play')
          let pause = document.querySelectorAll('.bvi-speech-pause')
          let resume = document.querySelectorAll('.bvi-speech-resume')
          let stop = document.querySelectorAll('.bvi-speech-stop')

          this._speech(text.textContent, text, true);

          play.forEach(element => element.classList.remove('disabled'))
          pause.forEach(element => element.classList.add('disabled'))
          resume.forEach(element => element.classList.add('disabled'))
          stop.forEach(element => element.classList.add('disabled'))

          target.classList.add('disabled')
          closest.querySelector('.bvi-speech-pause').classList.remove('disabled')
          closest.querySelector('.bvi-speech-stop').classList.remove('disabled')
        })

        el(selectorPause, (element, event) => {
          let target = event.target
          let closest = event.target.closest('.bvi-speech-link')

          target.classList.add('disabled')
          closest.querySelector('.bvi-speech-resume').classList.remove('disabled')
          synth().pause()
        })

        el(selectorResume, (element, event) => {
          let target = event.target
          let closest = event.target.closest('.bvi-speech-link')

          target.classList.add('disabled')
          closest.querySelector('.bvi-speech-pause').classList.remove('disabled')
          synth().resume()
        })

        el(selectorStop, (element, event) => {
          let target = event.target
          let closest = event.target.closest('.bvi-speech-link')

          target.classList.add('disabled')
          closest.querySelector('.bvi-speech-pause').classList.add('disabled')
          closest.querySelector('.bvi-speech-play').classList.remove('disabled')
          synth().cancel();
        })
      }
    } else {
      if (selectorSpeechText) {
        selectorSpeechText.forEach(element => unwrap(element))
      }

      if (selectorSpeechLink) {
        selectorSpeechLink.forEach(element => element.remove())
      }
    }
  }

  _speech(text, element, echo = false) {
    if ('speechSynthesis' in window && stringToBoolean(getCookie('speech'))) {
      synth().cancel()
      const getWordAt = (str, pos) => {
        str = String(str)
        pos = Number(pos) >>> 0

        let left = str.slice(0, pos + 1).search(/\S+$/)
        let right = str.slice(pos).search(/\s/)

        if (right < 0) {
          return str.slice(left)
        }
        return str.slice(left, right + pos)
      }

      let chunkLength = 120
      let patternRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ')
      let array = []
      let $text = text
      let voices = synth().getVoices()

      while ($text.length > 0) {
        array.push($text.match(patternRegex)[0])
        $text = $text.substring(array[array.length - 1].length)
      }

      array.forEach(getText => {
        let utter = new SpeechSynthesisUtterance(getText.trim())
        utter.volume = 1
        utter.rate = 1
        utter.pitch = 1
        utter.lang = this._config.lang

        for (let i = 0; i < voices.length; i++) {
          if (this._config.lang === 'ru-RU' && voices[i].name === 'Microsoft Pavel - Russian (Russia)') {
            utter.voice = voices[i]
          }

          if (this._config.lang === 'en-US' && voices[i].name === 'Microsoft Pavel - English (English)') {
            utter.voice = voices[i]
          }
        }

        if (echo) {
          utter.onboundary = event => {

            element.classList.add('bvi-highlighting')
            let world = getWordAt(event.utterance.text, event.charIndex)
            let textContent = element.textContent
            let term = world.replace(/(\s+)/, '((<[^>]+>)*$1(<[^>]+>)*)')
            let pattern = new RegExp('(' + term + ')', 'gi')
            textContent = textContent.replace(pattern, '<mark>$1</mark>')
            textContent = textContent.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, '$1</mark>$2<mark>$4')
            element.innerHTML = textContent
          }

          utter.onend = event => {
            element.classList.remove('bvi-highlighting')
            let textContent = element.textContent
            textContent = textContent.replace(/(<mark>$1<\/mark>)/, '$1')
            element.innerHTML = textContent
          }
        }

        synth().speak(utter)
      })
    }
  }
}

export default Bvi

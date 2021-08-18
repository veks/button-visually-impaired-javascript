/**
 * --------------------------------------------------------------------------
 * Button visually impaired (v1.0.0): util/index.js
 * Licensed under MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE.md)
 * --------------------------------------------------------------------------
 */

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend () {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment()

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)))
        })

        this.insertBefore(docFrag, this.firstChild)
      },
    })
  })
})([Element.prototype, Document.prototype, DocumentFragment.prototype])

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}

if (window.HTMLCollection && !HTMLCollection.prototype.forEach) {
  HTMLCollection.prototype.forEach = Array.prototype.forEach
}

const toType = obj => {
  if (obj === null || obj === undefined) {
    return `${obj}`
  }

  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
}

const isElement = obj => {
  if (!obj || typeof obj !== 'object') {
    return false
  }

  return typeof obj.nodeType !== 'undefined'
}

const checkConfig = (config, configTypes, configOptions) => {
  Object.keys(configTypes).forEach(key => {
    const expectedTypes = configTypes[key]
    const value = config[key]
    const valueType = value && isElement(value) ? 'element' : toType(value)

    if (!new RegExp(expectedTypes).test(valueType)) {
      throw new TypeError(
        `Bvi console: Опция "${key}" предоставленный тип "${valueType}", ожидаемый тип "${expectedTypes}".`,
      )
    }
  })

  Object.keys(configOptions).forEach(key => {
    const expectedOptions = configOptions[key]
    const value = config[key]

    if (!new RegExp(expectedOptions).test(value)) {
      throw new TypeError(
        `Bvi console: Опция "${key}" параметр "${value}", ожидаемый параметр "${expectedOptions}".`,
      )
    }
  })
}

const plural = (number, text = ['пиксель', 'пекселя', 'пикселей']) => {
  if (number % 10 === 1 && number % 100 !== 11) {
    return `${number} ${text[0]}`
  } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
    return `${number} ${text[1]}`
  } else {
    return `${number} ${text[2]}`
  }
}

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

const wrapInner = (parent, wrapper, className) => {
  if (typeof wrapper === 'string') {
    wrapper = document.createElement(wrapper)
  }

  parent.appendChild(wrapper).className = className

  while (parent.firstChild !== wrapper) {
    wrapper.appendChild(parent.firstChild)
  }
}

const unwrap = wrapper => {
  let docFrag = document.createDocumentFragment()

  if (!wrapper) return

  while (wrapper.firstChild) {
    let child = wrapper.removeChild(wrapper.firstChild)
    docFrag.appendChild(child)
  }

  wrapper.parentNode.replaceChild(docFrag, wrapper)
}

const getObject = (object, callback) => {
  Object.keys(object).forEach(key => {
    if (typeof callback === 'function') {
      callback(key)
    }
  })
}

const getArray = (array, callback) => {
  Array.from(array).forEach(key => {
    if (typeof callback === 'function') {
      callback(key)
    }
  })
}

const inArray = (needle, haystack) => {
  let length = haystack.length

  for (let i = 0; i < length; i++) {
    if (haystack[i] === needle) {
      return true
    }
  }

  return false
}

const synth = () => window.speechSynthesis

const synthSupportBrowser = () => {
  return 'speechSynthesis' in window
}

export {
  plural,
  checkConfig,
  stringToBoolean,
  wrapInner,
  unwrap,
  getObject,
  getArray,
  synth,
  synthSupportBrowser,
  inArray,
}

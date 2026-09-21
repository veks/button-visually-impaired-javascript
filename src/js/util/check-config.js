import { isElement } from './dom'

/**
 * Определяет нормализованный тип JavaScript-значения.
 * @param {*} obj - Значение для проверки.
 * @returns {string} Имя типа в нижнем регистре.
 */
const toType = obj => {
  if (obj === null || obj === undefined) {
    return `${obj}`
  }

  const tag = {}.toString.call(obj).match(/\s([a-z]+)/i)

  return tag ? tag[1].toLowerCase() : 'object'
}

/**
 * Проверяет типы и допустимые значения конфигурации.
 * @param {Record<string, *>} config - Проверяемая конфигурация.
 * @param {Object<string, string>} configTypes - Регулярные выражения типов.
 * @param {Object<string, string>} configOptions - Регулярные выражения значений.
 * @returns {void}
 * @throws {TypeError} Если тип или значение параметра недопустимы.
 */
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

export { checkConfig }

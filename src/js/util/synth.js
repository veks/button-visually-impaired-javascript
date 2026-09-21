/**
 * @file Утилита доступа к браузерному синтезатору речи.
 *
 * Возвращает браузерный API синтеза речи.
 * @returns {SpeechSynthesis} Экземпляр синтезатора речи.
 */
const synth = () => window.speechSynthesis

/**
 * Приводит код языка к виду `pt-br`: Android отдаёт голоса как `pt_BR`, регистр бывает любым.
 * @param {string} code - Код языка.
 * @returns {string} Код в нижнем регистре с дефисом.
 */
const normalizeLang = code => String(code || '').toLowerCase().replace('_', '-')

/**
 * Подбирает голос для языка: сначала полное совпадение кода ('pt-BR'), затем тот же язык
 * другого региона ('pt-PT'). Порядок в списке голосов не важен: точное совпадение всегда важнее.
 * @param {SpeechSynthesisVoice[]} voices - Доступные голоса.
 * @param {string} lang - Код языка, например `pt-BR`.
 * @returns {SpeechSynthesisVoice|undefined} Подходящий голос или `undefined`, если нет голоса на этом языке.
 */
const findVoice = (voices, lang) => {
  const wanted = normalizeLang(lang)
  /**
   * Язык без региона.
   * @param {string} code - Код языка, например `pt-BR`.
   * @returns {string} Основа кода, например `pt`.
   */
  const baseOf = code => normalizeLang(code).split('-')[0]

  return voices.find(voice => normalizeLang(voice.lang) === wanted)
    || voices.find(voice => baseOf(voice.lang) === baseOf(wanted))
}

export { findVoice, synth }

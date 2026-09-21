/**
 * Связывает значения настроек с селекторами кнопок и ключами озвучки.
 * @type {Record<string, Record<string, [string, string]>>}
 */
const DATA_CONTROLS = {
  theme: {
    white: ['.bvi-theme-white', 'siteColorBlackOnWhite'],
    black: ['.bvi-theme-black', 'siteColorWhiteOnBlack'],
    blue: ['.bvi-theme-blue', 'siteColorDarkBlueOnBlue'],
    brown: ['.bvi-theme-brown', 'siteColorBeigeBrown'],
    green: ['.bvi-theme-green', 'siteColorGreenOnDarkBrown'],
  },
  images: {
    true: ['.bvi-images-on', 'imagesOn'],
    false: ['.bvi-images-off', 'imagesOff'],
    grayscale: ['.bvi-images-grayscale', 'imagesGrayscale'],
  },
  speech: {
    true: ['.bvi-speech-on', 'speechOn'],
    false: ['.bvi-speech-off', 'speechOff'],
  },
  lineHeight: {
    normal: ['.bvi-line-height-normal', 'lineHeightNormal'],
    average: ['.bvi-line-height-average', 'lineHeightAverage'],
    big: ['.bvi-line-height-big', 'lineHeightBig'],
  },
  letterSpacing: {
    normal: ['.bvi-letter-spacing-normal', 'letterSpacingNormal'],
    average: ['.bvi-letter-spacing-average', 'letterSpacingAverage'],
    big: ['.bvi-letter-spacing-big', 'letterSpacingBig'],
  },
  fontFamily: {
    arial: ['.bvi-font-family-arial', 'fontArial'],
    times: ['.bvi-font-family-times', 'fontTimes'],
  },
  builtElements: {
    true: ['.bvi-built-elements-on', 'builtElementsOn'],
    false: ['.bvi-built-elements-off', 'builtElementsOff'],
  },
}

export { DATA_CONTROLS }

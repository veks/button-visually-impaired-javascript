/**
 * ESM-точка входа библиотеки: экспорты предназначены пользователям пакета (`import Bvi from 'bvi'`),
 * внутри проекта их никто не импортирует.
 * @module bvi/esm
 * @noinspection JSUnusedGlobalSymbols
 */
import Bvi from './bvi'
import Speech from './speech'

export {
  Bvi,
  Speech,
}
export default Bvi

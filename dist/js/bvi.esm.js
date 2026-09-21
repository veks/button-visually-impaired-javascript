/*!
  * Button visually impaired - v2.0.0 https://bvi.isvek.ru
  * Copyright 2014-2026 Oleg Korotenko <bvi@isvek.ru>.
  * Licensed MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE.md)
  */
var text$a = {
	fontSize: "Schriftgröße",
	siteColors: "Farben der Website",
	images: "Bilder",
	imageCaption: "Bild",
	imageWithoutDescription: "Bild ohne Beschreibung",
	speech: "Sprachausgabe",
	speechVoice: "Stimme",
	speechVoiceDefault: "Automatisch",
	settings: "Einstellungen",
	regularVersionOfTheSite: "Normale Version der Website",
	letterSpacing: "Buchstabenabstand",
	normal: "Normal",
	average: "Mittel",
	big: "Groß",
	lineHeight: "Zeilenabstand",
	font: "Schriftart",
	arial: "Serifenlos - Arial",
	times: "Mit Serifen - Times New Roman",
	builtElements: "Eingebettete Elemente (Videos, Karten usw.)",
	on: "Aktivieren",
	off: "Deaktivieren",
	reset: "Einstellungen zurücksetzen",
	panelLabel: "Version der Website für Sehbehinderte",
	menu: "Menü",
	fontSizeMinus: "Schriftgröße verringern",
	fontSizePlus: "Schriftgröße erhöhen",
	themeWhite: "Schwarz auf Weiß",
	themeBlack: "Weiß auf Schwarz",
	themeBlue: "Dunkelblau auf Hellblau",
	themeBrown: "Braun auf Beige",
	themeGreen: "Grün auf Dunkelbraun",
	imagesOn: "Bilder anzeigen",
	imagesOff: "Bilder ausblenden",
	imagesGrayscale: "Bilder in Graustufen",
	speechOff: "Sprachausgabe ausschalten",
	speechOn: "Sprachausgabe einschalten",
	openSettings: "Einstellungen öffnen",
	closeSettings: "Einstellungen schließen",
	close: "Schließen",
	hidePanel: "Bedienfeld ausblenden",
	showPanel: "Bedienfeld einblenden",
	speechPlay: "Wiedergabe",
	speechPause: "Pause",
	speechResume: "Fortsetzen",
	speechStop: "Stopp",
	openInNewTab: "öffnet in einem neuen Tab"
};
var voice$a = {
	fontSizePlus: "Schriftgröße erhöht",
	fontSizeMinus: "Schriftgröße verringert",
	siteColorBlackOnWhite: "Farben der Website: Schwarz auf Weiß",
	siteColorWhiteOnBlack: "Farben der Website: Weiß auf Schwarz",
	siteColorDarkBlueOnBlue: "Farben der Website: Dunkelblau auf Hellblau",
	siteColorBeigeBrown: "Farben der Website: Braun auf Beige",
	siteColorGreenOnDarkBrown: "Farben der Website: Grün auf Dunkelbraun",
	imagesOn: "Bilder aktiviert",
	imagesOff: "Bilder deaktiviert",
	imagesGrayscale: "Bilder in Graustufen",
	speechOn: "Sprachausgabe aktiviert",
	speechOff: "Sprachausgabe deaktiviert",
	speechVoiceChanged: "Stimme geändert",
	lineHeightNormal: "Zeilenabstand normal",
	lineHeightAverage: "Zeilenabstand mittel",
	lineHeightBig: "Zeilenabstand groß",
	letterSpacingNormal: "Buchstabenabstand normal",
	letterSpacingAverage: "Buchstabenabstand mittel",
	letterSpacingBig: "Buchstabenabstand groß",
	fontArial: "Serifenlos - Arial",
	fontTimes: "Mit Serifen - Times New Roman",
	builtElementsOn: "Eingebettete Elemente aktiviert",
	builtElementsOff: "Eingebettete Elemente deaktiviert",
	resetSettings: "Die Standardeinstellungen wurden wiederhergestellt",
	panelShow: "Bedienfeld eingeblendet",
	panelHide: "Bedienfeld ausgeblendet",
	panelOn: "Version der Website für Sehbehinderte",
	panelOff: "Normale Version der Website"
};
var deDE = {
	text: text$a,
	voice: voice$a
};

var text$9 = {
	fontSize: "Font size",
	siteColors: "Site colors",
	images: "Images",
	imageCaption: "Image",
	imageWithoutDescription: "Image without description",
	speech: "Speech synthesis",
	speechVoice: "Voice",
	speechVoiceDefault: "Automatic",
	settings: "Settings",
	regularVersionOfTheSite: "Regular version of the site",
	letterSpacing: "Letter spacing",
	normal: "Normal",
	average: "Medium",
	big: "Large",
	lineHeight: "Line spacing",
	font: "Font",
	arial: "Sans Serif - Arial",
	times: "Serif - Times New Roman",
	builtElements: "Embedded elements (videos, maps, etc.)",
	on: "Enable",
	off: "Disable",
	reset: "Reset settings",
	panelLabel: "Version of the site for visually impaired",
	menu: "Menu",
	fontSizeMinus: "Decrease font size",
	fontSizePlus: "Increase font size",
	themeWhite: "Black on white",
	themeBlack: "White on black",
	themeBlue: "Dark blue on cyan",
	themeBrown: "Brown on beige",
	themeGreen: "Green on dark brown",
	imagesOn: "Show images",
	imagesOff: "Hide images",
	imagesGrayscale: "Gray scale images",
	speechOff: "Turn off speech synthesis",
	speechOn: "Turn on speech synthesis",
	openSettings: "Open settings",
	closeSettings: "Close settings",
	close: "Close",
	hidePanel: "Hide panel",
	showPanel: "Show panel",
	speechPlay: "Play",
	speechPause: "Pause",
	speechResume: "Resume",
	speechStop: "Stop",
	openInNewTab: "opens in a new tab"
};
var voice$9 = {
	fontSizePlus: "Font size increased",
	fontSizeMinus: "Font size reduced",
	siteColorBlackOnWhite: "Site color black on white",
	siteColorWhiteOnBlack: "Site color white on black",
	siteColorDarkBlueOnBlue: "Site color dark blue on cyan",
	siteColorBeigeBrown: "Site color brown on beige",
	siteColorGreenOnDarkBrown: "Site color green on dark brown",
	imagesOn: "Images enabled",
	imagesOff: "Images disabled",
	imagesGrayscale: "Images in grayscale",
	speechOn: "Speech synthesis enabled",
	speechOff: "Speech synthesis disabled",
	speechVoiceChanged: "Voice changed",
	lineHeightNormal: "Line spacing normal",
	lineHeightAverage: "Line spacing medium",
	lineHeightBig: "Line spacing large",
	letterSpacingNormal: "Letter spacing normal",
	letterSpacingAverage: "Letter spacing medium",
	letterSpacingBig: "Letter spacing large",
	fontArial: "Sans Serif - Arial",
	fontTimes: "Serif - Times New Roman",
	builtElementsOn: "Embedded elements enabled",
	builtElementsOff: "Embedded elements disabled",
	resetSettings: "Default settings have been set",
	panelShow: "Panel show",
	panelHide: "Panel hide",
	panelOn: "Site version for visually impaired",
	panelOff: "Regular version of the site"
};
var enUS = {
	text: text$9,
	voice: voice$9
};

var text$8 = {
	fontSize: "Tamaño de fuente",
	siteColors: "Colores del sitio",
	images: "Imágenes",
	imageCaption: "Imagen",
	imageWithoutDescription: "Imagen sin descripción",
	speech: "Síntesis de voz",
	speechVoice: "Voz",
	speechVoiceDefault: "Automática",
	settings: "Ajustes",
	regularVersionOfTheSite: "Versión normal del sitio",
	letterSpacing: "Espaciado entre letras",
	normal: "Normal",
	average: "Medio",
	big: "Grande",
	lineHeight: "Interlineado",
	font: "Fuente",
	arial: "Sin serifa - Arial",
	times: "Con serifa - Times New Roman",
	builtElements: "Elementos incrustados (vídeos, mapas, etc.)",
	on: "Activar",
	off: "Desactivar",
	reset: "Restablecer ajustes",
	panelLabel: "Versión del sitio para personas con discapacidad visual",
	menu: "Menú",
	fontSizeMinus: "Reducir el tamaño de fuente",
	fontSizePlus: "Aumentar el tamaño de fuente",
	themeWhite: "Negro sobre blanco",
	themeBlack: "Blanco sobre negro",
	themeBlue: "Azul oscuro sobre celeste",
	themeBrown: "Marrón sobre beige",
	themeGreen: "Verde sobre marrón oscuro",
	imagesOn: "Mostrar imágenes",
	imagesOff: "Ocultar imágenes",
	imagesGrayscale: "Imágenes en escala de grises",
	speechOff: "Desactivar la síntesis de voz",
	speechOn: "Activar la síntesis de voz",
	openSettings: "Abrir ajustes",
	closeSettings: "Cerrar ajustes",
	close: "Cerrar",
	hidePanel: "Ocultar panel",
	showPanel: "Mostrar panel",
	speechPlay: "Reproducir",
	speechPause: "Pausa",
	speechResume: "Continuar",
	speechStop: "Detener",
	openInNewTab: "se abre en una pestaña nueva"
};
var voice$8 = {
	fontSizePlus: "Tamaño de fuente aumentado",
	fontSizeMinus: "Tamaño de fuente reducido",
	siteColorBlackOnWhite: "Colores del sitio: negro sobre blanco",
	siteColorWhiteOnBlack: "Colores del sitio: blanco sobre negro",
	siteColorDarkBlueOnBlue: "Colores del sitio: azul oscuro sobre celeste",
	siteColorBeigeBrown: "Colores del sitio: marrón sobre beige",
	siteColorGreenOnDarkBrown: "Colores del sitio: verde sobre marrón oscuro",
	imagesOn: "Imágenes activadas",
	imagesOff: "Imágenes desactivadas",
	imagesGrayscale: "Imágenes en escala de grises",
	speechOn: "Síntesis de voz activada",
	speechOff: "Síntesis de voz desactivada",
	speechVoiceChanged: "Voz cambiada",
	lineHeightNormal: "Interlineado normal",
	lineHeightAverage: "Interlineado medio",
	lineHeightBig: "Interlineado grande",
	letterSpacingNormal: "Espaciado entre letras normal",
	letterSpacingAverage: "Espaciado entre letras medio",
	letterSpacingBig: "Espaciado entre letras grande",
	fontArial: "Sin serifa - Arial",
	fontTimes: "Con serifa - Times New Roman",
	builtElementsOn: "Elementos incrustados activados",
	builtElementsOff: "Elementos incrustados desactivados",
	resetSettings: "Se han restablecido los ajustes predeterminados",
	panelShow: "Panel mostrado",
	panelHide: "Panel oculto",
	panelOn: "Versión del sitio para personas con discapacidad visual",
	panelOff: "Versión normal del sitio"
};
var esES = {
	text: text$8,
	voice: voice$8
};

var text$7 = {
	fontSize: "Taille de la police",
	siteColors: "Couleurs du site",
	images: "Images",
	imageCaption: "Image",
	imageWithoutDescription: "Image sans description",
	speech: "Synthèse vocale",
	speechVoice: "Voix",
	speechVoiceDefault: "Automatique",
	settings: "Paramètres",
	regularVersionOfTheSite: "Version normale du site",
	letterSpacing: "Espacement des lettres",
	normal: "Normal",
	average: "Moyen",
	big: "Grand",
	lineHeight: "Interligne",
	font: "Police",
	arial: "Sans empattement - Arial",
	times: "Avec empattement - Times New Roman",
	builtElements: "Éléments intégrés (vidéos, cartes, etc.)",
	on: "Activer",
	off: "Désactiver",
	reset: "Réinitialiser les paramètres",
	panelLabel: "Version du site pour les malvoyants",
	menu: "Menu",
	fontSizeMinus: "Réduire la taille de la police",
	fontSizePlus: "Augmenter la taille de la police",
	themeWhite: "Noir sur blanc",
	themeBlack: "Blanc sur noir",
	themeBlue: "Bleu foncé sur bleu clair",
	themeBrown: "Marron sur beige",
	themeGreen: "Vert sur marron foncé",
	imagesOn: "Afficher les images",
	imagesOff: "Masquer les images",
	imagesGrayscale: "Images en niveaux de gris",
	speechOff: "Désactiver la synthèse vocale",
	speechOn: "Activer la synthèse vocale",
	openSettings: "Ouvrir les paramètres",
	closeSettings: "Fermer les paramètres",
	close: "Fermer",
	hidePanel: "Masquer le panneau",
	showPanel: "Afficher le panneau",
	speechPlay: "Lire",
	speechPause: "Pause",
	speechResume: "Reprendre",
	speechStop: "Arrêter",
	openInNewTab: "s'ouvre dans un nouvel onglet"
};
var voice$7 = {
	fontSizePlus: "Taille de la police augmentée",
	fontSizeMinus: "Taille de la police réduite",
	siteColorBlackOnWhite: "Couleurs du site : noir sur blanc",
	siteColorWhiteOnBlack: "Couleurs du site : blanc sur noir",
	siteColorDarkBlueOnBlue: "Couleurs du site : bleu foncé sur bleu clair",
	siteColorBeigeBrown: "Couleurs du site : marron sur beige",
	siteColorGreenOnDarkBrown: "Couleurs du site : vert sur marron foncé",
	imagesOn: "Images activées",
	imagesOff: "Images désactivées",
	imagesGrayscale: "Images en niveaux de gris",
	speechOn: "Synthèse vocale activée",
	speechOff: "Synthèse vocale désactivée",
	speechVoiceChanged: "Voix modifiée",
	lineHeightNormal: "Interligne normal",
	lineHeightAverage: "Interligne moyen",
	lineHeightBig: "Interligne grand",
	letterSpacingNormal: "Espacement des lettres normal",
	letterSpacingAverage: "Espacement des lettres moyen",
	letterSpacingBig: "Espacement des lettres grand",
	fontArial: "Sans empattement - Arial",
	fontTimes: "Avec empattement - Times New Roman",
	builtElementsOn: "Éléments intégrés activés",
	builtElementsOff: "Éléments intégrés désactivés",
	resetSettings: "Les paramètres par défaut ont été rétablis",
	panelShow: "Panneau affiché",
	panelHide: "Panneau masqué",
	panelOn: "Version du site pour les malvoyants",
	panelOff: "Version normale du site"
};
var frFR = {
	text: text$7,
	voice: voice$7
};

var text$6 = {
	fontSize: "Dimensione del carattere",
	siteColors: "Colori del sito",
	images: "Immagini",
	imageCaption: "Immagine",
	imageWithoutDescription: "Immagine senza descrizione",
	speech: "Sintesi vocale",
	speechVoice: "Voce",
	speechVoiceDefault: "Automatica",
	settings: "Impostazioni",
	regularVersionOfTheSite: "Versione normale del sito",
	letterSpacing: "Spaziatura tra le lettere",
	normal: "Normale",
	average: "Media",
	big: "Grande",
	lineHeight: "Interlinea",
	font: "Carattere",
	arial: "Senza grazie - Arial",
	times: "Con grazie - Times New Roman",
	builtElements: "Elementi incorporati (video, mappe, ecc.)",
	on: "Attiva",
	off: "Disattiva",
	reset: "Ripristina impostazioni",
	panelLabel: "Versione del sito per ipovedenti",
	menu: "Menu",
	fontSizeMinus: "Riduci la dimensione del carattere",
	fontSizePlus: "Aumenta la dimensione del carattere",
	themeWhite: "Nero su bianco",
	themeBlack: "Bianco su nero",
	themeBlue: "Blu scuro su azzurro",
	themeBrown: "Marrone su beige",
	themeGreen: "Verde su marrone scuro",
	imagesOn: "Mostra immagini",
	imagesOff: "Nascondi immagini",
	imagesGrayscale: "Immagini in scala di grigi",
	speechOff: "Disattiva la sintesi vocale",
	speechOn: "Attiva la sintesi vocale",
	openSettings: "Apri impostazioni",
	closeSettings: "Chiudi impostazioni",
	close: "Chiudi",
	hidePanel: "Nascondi pannello",
	showPanel: "Mostra pannello",
	speechPlay: "Riproduci",
	speechPause: "Pausa",
	speechResume: "Riprendi",
	speechStop: "Ferma",
	openInNewTab: "si apre in una nuova scheda"
};
var voice$6 = {
	fontSizePlus: "Dimensione del carattere aumentata",
	fontSizeMinus: "Dimensione del carattere ridotta",
	siteColorBlackOnWhite: "Colori del sito: nero su bianco",
	siteColorWhiteOnBlack: "Colori del sito: bianco su nero",
	siteColorDarkBlueOnBlue: "Colori del sito: blu scuro su azzurro",
	siteColorBeigeBrown: "Colori del sito: marrone su beige",
	siteColorGreenOnDarkBrown: "Colori del sito: verde su marrone scuro",
	imagesOn: "Immagini attivate",
	imagesOff: "Immagini disattivate",
	imagesGrayscale: "Immagini in scala di grigi",
	speechOn: "Sintesi vocale attivata",
	speechOff: "Sintesi vocale disattivata",
	speechVoiceChanged: "Voce cambiata",
	lineHeightNormal: "Interlinea normale",
	lineHeightAverage: "Interlinea media",
	lineHeightBig: "Interlinea grande",
	letterSpacingNormal: "Spaziatura tra le lettere normale",
	letterSpacingAverage: "Spaziatura tra le lettere media",
	letterSpacingBig: "Spaziatura tra le lettere grande",
	fontArial: "Senza grazie - Arial",
	fontTimes: "Con grazie - Times New Roman",
	builtElementsOn: "Elementi incorporati attivati",
	builtElementsOff: "Elementi incorporati disattivati",
	resetSettings: "Sono state ripristinate le impostazioni predefinite",
	panelShow: "Pannello mostrato",
	panelHide: "Pannello nascosto",
	panelOn: "Versione del sito per ipovedenti",
	panelOff: "Versione normale del sito"
};
var itIT = {
	text: text$6,
	voice: voice$6
};

var text$5 = {
	fontSize: "文字サイズ",
	siteColors: "サイトの配色",
	images: "画像",
	imageCaption: "画像",
	imageWithoutDescription: "説明のない画像",
	speech: "音声合成",
	speechVoice: "音声",
	speechVoiceDefault: "自動",
	settings: "設定",
	regularVersionOfTheSite: "通常版サイト",
	letterSpacing: "文字間隔",
	normal: "標準",
	average: "中",
	big: "大",
	lineHeight: "行間",
	font: "フォント",
	arial: "ゴシック体 - Arial",
	times: "明朝体 - Times New Roman",
	builtElements: "埋め込み要素（動画、地図など）",
	on: "オン",
	off: "オフ",
	reset: "設定をリセット",
	panelLabel: "視覚障がい者向けサイト版",
	menu: "メニュー",
	fontSizeMinus: "文字サイズを小さくする",
	fontSizePlus: "文字サイズを大きくする",
	themeWhite: "白地に黒",
	themeBlack: "黒地に白",
	themeBlue: "水色地に濃い青",
	themeBrown: "ベージュ地に茶色",
	themeGreen: "濃い茶色地に緑",
	imagesOn: "画像を表示",
	imagesOff: "画像を非表示",
	imagesGrayscale: "画像をグレースケールにする",
	speechOff: "音声合成をオフにする",
	speechOn: "音声合成をオンにする",
	openSettings: "設定を開く",
	closeSettings: "設定を閉じる",
	close: "閉じる",
	hidePanel: "パネルを隠す",
	showPanel: "パネルを表示",
	speechPlay: "再生",
	speechPause: "一時停止",
	speechResume: "再開",
	speechStop: "停止",
	openInNewTab: "新しいタブで開きます"
};
var voice$5 = {
	fontSizePlus: "文字サイズを大きくしました",
	fontSizeMinus: "文字サイズを小さくしました",
	siteColorBlackOnWhite: "サイトの配色：白地に黒",
	siteColorWhiteOnBlack: "サイトの配色：黒地に白",
	siteColorDarkBlueOnBlue: "サイトの配色：水色地に濃い青",
	siteColorBeigeBrown: "サイトの配色：ベージュ地に茶色",
	siteColorGreenOnDarkBrown: "サイトの配色：濃い茶色地に緑",
	imagesOn: "画像をオンにしました",
	imagesOff: "画像をオフにしました",
	imagesGrayscale: "画像をグレースケールにしました",
	speechOn: "音声合成をオンにしました",
	speechOff: "音声合成をオフにしました",
	speechVoiceChanged: "音声を変更しました",
	lineHeightNormal: "行間は標準です",
	lineHeightAverage: "行間は中です",
	lineHeightBig: "行間は大です",
	letterSpacingNormal: "文字間隔は標準です",
	letterSpacingAverage: "文字間隔は中です",
	letterSpacingBig: "文字間隔は大です",
	fontArial: "ゴシック体 - Arial",
	fontTimes: "明朝体 - Times New Roman",
	builtElementsOn: "埋め込み要素をオンにしました",
	builtElementsOff: "埋め込み要素をオフにしました",
	resetSettings: "初期設定に戻しました",
	panelShow: "パネルを表示しました",
	panelHide: "パネルを隠しました",
	panelOn: "視覚障がい者向けサイト版",
	panelOff: "通常版サイト"
};
var jaJP = {
	text: text$5,
	voice: voice$5
};

var text$4 = {
	fontSize: "Rozmiar czcionki",
	siteColors: "Kolory strony",
	images: "Obrazy",
	imageCaption: "Obraz",
	imageWithoutDescription: "Obraz bez opisu",
	speech: "Synteza mowy",
	speechVoice: "Głos",
	speechVoiceDefault: "Automatycznie",
	settings: "Ustawienia",
	regularVersionOfTheSite: "Zwykła wersja strony",
	letterSpacing: "Odstępy między literami",
	normal: "Standardowe",
	average: "Średnie",
	big: "Duże",
	lineHeight: "Odstępy między wierszami",
	font: "Czcionka",
	arial: "Bezszeryfowa - Arial",
	times: "Szeryfowa - Times New Roman",
	builtElements: "Elementy osadzone (filmy, mapy itp.)",
	on: "Włącz",
	off: "Wyłącz",
	reset: "Przywróć ustawienia",
	panelLabel: "Wersja strony dla osób słabowidzących",
	menu: "Menu",
	fontSizeMinus: "Zmniejsz rozmiar czcionki",
	fontSizePlus: "Zwiększ rozmiar czcionki",
	themeWhite: "Czarny na białym",
	themeBlack: "Biały na czarnym",
	themeBlue: "Ciemnoniebieski na błękitnym",
	themeBrown: "Brązowy na beżowym",
	themeGreen: "Zielony na ciemnobrązowym",
	imagesOn: "Pokaż obrazy",
	imagesOff: "Ukryj obrazy",
	imagesGrayscale: "Obrazy w skali szarości",
	speechOff: "Wyłącz syntezę mowy",
	speechOn: "Włącz syntezę mowy",
	openSettings: "Otwórz ustawienia",
	closeSettings: "Zamknij ustawienia",
	close: "Zamknij",
	hidePanel: "Ukryj panel",
	showPanel: "Pokaż panel",
	speechPlay: "Odtwórz",
	speechPause: "Pauza",
	speechResume: "Wznów",
	speechStop: "Zatrzymaj",
	openInNewTab: "otwiera się w nowej karcie"
};
var voice$4 = {
	fontSizePlus: "Zwiększono rozmiar czcionki",
	fontSizeMinus: "Zmniejszono rozmiar czcionki",
	siteColorBlackOnWhite: "Kolory strony: czarny na białym",
	siteColorWhiteOnBlack: "Kolory strony: biały na czarnym",
	siteColorDarkBlueOnBlue: "Kolory strony: ciemnoniebieski na błękitnym",
	siteColorBeigeBrown: "Kolory strony: brązowy na beżowym",
	siteColorGreenOnDarkBrown: "Kolory strony: zielony na ciemnobrązowym",
	imagesOn: "Obrazy włączone",
	imagesOff: "Obrazy wyłączone",
	imagesGrayscale: "Obrazy w skali szarości",
	speechOn: "Synteza mowy włączona",
	speechOff: "Synteza mowy wyłączona",
	speechVoiceChanged: "Zmieniono głos",
	lineHeightNormal: "Odstępy między wierszami standardowe",
	lineHeightAverage: "Odstępy między wierszami średnie",
	lineHeightBig: "Odstępy między wierszami duże",
	letterSpacingNormal: "Odstępy między literami standardowe",
	letterSpacingAverage: "Odstępy między literami średnie",
	letterSpacingBig: "Odstępy między literami duże",
	fontArial: "Bezszeryfowa - Arial",
	fontTimes: "Szeryfowa - Times New Roman",
	builtElementsOn: "Elementy osadzone włączone",
	builtElementsOff: "Elementy osadzone wyłączone",
	resetSettings: "Przywrócono ustawienia domyślne",
	panelShow: "Panel pokazany",
	panelHide: "Panel ukryty",
	panelOn: "Wersja strony dla osób słabowidzących",
	panelOff: "Zwykła wersja strony"
};
var plPL = {
	text: text$4,
	voice: voice$4
};

var text$3 = {
	fontSize: "Tamanho da fonte",
	siteColors: "Cores do site",
	images: "Imagens",
	imageCaption: "Imagem",
	imageWithoutDescription: "Imagem sem descrição",
	speech: "Síntese de fala",
	speechVoice: "Voz",
	speechVoiceDefault: "Automática",
	settings: "Configurações",
	regularVersionOfTheSite: "Versão normal do site",
	letterSpacing: "Espaçamento entre letras",
	normal: "Normal",
	average: "Médio",
	big: "Grande",
	lineHeight: "Espaçamento entre linhas",
	font: "Fonte",
	arial: "Sem serifa - Arial",
	times: "Com serifa - Times New Roman",
	builtElements: "Elementos incorporados (vídeos, mapas etc.)",
	on: "Ativar",
	off: "Desativar",
	reset: "Redefinir configurações",
	panelLabel: "Versão do site para pessoas com deficiência visual",
	menu: "Menu",
	fontSizeMinus: "Diminuir o tamanho da fonte",
	fontSizePlus: "Aumentar o tamanho da fonte",
	themeWhite: "Preto sobre branco",
	themeBlack: "Branco sobre preto",
	themeBlue: "Azul-escuro sobre azul-claro",
	themeBrown: "Marrom sobre bege",
	themeGreen: "Verde sobre marrom-escuro",
	imagesOn: "Mostrar imagens",
	imagesOff: "Ocultar imagens",
	imagesGrayscale: "Imagens em tons de cinza",
	speechOff: "Desativar a síntese de fala",
	speechOn: "Ativar a síntese de fala",
	openSettings: "Abrir configurações",
	closeSettings: "Fechar configurações",
	close: "Fechar",
	hidePanel: "Ocultar painel",
	showPanel: "Mostrar painel",
	speechPlay: "Reproduzir",
	speechPause: "Pausar",
	speechResume: "Continuar",
	speechStop: "Parar",
	openInNewTab: "abre em uma nova aba"
};
var voice$3 = {
	fontSizePlus: "Tamanho da fonte aumentado",
	fontSizeMinus: "Tamanho da fonte reduzido",
	siteColorBlackOnWhite: "Cores do site: preto sobre branco",
	siteColorWhiteOnBlack: "Cores do site: branco sobre preto",
	siteColorDarkBlueOnBlue: "Cores do site: azul-escuro sobre azul-claro",
	siteColorBeigeBrown: "Cores do site: marrom sobre bege",
	siteColorGreenOnDarkBrown: "Cores do site: verde sobre marrom-escuro",
	imagesOn: "Imagens ativadas",
	imagesOff: "Imagens desativadas",
	imagesGrayscale: "Imagens em tons de cinza",
	speechOn: "Síntese de fala ativada",
	speechOff: "Síntese de fala desativada",
	speechVoiceChanged: "Voz alterada",
	lineHeightNormal: "Espaçamento entre linhas normal",
	lineHeightAverage: "Espaçamento entre linhas médio",
	lineHeightBig: "Espaçamento entre linhas grande",
	letterSpacingNormal: "Espaçamento entre letras normal",
	letterSpacingAverage: "Espaçamento entre letras médio",
	letterSpacingBig: "Espaçamento entre letras grande",
	fontArial: "Sem serifa - Arial",
	fontTimes: "Com serifa - Times New Roman",
	builtElementsOn: "Elementos incorporados ativados",
	builtElementsOff: "Elementos incorporados desativados",
	resetSettings: "As configurações padrão foram restauradas",
	panelShow: "Painel exibido",
	panelHide: "Painel oculto",
	panelOn: "Versão do site para pessoas com deficiência visual",
	panelOff: "Versão normal do site"
};
var ptBR = {
	text: text$3,
	voice: voice$3
};

var text$2 = {
	fontSize: "Размер шрифта",
	siteColors: "Цвета сайта",
	images: "Изображения",
	imageCaption: "Изображение",
	imageWithoutDescription: "Изображение без описания",
	speech: "Синтез речи",
	speechVoice: "Голос",
	speechVoiceDefault: "Автоматически",
	settings: "Настройки",
	regularVersionOfTheSite: "Обычная версия сайта",
	letterSpacing: "Межбуквенное расстояние",
	normal: "Стандартный",
	average: "Средний",
	big: "Большой",
	lineHeight: "Межстрочный интервал",
	font: "Шрифт",
	arial: "Без засечек",
	times: "С засечками",
	builtElements: "Встроенные элементы (Видео, карты и тд.)",
	on: "Включить",
	off: "Выключить",
	reset: "Сбросить настройки",
	panelLabel: "Версия сайта для слабовидящих",
	menu: "Меню",
	fontSizeMinus: "Уменьшить размер шрифта",
	fontSizePlus: "Увеличить размер шрифта",
	themeWhite: "Чёрным по белому",
	themeBlack: "Белым по чёрному",
	themeBlue: "Тёмно-синим по голубому",
	themeBrown: "Коричневым по бежевому",
	themeGreen: "Зелёным по тёмно-коричневому",
	imagesOn: "Показывать изображения",
	imagesOff: "Скрыть изображения",
	imagesGrayscale: "Чёрно-белые изображения",
	speechOff: "Выключить синтез речи",
	speechOn: "Включить синтез речи",
	openSettings: "Открыть настройки",
	closeSettings: "Закрыть настройки",
	close: "Закрыть",
	hidePanel: "Скрыть панель",
	showPanel: "Показать панель",
	speechPlay: "Воспроизвести",
	speechPause: "Пауза",
	speechResume: "Продолжить",
	speechStop: "Стоп",
	openInNewTab: "откроется в новой вкладке"
};
var voice$2 = {
	fontSizePlus: "Размер шрифта увели́чен",
	fontSizeMinus: "Размер шрифта уме́ньшен",
	siteColorBlackOnWhite: "Цвет сайта черным по белому",
	siteColorWhiteOnBlack: "Цвет сайта белым по черному",
	siteColorDarkBlueOnBlue: "Цвет сайта тёмно-синим по голубому",
	siteColorBeigeBrown: "Цвет сайта кори́чневым по бе́жевому",
	siteColorGreenOnDarkBrown: "Цвет сайта зеленым по тёмно-коричневому",
	imagesOn: "Изображения включены",
	imagesOff: "Изображения выключены",
	imagesGrayscale: "Изображения чёрно-белые",
	speechOn: "Синтез речи включён",
	speechOff: "Синтез речи вы́ключен",
	speechVoiceChanged: "Голос изменён",
	lineHeightNormal: "Межстрочный интервал стандартный",
	lineHeightAverage: "Межстрочный интервал средний",
	lineHeightBig: "Межстрочный интервал большой",
	letterSpacingNormal: "Интервал между буквами стандартный",
	letterSpacingAverage: "Интервал между буквами средний",
	letterSpacingBig: "Интервал между буквами большой",
	fontArial: "Шрифт без засечек",
	fontTimes: "Шрифт с засечками",
	builtElementsOn: "Встроенные элементы включены",
	builtElementsOff: "Встроенные элементы выключены",
	resetSettings: "Установлены настройки по умолча́нию",
	panelShow: "Панель открыта",
	panelHide: "Панель скрыта",
	panelOn: "Версия сайта для слабови́дящих",
	panelOff: "Обычная версия сайта"
};
var ruRU = {
	text: text$2,
	voice: voice$2
};

var text$1 = {
	fontSize: "Yazı tipi boyutu",
	siteColors: "Site renkleri",
	images: "Görseller",
	imageCaption: "Görsel",
	imageWithoutDescription: "Açıklamasız görsel",
	speech: "Konuşma sentezi",
	speechVoice: "Ses",
	speechVoiceDefault: "Otomatik",
	settings: "Ayarlar",
	regularVersionOfTheSite: "Sitenin normal sürümü",
	letterSpacing: "Harf aralığı",
	normal: "Normal",
	average: "Orta",
	big: "Büyük",
	lineHeight: "Satır aralığı",
	font: "Yazı tipi",
	arial: "Serifsiz - Arial",
	times: "Serifli - Times New Roman",
	builtElements: "Gömülü öğeler (videolar, haritalar vb.)",
	on: "Aç",
	off: "Kapat",
	reset: "Ayarları sıfırla",
	panelLabel: "Sitenin görme engelliler için sürümü",
	menu: "Menü",
	fontSizeMinus: "Yazı tipi boyutunu küçült",
	fontSizePlus: "Yazı tipi boyutunu büyüt",
	themeWhite: "Beyaz üzerine siyah",
	themeBlack: "Siyah üzerine beyaz",
	themeBlue: "Açık mavi üzerine koyu mavi",
	themeBrown: "Bej üzerine kahverengi",
	themeGreen: "Koyu kahverengi üzerine yeşil",
	imagesOn: "Görselleri göster",
	imagesOff: "Görselleri gizle",
	imagesGrayscale: "Gri tonlamalı görseller",
	speechOff: "Konuşma sentezini kapat",
	speechOn: "Konuşma sentezini aç",
	openSettings: "Ayarları aç",
	closeSettings: "Ayarları kapat",
	close: "Kapat",
	hidePanel: "Paneli gizle",
	showPanel: "Paneli göster",
	speechPlay: "Oynat",
	speechPause: "Duraklat",
	speechResume: "Devam et",
	speechStop: "Durdur",
	openInNewTab: "yeni sekmede açılır"
};
var voice$1 = {
	fontSizePlus: "Yazı tipi boyutu büyütüldü",
	fontSizeMinus: "Yazı tipi boyutu küçültüldü",
	siteColorBlackOnWhite: "Site renkleri: beyaz üzerine siyah",
	siteColorWhiteOnBlack: "Site renkleri: siyah üzerine beyaz",
	siteColorDarkBlueOnBlue: "Site renkleri: açık mavi üzerine koyu mavi",
	siteColorBeigeBrown: "Site renkleri: bej üzerine kahverengi",
	siteColorGreenOnDarkBrown: "Site renkleri: koyu kahverengi üzerine yeşil",
	imagesOn: "Görseller açık",
	imagesOff: "Görseller kapalı",
	imagesGrayscale: "Görseller gri tonlamalı",
	speechOn: "Konuşma sentezi açık",
	speechOff: "Konuşma sentezi kapalı",
	speechVoiceChanged: "Ses değiştirildi",
	lineHeightNormal: "Satır aralığı normal",
	lineHeightAverage: "Satır aralığı orta",
	lineHeightBig: "Satır aralığı büyük",
	letterSpacingNormal: "Harf aralığı normal",
	letterSpacingAverage: "Harf aralığı orta",
	letterSpacingBig: "Harf aralığı büyük",
	fontArial: "Serifsiz - Arial",
	fontTimes: "Serifli - Times New Roman",
	builtElementsOn: "Gömülü öğeler açık",
	builtElementsOff: "Gömülü öğeler kapalı",
	resetSettings: "Varsayılan ayarlar uygulandı",
	panelShow: "Panel gösterildi",
	panelHide: "Panel gizlendi",
	panelOn: "Sitenin görme engelliler için sürümü",
	panelOff: "Sitenin normal sürümü"
};
var trTR = {
	text: text$1,
	voice: voice$1
};

var text = {
	fontSize: "字体大小",
	siteColors: "网站配色",
	images: "图片",
	imageCaption: "图片",
	imageWithoutDescription: "无描述的图片",
	speech: "语音合成",
	speechVoice: "语音",
	speechVoiceDefault: "自动",
	settings: "设置",
	regularVersionOfTheSite: "网站普通版",
	letterSpacing: "字间距",
	normal: "标准",
	average: "中等",
	big: "较大",
	lineHeight: "行间距",
	font: "字体",
	arial: "无衬线体 - Arial",
	times: "衬线体 - Times New Roman",
	builtElements: "嵌入元素（视频、地图等）",
	on: "开启",
	off: "关闭",
	reset: "重置设置",
	panelLabel: "网站视障辅助版",
	menu: "菜单",
	fontSizeMinus: "减小字体",
	fontSizePlus: "增大字体",
	themeWhite: "白底黑字",
	themeBlack: "黑底白字",
	themeBlue: "浅蓝底深蓝字",
	themeBrown: "米色底棕色字",
	themeGreen: "深棕底绿字",
	imagesOn: "显示图片",
	imagesOff: "隐藏图片",
	imagesGrayscale: "灰度图片",
	speechOff: "关闭语音合成",
	speechOn: "开启语音合成",
	openSettings: "打开设置",
	closeSettings: "关闭设置",
	close: "关闭",
	hidePanel: "隐藏面板",
	showPanel: "显示面板",
	speechPlay: "播放",
	speechPause: "暂停",
	speechResume: "继续",
	speechStop: "停止",
	openInNewTab: "在新标签页中打开"
};
var voice = {
	fontSizePlus: "字体已增大",
	fontSizeMinus: "字体已减小",
	siteColorBlackOnWhite: "网站配色：白底黑字",
	siteColorWhiteOnBlack: "网站配色：黑底白字",
	siteColorDarkBlueOnBlue: "网站配色：浅蓝底深蓝字",
	siteColorBeigeBrown: "网站配色：米色底棕色字",
	siteColorGreenOnDarkBrown: "网站配色：深棕底绿字",
	imagesOn: "图片已开启",
	imagesOff: "图片已关闭",
	imagesGrayscale: "图片为灰度",
	speechOn: "语音合成已开启",
	speechOff: "语音合成已关闭",
	speechVoiceChanged: "语音已更改",
	lineHeightNormal: "行间距标准",
	lineHeightAverage: "行间距中等",
	lineHeightBig: "行间距较大",
	letterSpacingNormal: "字间距标准",
	letterSpacingAverage: "字间距中等",
	letterSpacingBig: "字间距较大",
	fontArial: "无衬线体 - Arial",
	fontTimes: "衬线体 - Times New Roman",
	builtElementsOn: "嵌入元素已开启",
	builtElementsOff: "嵌入元素已关闭",
	resetSettings: "已恢复默认设置",
	panelShow: "面板已显示",
	panelHide: "面板已隐藏",
	panelOn: "网站视障辅助版",
	panelOff: "网站普通版"
};
var zhCN = {
	text: text,
	voice: voice
};

/**
 * Встроенные словари. Ключ — код языка BCP 47, значение — тексты интерфейса и голосовые сообщения.
 * Единственный источник списка языков: из него строятся проверка `lang` в конфиге и выбор словаря.
 * @type {Record<string, {text: Record<string, string>, voice: Record<string, string>}>}
 */
const locales = {
  'ru-RU': ruRU,
  'en-US': enUS,
  'es-ES': esES,
  'de-DE': deDE,
  'fr-FR': frFR,
  'pt-BR': ptBR,
  'it-IT': itIT,
  'tr-TR': trTR,
  'pl-PL': plPL,
  'zh-CN': zhCN,
  'ja-JP': jaJP
};

/** Коды поддерживаемых языков. */
const LANGUAGES = Object.keys(locales);

/**
 * Значения параметров Bvi, применяемые при отсутствии пользовательских настроек.
 * @type {Record<string, string|number|boolean>}
 */
const Default = {
  target: '.bvi-open',
  fontSize: 16,
  theme: 'white',
  images: 'grayscale',
  letterSpacing: 'normal',
  lineHeight: 'normal',
  speech: true,
  speechVoice: '',
  fontFamily: 'arial',
  builtElements: false,
  panelFixed: true,
  panelHide: false,
  reload: false,
  lang: 'ru-RU',
  copyright: true
};

/**
 * Допустимые JavaScript-типы для проверки конфигурации.
 * @type {Record<string, string>}
 */
const DefaultType = {
  target: 'string',
  fontSize: 'number',
  theme: 'string',
  images: '(string|boolean)',
  letterSpacing: 'string',
  lineHeight: 'string',
  speech: 'boolean',
  speechVoice: 'string',
  fontFamily: 'string',
  builtElements: 'boolean',
  panelFixed: 'boolean',
  panelHide: 'boolean',
  reload: 'boolean',
  lang: 'string',
  copyright: 'boolean'
};

/**
 * Регулярные выражения допустимых значений конфигурации.
 * @type {Record<string, string>}
 */
const DefaultOptions = {
  target: '',
  fontSize: '(^[1-9]$|^[1-3][0-9]?$|^39$)',
  theme: '(white|black|blue|brown|green)',
  images: '(true|false|grayscale)',
  letterSpacing: '(normal|average|big)',
  lineHeight: '(normal|average|big)',
  speech: '(true|false)',
  speechVoice: '',
  fontFamily: '(arial|times)',
  builtElements: '(true|false)',
  panelFixed: '(true|false)',
  panelHide: '(true|false)',
  reload: '(true|false)',
  lang: `(${LANGUAGES.join('|')})`,
  copyright: '(true|false)'
};

const DEFAULT_LANG = 'ru-RU';

/**
 * Предоставляет локализованные тексты и голосовые сообщения интерфейса.
 * @class
 * @classdesc Выбирает словарь по языку и безопасно возвращает сообщения.
 */
class I18n {
  /**
   * Создаёт локализатор.
   * @param {{lang?: string}} options - Параметры локализации; `lang` — код языка из `locales`, иначе русский.
   */
  constructor(options) {
    this._config = options;
  }

  /**
   * Возвращает сообщение из выбранного словаря. Неизвестный язык или пропущенный ключ не роняют плагин:
   * берётся русский текст.
   * @private
   * @param {'text'|'voice'} type - Раздел словаря.
   * @param {string} key - Ключ сообщения.
   * @returns {string} Локализованное сообщение.
   */
  _get(type, key) {
    const messages = this._config.lang && locales[this._config.lang] || locales[DEFAULT_LANG];
    return key in messages[type] ? messages[type][key] : locales[DEFAULT_LANG][type][key];
  }

  /**
   * Возвращает текстовую подпись интерфейса.
   * @param {string} key - Ключ подписи.
   * @returns {string} Локализованный текст.
   */
  text(key) {
    return this._get('text', key);
  }

  /**
   * Возвращает голосовую подсказку.
   * @param {string} key - Ключ подсказки.
   * @returns {string} Локализованный текст подсказки.
   */
  voice(key) {
    return this._get('voice', key);
  }
}

/** @typedef {import('../i18n').I18n} I18n */

/**
 * Создаёт HTML-контролы воспроизведения речи.
 * @param {I18n} i18n - Локализатор подписей кнопок.
 * @returns {string} HTML-разметка контролов речи.
 */
const getSpeechControlsTemplate = i18n => {
  /**
   * Кнопка управления озвучкой.
   * @param {string} name - Суффикс класса `bvi-speech-*` (`play`, `pause`, `resume`, `stop`).
   * @param {string} key - Ключ подписи в словаре.
   * @param {boolean} [disabled=false] - Кнопка недоступна до начала воспроизведения.
   * @returns {string} HTML кнопки.
   */
  const control = (name, key, disabled = false) => {
    const label = i18n.text(key);
    const state = disabled ? ' disabled' : '';
    const attribute = disabled ? ' disabled' : '';
    return `<button type="button" class="bvi-link bvi-speech-${name}${state}"${attribute} title="${label}">${label}</button>`;
  };
  return `
  <div class="bvi-speech-link">
    ${control('play', 'speechPlay')}
    ${control('pause', 'speechPause', true)}
    ${control('resume', 'speechResume', true)}
    ${control('stop', 'speechStop', true)}
  </div>`;
};

/**
 * Кандидаты на фокус: окончательно отбираются по tabIndex, доступности и видимости.
 * @type {string}
 */
const FOCUSABLE = 'a[href], button, input, select, textarea, summary, [tabindex]';

/**
 * Проверяет видимость элемента с поддержкой старых браузеров.
 * @param {Element} element - Проверяемый элемент.
 * @returns {boolean} Видим ли элемент.
 */
const isVisible = element => typeof element.checkVisibility === 'function' ? element.checkVisibility({
  visibilityProperty: true
}) : element.getClientRects().length > 0;

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
  all(selector, root = document) {
    return /** @type {HTMLElement[]} */[...root.querySelectorAll(selector)];
  },
  /**
   * Первый элемент по селектору.
   * @param {string} selector - CSS-селектор.
   * @param {ParentNode} [root=document] - Область поиска.
   * @returns {HTMLElement|null} Элемент или `null`, если ничего не найдено.
   */
  one(selector, root = document) {
    return /** @type {HTMLElement|null} */root.querySelector(selector);
  },
  /**
   * Прямые потомки, подходящие под селектор.
   * @param {Element} element - Родитель.
   * @param {string} selector - CSS-селектор потомков.
   * @returns {HTMLElement[]} Подходящие дочерние элементы.
   */
  children(element, selector) {
    return /** @type {HTMLElement[]} */[...element.children].filter(child => child.matches(selector));
  },
  /**
   * Ближайший предок (сам элемент не в счёт).
   * @param {Element} element - Элемент, от которого идёт поиск вверх.
   * @param {string} selector - CSS-селектор предка.
   * @returns {HTMLElement|null} Предок или `null`, если такого нет.
   */
  ancestor(element, selector) {
    return /** @type {HTMLElement|null} */element.parentElement ? element.parentElement.closest(selector) : null;
  },
  /**
   * Ближайший сосед в заданном направлении.
   * @param {Element} element - Исходный элемент.
   * @param {string} selector - CSS-селектор соседа.
   * @param {'next'|'previous'} [direction='next'] - Искать после элемента или перед ним.
   * @returns {HTMLElement|null} Первый подходящий сосед или `null`.
   */
  sibling(element, selector, direction = 'next') {
    const step = direction === 'previous' ? 'previousElementSibling' : 'nextElementSibling';
    for (let node = element[step]; node; node = node[step]) {
      if (node.matches(selector)) {
        return /** @type {HTMLElement} */node;
      }
    }
    return null;
  },
  /**
   * Подходит ли значение под селектор (не элемент, например `window`, — просто `false`).
   * @param {*} element - Проверяемое значение.
   * @param {string} selector - CSS-селектор.
   * @returns {boolean} `true`, если это элемент и он подходит под селектор.
   */
  is(element, selector) {
    return element instanceof Element && element.matches(selector);
  },
  /**
   * Элементы внутри, на которые можно перейти с клавиатуры: видимые, доступные и с tabIndex ≥ 0.
   * @param {ParentNode} root - Область поиска.
   * @param {string} [selector] - Оставить только подходящие под селектор.
   * @returns {HTMLElement[]} Элементы в порядке документа.
   */
  focusable(root, selector) {
    return SelectorEngine.all(FOCUSABLE, root).filter(element => element.tabIndex >= 0 && !element.matches(':disabled') && isVisible(element)).filter(element => !selector || element.matches(selector));
  }
};

/**
 * Проверяет, является ли значение DOM-элементом.
 * @param {*} object - Проверяемое значение.
 * @returns {boolean} Является ли значение DOM-элементом.
 */
const isElement = object => {
  if (!object || typeof object !== 'object') {
    return false;
  }
  return typeof object.nodeType !== 'undefined';
};

/**
 * Возвращает элемент по ссылке на него или CSS-селектору.
 * @param {Element|string|null} object - Элемент, CSS-селектор или `null` (тогда результат `null`).
 * @param {ParentNode} [root=document] - Корень поиска.
 * @returns {Element|null} Найденный элемент или `null`.
 */
const getElement = (object, root = document) => {
  if (isElement(object)) {
    return /** @type {Element} */object;
  }
  return typeof object === 'string' && object.length > 0 ? SelectorEngine.one(object, root) : null;
};

/**
 * Создаёт HTML-элемент с необязательным классом.
 * @param {string} tag - Имя тега.
 * @param {string} [className] - Имя CSS-класса.
 * @returns {HTMLElement} Созданный элемент.
 */
const createElement = (tag, className = '') => {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  return element;
};

/**
 * Вставляет HTML-строку или элемент относительно `target`.
 * @param {Element} target - Целевой элемент.
 * @param {InsertPosition} position - Позиция вставки.
 * @param {string|Element} content - Вставляемая разметка или элемент.
 * @returns {void}
 */
const insert = (target, position, content) => {
  if (typeof content === 'string') {
    target.insertAdjacentHTML(position, content);
  } else {
    target.insertAdjacentElement(position, content);
  }
};

/**
 * Удаляет элемент из DOM, если он существует.
 * @param {Element|null} element - Удаляемый элемент.
 * @returns {void}
 */
const removeElement = element => {
  if (element) {
    element.remove();
  }
};

/**
 * Оборачивает дочерние узлы родителя в указанный элемент.
 * @param {Element} parent - Родительский элемент.
 * @param {Element|string} wrapper - Обёртка или имя её тега.
 * @param {string} className - Класс обёртки.
 * @returns {void}
 */
const wrapInner = (parent, wrapper, className) => {
  if (typeof wrapper === 'string') {
    wrapper = createElement(wrapper);
  }
  parent.appendChild(wrapper).className = className;
  while (parent.firstChild !== wrapper) {
    wrapper.appendChild(/** @type {ChildNode} */parent.firstChild);
  }
};

/**
 * Удаляет обёртку, сохраняя её дочерние узлы в DOM.
 * @param {Element|null} wrapper - Удаляемая обёртка.
 * @returns {void}
 */
const unwrap = wrapper => {
  if (!wrapper || !wrapper.parentNode) return;
  const docFrag = document.createDocumentFragment();
  while (wrapper.firstChild) {
    const child = wrapper.removeChild(wrapper.firstChild);
    docFrag.appendChild(child);
  }
  wrapper.parentNode.replaceChild(docFrag, wrapper);
};

/**
 * Определяет нормализованный тип JavaScript-значения.
 * @param {*} obj - Значение для проверки.
 * @returns {string} Имя типа в нижнем регистре.
 */
const toType = obj => {
  if (obj === null || obj === undefined) {
    return `${obj}`;
  }
  const tag = {}.toString.call(obj).match(/\s([a-z]+)/i);
  return tag ? tag[1].toLowerCase() : 'object';
};

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
    const expectedTypes = configTypes[key];
    const value = config[key];
    const valueType = value && isElement(value) ? 'element' : toType(value);
    if (!new RegExp(expectedTypes).test(valueType)) {
      throw new TypeError(`Bvi console: Опция "${key}" предоставленный тип "${valueType}", ожидаемый тип "${expectedTypes}".`);
    }
  });
  Object.keys(configOptions).forEach(key => {
    const expectedOptions = configOptions[key];
    const value = config[key];
    if (!new RegExp(expectedOptions).test(value)) {
      throw new TypeError(`Bvi console: Опция "${key}" параметр "${value}", ожидаемый параметр "${expectedOptions}".`);
    }
  });
};

/**
 * Перебирает собственные ключи объекта.
 * @param {Object} object - Исходный объект.
 * @param {(key: string) => void} callback - Функция для каждого ключа.
 * @returns {void}
 */
const getObject = (object, callback) => {
  Object.keys(object).forEach(key => {
    if (typeof callback === 'function') {
      callback(key);
    }
  });
};

/**
 * Перебирает элементы итерируемого значения.
 * @param {Iterable<*>} array - Итерируемое значение.
 * @param {(item: *) => void} callback - Функция для каждого элемента.
 * @returns {void}
 */
const getArray = (array, callback) => {
  Array.from(array).forEach(key => {
    if (typeof callback === 'function') {
      callback(key);
    }
  });
};

/**
 * Преобразует строковое представление включённого состояния в boolean.
 * @param {*} string - Значение для преобразования.
 * @returns {boolean} `true` для `on`, `true` или `1`; иначе `false`.
 */
const stringToBoolean = string => {
  switch (string) {
    case 'on':
    case 'true':
    case '1':
      return true;
    default:
      return false;
  }
};

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
  on(target, type, handler, options) {
    const listener = /** @type {EventListener} */handler;
    target.addEventListener(type, listener, options);
    return () => target.removeEventListener(type, listener, options);
  },
  /**
   * Набор подписок, которые снимаются вместе.
   * @returns {{
   *   on: <T extends string>(target: EventTarget, type: T, handler: Handler<T>, options?: AddEventListenerOptions|boolean) => void,
   *   add: (cleanup: () => void) => void,
   *   clear: () => void
   * }} Набор подписок.
   */
  scope() {
    /** @type {(() => void)[]} */
    const cleanups = [];
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
      on(target, type, handler, options) {
        cleanups.push(EventHandler.on(target, type, handler, options));
      },
      /**
       * Добавляет в набор своё действие отмены, например `onvoiceschanged = null`.
       * @param {() => void} cleanup - Функция, которую вызовет `clear()`.
       * @returns {void}
       */
      add(cleanup) {
        cleanups.push(cleanup);
      },
      /**
       * Снимает все подписки набора и очищает его.
       * @returns {void}
       */
      clear() {
        cleanups.splice(0).forEach(cleanup => cleanup());
      }
    };
  }
};

const DATA = 'data-bvi';

/**
 * Строит имя служебного атрибута `data-bvi`. Имя всегда в нижнем регистре: CSS обращается к нему как
 * `[data-bvi-fontsize]`. Без ключа получается сам `data-bvi` (в нём хранится действие кнопки).
 * @param {string} [key] - Суффикс атрибута.
 * @returns {string} Имя атрибута.
 */
const dataName = key => key ? `${DATA}-${String(key).toLowerCase()}` : DATA;

/**
 * Состояние элемента в одном месте: атрибуты (`getAttr`...), служебные `data-bvi-*` (`getData`...),
 * классы (`addClass`...) и стили (`setStyle`).
 */
const Manipulator = {
  /**
   * Читает значение атрибута.
   * @param {Element} element - Элемент.
   * @param {string} name - Имя атрибута.
   * @returns {string|null} Значение или `null`, если атрибута нет.
   */
  getAttr(element, name) {
    return element.getAttribute(name);
  },
  /**
   * Записывает атрибут, приводя значение к строке.
   * @param {Element} element - Элемент.
   * @param {string} name - Имя атрибута.
   * @param {string|number|boolean} value - Новое значение.
   * @returns {void}
   */
  setAttr(element, name, value) {
    element.setAttribute(name, String(value));
  },
  /**
   * Проверяет наличие атрибута.
   * @param {Element} element - Элемент.
   * @param {string} name - Имя атрибута.
   * @returns {boolean} `true`, если атрибут есть.
   */
  hasAttr(element, name) {
    return element.hasAttribute(name);
  },
  /**
   * Удаляет атрибут.
   * @param {Element} element - Элемент.
   * @param {string} name - Имя атрибута.
   * @returns {void}
   */
  removeAttr(element, name) {
    element.removeAttribute(name);
  },
  /**
   * Добавляет один или несколько классов.
   * @param {Element} element - Элемент.
   * @param {...string} classNames - Добавляемые классы.
   * @returns {void}
   */
  addClass(element, ...classNames) {
    element.classList.add(...classNames);
  },
  /**
   * Убирает один или несколько классов.
   * @param {Element} element - Элемент.
   * @param {...string} classNames - Убираемые классы.
   * @returns {void}
   */
  removeClass(element, ...classNames) {
    element.classList.remove(...classNames);
  },
  /**
   * Переключает класс или принудительно включает и выключает его.
   * @param {Element} element - Элемент.
   * @param {string} className - Класс.
   * @param {boolean} [force] - `true` добавляет класс, `false` убирает; без него класс переключается.
   * @returns {boolean} `true`, если после вызова класс есть у элемента.
   */
  toggleClass(element, className, force) {
    return element.classList.toggle(className, force);
  },
  /**
   * Проверяет наличие класса.
   * @param {Element} element - Элемент.
   * @param {string} className - Класс.
   * @returns {boolean} `true`, если класс есть.
   */
  hasClass(element, className) {
    return element.classList.contains(className);
  },
  /**
   * Задаёт встроенный стиль. Пустое значение убирает его.
   * @param {HTMLElement} element - Элемент.
   * @param {string} property - Свойство в camelCase (`display`, `overflow`, `height`) или CSS-переменная (`--bvi-panel-offset`).
   * @param {string} value - Значение свойства.
   * @returns {void}
   */
  setStyle(element, property, value) {
    const style = /** @type {any} */element.style;
    if (property.startsWith('--')) {
      style.setProperty(property, value);
    } else {
      style[property] = value;
    }
  },
  /**
   * Читает служебный атрибут `data-bvi-*`.
   * @param {Element} element - Элемент.
   * @param {string} [key] - `fontSize` → `data-bvi-fontsize`; без ключа читается `data-bvi` (действие кнопки).
   * @returns {string|null} Значение или `null`, если атрибута нет.
   */
  getData(element, key) {
    return Manipulator.getAttr(element, dataName(key));
  },
  /**
   * Записывает служебный атрибут `data-bvi-*`.
   * @param {Element} element - Элемент.
   * @param {string} key - Суффикс атрибута: `fontSize` → `data-bvi-fontsize`.
   * @param {string|number|boolean} value - Новое значение.
   * @returns {void}
   */
  setData(element, key, value) {
    Manipulator.setAttr(element, dataName(key), value);
  },
  /**
   * Удаляет служебный атрибут `data-bvi-*`.
   * @param {Element} element - Элемент.
   * @param {string} key - Суффикс атрибута.
   * @returns {void}
   */
  removeData(element, key) {
    Manipulator.removeAttr(element, dataName(key));
  }
};

/**
 * @file Утилита доступа к браузерному синтезатору речи.
 *
 * Возвращает браузерный API синтеза речи.
 * @returns {SpeechSynthesis} Экземпляр синтезатора речи.
 */
const synth = () => window.speechSynthesis;

/**
 * Приводит код языка к виду `pt-br`: Android отдаёт голоса как `pt_BR`, регистр бывает любым.
 * @param {string} code - Код языка.
 * @returns {string} Код в нижнем регистре с дефисом.
 */
const normalizeLang = code => String(code || '').toLowerCase().replace('_', '-');

/**
 * Подбирает голос для языка: сначала полное совпадение кода ('pt-BR'), затем тот же язык
 * другого региона ('pt-PT'). Порядок в списке голосов не важен: точное совпадение всегда важнее.
 * @param {SpeechSynthesisVoice[]} voices - Доступные голоса.
 * @param {string} lang - Код языка, например `pt-BR`.
 * @returns {SpeechSynthesisVoice|undefined} Подходящий голос или `undefined`, если нет голоса на этом языке.
 */
const findVoice = (voices, lang) => {
  const wanted = normalizeLang(lang);
  /**
   * Язык без региона.
   * @param {string} code - Код языка, например `pt-BR`.
   * @returns {string} Основа кода, например `pt`.
   */
  const baseOf = code => normalizeLang(code).split('-')[0];
  return voices.find(voice => normalizeLang(voice.lang) === wanted) || voices.find(voice => baseOf(voice.lang) === baseOf(wanted));
};

/**
 * Сохраняет значение cookie с префиксом `bvi_` на один день.
 * @param {string} name - Имя cookie без префикса.
 * @param {string|number|boolean} [value=''] - Значение, преобразуемое в строку.
 * @returns {void}
 */
const setCookie = function (name = '', value = '') {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  document.cookie = `bvi_${name}=${encodeURIComponent(value)};path=/;expires=${expires.toUTCString()};SameSite=Lax`;
};

/**
 * Читает cookie с префиксом `bvi_`.
 * @param {string} name - Имя cookie без префикса.
 * @returns {string|undefined} Значение cookie или `undefined`, если оно не найдено.
 */
const getCookie = function (name = '') {
  const cookieName = `bvi_${name}=`;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
    }
  }
};

/**
 * Удаляет cookie с префиксом `bvi_`.
 * @param {string} name - Имя cookie без префикса.
 * @returns {void}
 */
const removeCookie = function (name = '') {
  document.cookie = `bvi_${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;SameSite=Lax`;
};

/**
 * Управление синтезом речи, кнопками воспроизведения и подсветкой текста.
 * @file
 */

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
  constructor(options = {}) {
    this._lang = options.lang || 'ru-RU';
    this._i18n = new I18n({
      lang: this._lang
    });
    this._statusTimer = null;
    this._playback = null;
    this._listeners = EventHandler.scope();
  }

  /**
   * Добавляет контролы речи к найденным блокам текста.
   * @returns {void}
   */
  mount() {
    this.destroyControls();
    if (!this.isEnabled()) {
      return;
    }
    SelectorEngine.all('.bvi-speech').forEach((speechBlock, index) => {
      const id = `bvi-speech-text-id-${index + 1}`;
      wrapInner(speechBlock, 'div', `bvi-speech-text ${id}`);
      insert(speechBlock, 'afterbegin', getSpeechControlsTemplate(this._i18n));
    });
    this._bindControls();
  }

  /**
   * Останавливает речь и удаляет связанные DOM-контролы.
   * @returns {void}
   */
  destroy() {
    this.stopStatusTimer();
    this.destroyControls();
    if (this.isSupported()) {
      this._cancelSpeech();
    }
    this._playback = null;
  }

  /**
   * Отменяет все реплики в очереди синтезатора и снимает с него паузу: иначе после паузы следующая озвучка не начнётся.
   * @private
   * @returns {void}
   */
  _cancelSpeech() {
    synth().cancel();
    if (synth().paused) {
      synth().resume();
    }
  }

  /**
   * Удаляет контролы речи и восстанавливает исходный текст.
   * @returns {void}
   */
  destroyControls() {
    this._listeners.clear();
    this._restoreAllHighlightedText();
    SelectorEngine.all('.bvi-speech-text').forEach(element => unwrap(element));
    SelectorEngine.all('.bvi-speech-link').forEach(element => removeElement(element));
  }

  /**
   * Запускает опрос синтезатора раз в секунду: когда речь закончилась (очередь пуста, пауз нет),
   * кнопки блоков возвращаются в состояние «остановлено». Ничего не делает, если озвучка выключена.
   * @returns {void}
   */
  startStatusTimer() {
    this.stopStatusTimer();
    if (!this.isEnabled()) {
      return;
    }
    this._statusTimer = setInterval(() => {
      if (this._playback && this._playback.paused) {
        return;
      }
      if (!synth().pending && !synth().speaking && !synth().paused) {
        this.disableButtons();
      }
    }, 1000);
  }

  /**
   * Останавливает опрос состояния синтезатора.
   * @returns {void}
   */
  stopStatusTimer() {
    if (this._statusTimer) {
      clearInterval(this._statusTimer);
      this._statusTimer = null;
    }
  }

  /**
   * Озвучивает текст и при необходимости подсвечивает произносимые слова.
   * @param {string} text - Текст для озвучивания.
   * @param {HTMLElement|null} [element=null] - Блок для подсветки слов.
   * @param {boolean} [echo=false] - Включить подсветку во время озвучивания.
   * @returns {void}
   */
  speak(text, element = null, echo = false) {
    if (!this.isEnabled()) {
      return;
    }
    this._restoreAllHighlightedText();
    this._cancelSpeech();
    this._startPlayback(String(text), element, echo);
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
  _startPlayback(text, element, echo = false, startPosition = 0) {
    const sourceText = String(text);
    const target = echo && element ? this._prepareHighlighting(element) : null;
    const chunks = this._splitText(sourceText.slice(startPosition), startPosition);
    const playback = {
      echo,
      element,
      paused: false,
      pauseFallback: false,
      position: startPosition,
      target,
      text: sourceText
    };
    this._playback = playback;
    chunks.forEach((chunk, index) => {
      const utter = this._createUtterance(chunk.text);
      if (target) {
        this._addHighlighting(utter, target, chunk.start, index === chunks.length - 1, playback);
      }
      try {
        synth().speak(utter);
      } catch (error) {
        this._playback = null;
        this._restoreAllHighlightedText();
      }
    });
  }

  /**
   * Проверяет, включён ли синтез речи в настройках и браузере.
   * @returns {boolean} Доступна ли озвучка.
   */
  isEnabled() {
    return this.isSupported() && stringToBoolean(getCookie('speech'));
  }

  /**
   * Проверяет наличие Web Speech API.
   * @returns {boolean} Поддерживается ли синтез речи.
   */
  isSupported() {
    return 'speechSynthesis' in window;
  }

  /**
   * Переводит кнопки речи в состояние «остановлено».
   * @returns {void}
   */
  disableButtons() {
    SelectorEngine.all('.bvi-speech-play').forEach(element => this._setDisabled(element, false));
    SelectorEngine.all('.bvi-speech-pause').forEach(element => this._setDisabled(element, true));
    SelectorEngine.all('.bvi-speech-resume').forEach(element => this._setDisabled(element, true));
    SelectorEngine.all('.bvi-speech-stop').forEach(element => this._setDisabled(element, true));
  }

  /**
   * Делает кнопку доступной или недоступной: класс `disabled` и свойство `disabled` меняются вместе.
   * @private
   * @param {HTMLElement} element - Кнопка озвучки.
   * @param {boolean} disabled - `true` — кнопка недоступна.
   * @returns {void}
   */
  _setDisabled(element, disabled) {
    const button = /** @type {HTMLButtonElement} */element;
    Manipulator.toggleClass(button, 'disabled', disabled);
    button.disabled = disabled;
  }

  /**
   * Подписывает кнопки «Воспроизвести», «Пауза», «Продолжить» и «Стоп» во всех блоках озвучки на обработчики.
   * @private
   * @returns {void}
   */
  _bindControls() {
    this._onClickAll('.bvi-speech-play', button => this._playBlock(button));
    this._onClickAll('.bvi-speech-pause', button => this._pauseBlock(button));
    this._onClickAll('.bvi-speech-resume', button => this._resumeBlock(button));
    this._onClickAll('.bvi-speech-stop', button => this._stopBlock(button));
  }

  /**
   * Возвращает контейнер кнопок озвучки, в котором лежит кнопка.
   * @private
   * @param {HTMLElement} button - Нажатая кнопка.
   * @returns {HTMLElement|null} Контейнер `.bvi-speech-link` или `null`.
   */
  _getControls(button) {
    return SelectorEngine.ancestor(button, '.bvi-speech-link');
  }

  /**
   * Озвучивает текст блока, к которому относится нажатая кнопка, и переводит кнопки блока в состояние «воспроизведение».
   * @private
   * @param {HTMLElement} button - Нажатая кнопка «Воспроизвести».
   * @returns {void}
   */
  _playBlock(button) {
    const controls = this._getControls(button);
    const text = controls ? SelectorEngine.sibling(controls, '.bvi-speech-text') : null;
    if (!controls || !text) {
      return;
    }
    const hadFocus = controls.contains(document.activeElement);
    this.speak(text.textContent, text, true);
    this.disableButtons();
    this._setControlsState(controls, 'playing', hadFocus);
  }

  /**
   * Ставит воспроизведение на паузу и переводит кнопки блока в состояние «пауза».
   * @private
   * @param {HTMLElement} button - Нажатая кнопка «Пауза».
   * @returns {void}
   */
  _pauseBlock(button) {
    const controls = this._getControls(button);
    if (!controls) {
      return;
    }
    synth().pause();
    this._pauseWithFallback();
    this._setControlsState(controls, 'paused');
  }

  /**
   * Продолжает воспроизведение после паузы. Если пауза была заменена отменой речи (`pauseFallback`),
   * озвучка запускается заново с сохранённой позиции.
   * @private
   * @param {HTMLElement} button - Нажатая кнопка «Продолжить».
   * @returns {void}
   */
  _resumeBlock(button) {
    const controls = this._getControls(button);
    if (!controls) {
      return;
    }
    if (this._playback && this._playback.pauseFallback) {
      const position = this._getResumePosition();
      const playback = this._playback;
      this._restoreHighlightedText(playback.target);
      this._startPlayback(playback.text, playback.element, playback.echo, position);
    } else {
      if (this._playback) {
        this._playback.paused = false;
      }
      synth().resume();
    }
    this._setControlsState(controls, 'playing');
  }

  /**
   * Останавливает воспроизведение, сбрасывает состояние и убирает подсветку слов.
   * @private
   * @param {HTMLElement} button - Нажатая кнопка «Стоп».
   * @returns {void}
   */
  _stopBlock(button) {
    const controls = this._getControls(button);
    if (!controls) {
      return;
    }
    this._cancelSpeech();
    this._playback = null;
    this._setControlsState(controls, 'stopped');
    this._restoreAllHighlightedText();
  }

  /**
   * Обновляет доступность кнопок управления воспроизведением.
   * @private
   * @param {HTMLElement} controls - Контейнер кнопок.
   * @param {'playing'|'paused'|'stopped'} state - Состояние воспроизведения.
   * @param {boolean} [hadFocus] - Был ли фокус внутри контейнера.
   * @returns {void}
   */
  _setControlsState(controls, state, hadFocus = controls.contains(document.activeElement)) {
    /**
     * Кнопка внутри контейнера: все четыре кнопки создаёт шаблон, поэтому она всегда есть.
     * @param {string} name - Суффикс класса `bvi-speech-*`.
     * @returns {HTMLElement} Кнопка.
     */
    const button = name => (/** @type {HTMLElement} */SelectorEngine.one(`.bvi-speech-${name}`, controls));
    const play = button('play');
    const pause = button('pause');
    const resume = button('resume');
    const stop = button('stop');
    this._setDisabled(play, state !== 'stopped');
    this._setDisabled(pause, state !== 'playing');
    this._setDisabled(resume, state !== 'paused');
    this._setDisabled(stop, state === 'stopped');
    if (hadFocus) {
      ({
        playing: pause,
        paused: resume,
        stopped: play
      })[state].focus();
    }
  }

  /**
   * Помечает воспроизведение приостановленным. Если `pause()` ненадёжна (Firefox) или синтезатор продолжил
   * говорить спустя 120 мс, речь отменяется, а продолжение запускается заново с сохранённой позиции.
   * @private
   * @returns {void}
   */
  _pauseWithFallback() {
    if (!this._playback) {
      return;
    }
    this._playback.paused = true;
    if (this._needsCancelForPause()) {
      this._playback.pauseFallback = true;
      this._cancelSpeech();
      return;
    }
    setTimeout(() => {
      if (!this._playback || !this._playback.paused) {
        return;
      }
      if (synth().speaking && !synth().paused) {
        this._playback.pauseFallback = true;
        this._cancelSpeech();
      }
    }, 120);
  }

  /**
   * Определяет, нужно ли заменять паузу отменой речи: в Firefox `pause()` не останавливает речь надёжно.
   * @private
   * @returns {boolean} `true`, если браузер — Firefox.
   */
  _needsCancelForPause() {
    return typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent);
  }

  /**
   * Вычисляет позицию продолжения: ближайшая граница слова после последней произнесённой позиции,
   * чтобы озвучка не начиналась с середины слова.
   * @private
   * @returns {number} Индекс символа в полном тексте блока; `0`, если воспроизведения нет.
   */
  _getResumePosition() {
    if (!this._playback) {
      return 0;
    }
    const position = Number(this._playback.position) || 0;
    const text = this._playback.text;
    if (position <= 0) {
      return 0;
    }
    const nextSpace = text.slice(position).search(/\s/);
    if (nextSpace < 0) {
      return position;
    }
    return Math.min(position + nextSpace + 1, text.length);
  }

  /**
   * Делит текст на фрагменты до 120 символов, предпочитая границы по знакам препинания и пробелам:
   * длинные реплики синтезатор нередко обрывает.
   * @private
   * @param {string} text - Текст для озвучки.
   * @param {number} [startOffset=0] - Смещение текста в полном тексте блока: по нему подсветка узнаёт абсолютную позицию.
   * @returns {{start: number, text: string}[]} Фрагменты и индекс начала каждого в полном тексте.
   */
  _splitText(text, startOffset = 0) {
    const chunkLength = 120;
    const patternRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}' + '|^[\\s\\S]{1,' + chunkLength + '}$' + '|^[\\s\\S]{1,' + chunkLength + '} ');
    const chunks = [];
    let value = String(text);
    while (value.length > 0) {
      const match = value.match(patternRegex);
      if (!match) {
        chunks.push({
          start: startOffset + String(text).length - value.length,
          text: value.slice(0, chunkLength)
        });
        value = value.slice(chunkLength);
        continue;
      }
      chunks.push({
        start: startOffset + String(text).length - value.length,
        text: match[0]
      });
      value = value.substring(match[0].length);
    }
    return chunks;
  }

  /**
   * Создаёт реплику синтезатора. Голос выбирается так: сохранённый в настройках (cookie `speechVoice`),
   * иначе подходящий языку плагина (`findVoice`), иначе выбор остаётся за браузером по `utter.lang`.
   * @private
   * @param {string} text - Текст фрагмента.
   * @returns {SpeechSynthesisUtterance} Реплика с громкостью, скоростью, тоном, языком и голосом.
   */
  _createUtterance(text) {
    const utter = new SpeechSynthesisUtterance(text.trim());
    const voices = synth().getVoices();
    const selectedVoice = getCookie('speechVoice');
    utter.volume = 1;
    utter.rate = 1;
    utter.pitch = 1;
    utter.lang = this._lang;
    const configuredVoice = voices.find(voice => {
      return selectedVoice && this._isSelectedVoice(voice, selectedVoice);
    });
    if (configuredVoice) {
      utter.voice = configuredVoice;
      utter.lang = configuredVoice.lang;
      return utter;
    }
    const langVoice = findVoice(voices, this._lang);
    if (langVoice) {
      utter.voice = langVoice;
      utter.lang = langVoice.lang;
    }
    return utter;
  }

  /**
   * Проверяет, совпадает ли голос с сохранённым в настройках: по `voiceURI` или по имени.
   * @private
   * @param {SpeechSynthesisVoice} voice - Проверяемый голос.
   * @param {string} selectedVoice - Значение из cookie `speechVoice`.
   * @returns {boolean} `true`, если это выбранный голос.
   */
  _isSelectedVoice(voice, selectedVoice) {
    return voice && (voice.voiceURI === selectedVoice || voice.name === selectedVoice);
  }

  /**
   * Оборачивает каждое слово блока в `span.bvi-speech-word` с границами в `data-bvi-start` и `data-bvi-end`,
   * чтобы подсвечивать произносимое слово. Исходный HTML сохраняется для восстановления.
   * @private
   * @param {HTMLElement} element - Блок с текстом.
   * @returns {HTMLElement} Тот же блок, готовый к подсветке.
   */
  _prepareHighlighting(element) {
    if (!Manipulator.getData(element, 'originalHtml')) {
      Manipulator.setData(element, 'originalHtml', element.innerHTML);
    }
    const text = element.textContent;
    const fragment = document.createDocumentFragment();
    const tokens = text.match(/\S+|\s+/g) || [];
    let offset = 0;
    tokens.forEach(token => {
      if (/^\s+$/.test(token)) {
        fragment.appendChild(document.createTextNode(token));
      } else {
        const word = createElement('span');
        word.className = 'bvi-speech-word';
        Manipulator.setData(word, 'start', offset);
        Manipulator.setData(word, 'end', offset + token.length);
        word.textContent = token;
        fragment.appendChild(word);
      }
      offset += token.length;
    });
    element.innerHTML = '';
    element.appendChild(fragment);
    Manipulator.addClass(element, 'bvi-highlighting');
    return element;
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
  _addHighlighting(utter, element, offset = 0, isLast = false, playback = null) {
    let hasBoundary = false;
    const fallbackTimer = setTimeout(() => {
      if (!hasBoundary) {
        Manipulator.addClass(element, 'bvi-highlighting-fallback');
      }
    }, 700);

    /**
     * Относится ли событие к воспроизведению, которое уже прервали или заменили новым.
     * @returns {boolean} `true`, если событие устарело и его нужно игнорировать.
     */
    const isStale = () => playback !== null && this._playback !== playback;
    utter.onboundary = event => {
      if (isStale()) {
        return;
      }
      hasBoundary = true;
      clearTimeout(fallbackTimer);
      Manipulator.removeClass(element, 'bvi-highlighting-fallback');
      this._setPlaybackPosition(offset + event.charIndex);
      this._highlightWordAt(element, offset + event.charIndex);
    };
    utter.onend = () => {
      clearTimeout(fallbackTimer);
      if (isStale()) {
        return;
      }
      if (this._playback && this._playback.paused) {
        return;
      }
      if (isLast) {
        this._restoreHighlightedText(element);
        this._playback = null;
      }
    };
  }

  /**
   * Запоминает индекс последнего произнесённого символа для продолжения после паузы.
   * @private
   * @param {number|string} position - Индекс символа в полном тексте блока.
   * @returns {void}
   */
  _setPlaybackPosition(position) {
    if (this._playback) {
      this._playback.position = Number(position) || 0;
    }
  }

  /**
   * Подсвечивает слово, в границы которого попадает символ, и снимает подсветку с предыдущего слова.
   * @private
   * @param {HTMLElement} element - Блок с подготовленными словами.
   * @param {number|string} position - Индекс символа в полном тексте блока.
   * @returns {void}
   */
  _highlightWordAt(element, position) {
    const index = Number(position) >>> 0;
    const active = SelectorEngine.one('.bvi-speech-word-active', element);
    if (active) {
      Manipulator.removeClass(active, 'bvi-speech-word-active');
    }
    const word = SelectorEngine.all('.bvi-speech-word', element).find(item => {
      const start = Number(Manipulator.getData(item, 'start'));
      const end = Number(Manipulator.getData(item, 'end'));
      return index >= start && index < end;
    });
    if (word) {
      Manipulator.addClass(word, 'bvi-speech-word-active');
    }
  }

  /**
   * Снимает подсветку во всех блоках озвучки и возвращает им исходный HTML.
   * @private
   * @returns {void}
   */
  _restoreAllHighlightedText() {
    SelectorEngine.all('.bvi-speech-text.bvi-highlighting').forEach(element => {
      this._restoreHighlightedText(element);
    });
  }

  /**
   * Возвращает блоку исходный HTML и убирает классы подсветки.
   * @private
   * @param {HTMLElement|null} element - Блок озвучки; `null` игнорируется.
   * @returns {void}
   */
  _restoreHighlightedText(element) {
    if (!element) {
      return;
    }
    Manipulator.removeClass(element, 'bvi-highlighting', 'bvi-highlighting-fallback');
    const original = Manipulator.getData(element, 'originalHtml');
    if (original) {
      element.innerHTML = original;
      Manipulator.removeData(element, 'originalHtml');
    }
  }

  /**
   * Подписывает клик на все элементы, найденные по селектору; подписки снимаются вместе с остальными в `destroyControls()`.
   * @private
   * @param {string} selector - CSS-селектор кнопок.
   * @param {(button: HTMLElement) => void} callback - Обработчик; получает нажатую кнопку, `preventDefault()` уже вызван.
   * @returns {void}
   */
  _onClickAll(selector, callback) {
    SelectorEngine.all(selector).forEach(element => {
      this._listeners.on(element, 'click', event => {
        event.preventDefault();
        callback(element);
      });
    });
  }
}

var version = "2.0.0";

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
    green: ['.bvi-theme-green', 'siteColorGreenOnDarkBrown']
  },
  images: {
    true: ['.bvi-images-on', 'imagesOn'],
    false: ['.bvi-images-off', 'imagesOff'],
    grayscale: ['.bvi-images-grayscale', 'imagesGrayscale']
  },
  speech: {
    true: ['.bvi-speech-on', 'speechOn'],
    false: ['.bvi-speech-off', 'speechOff']
  },
  lineHeight: {
    normal: ['.bvi-line-height-normal', 'lineHeightNormal'],
    average: ['.bvi-line-height-average', 'lineHeightAverage'],
    big: ['.bvi-line-height-big', 'lineHeightBig']
  },
  letterSpacing: {
    normal: ['.bvi-letter-spacing-normal', 'letterSpacingNormal'],
    average: ['.bvi-letter-spacing-average', 'letterSpacingAverage'],
    big: ['.bvi-letter-spacing-big', 'letterSpacingBig']
  },
  fontFamily: {
    arial: ['.bvi-font-family-arial', 'fontArial'],
    times: ['.bvi-font-family-times', 'fontTimes']
  },
  builtElements: {
    true: ['.bvi-built-elements-on', 'builtElementsOn'],
    false: ['.bvi-built-elements-off', 'builtElementsOff']
  }
};

/** @typedef {import('../i18n').I18n} I18n */

/**
 * Создаёт HTML-разметку панели настроек.
 * @param {I18n} i18n - Локализатор подписей панели.
 * @param {boolean} [panelHidden=false] - Скрыть панель при создании.
 * @param {boolean} [copyright=true] - Добавить ссылку на проект.
 * @returns {string} HTML-разметка панели.
 */
const getPanelTemplate = (i18n, panelHidden = false, copyright = true) => {
  const panelHide = panelHidden ? ' bvi-panel-hide' : '';
  /**
   * Атрибуты подписи кнопки без текста: `aria-label` и `title` с одним и тем же переводом.
   * @param {string} key - Ключ подписи в словаре.
   * @returns {string} Строка атрибутов для вставки в тег.
   */
  const label = key => `aria-label="${i18n.text(key)}" title="${i18n.text(key)}"`;
  /**
   * Атрибуты кнопки-переключателя: подпись и начальное состояние `aria-pressed="false"`.
   * @param {string} key - Ключ подписи в словаре.
   * @returns {string} Строка атрибутов для вставки в тег.
   */
  const toggle = key => `${label(key)} aria-pressed="false"`;
  return `
    <div class="bvi-panel${panelHide}" role="region" aria-label="${i18n.text('panelLabel')}">
      <button type="button" class="bvi-link bvi-menu-toggle" data-bvi="menu" aria-expanded="false" aria-controls="bvi-menu">
        <i class="bvi-images bvi-images-bars" aria-hidden="true"></i>
        <span>${i18n.text('menu')}</span>
      </button>
      <div class="bvi-menu" id="bvi-menu">
      <div class="bvi-blocks bvi-block-center">
        <div class="bvi-block" role="group" aria-labelledby="bvi-title-fontSize">
          <div class="bvi-block-title" id="bvi-title-fontSize">${i18n.text('fontSize')}</div>
          <button type="button" class="bvi-link bvi-font-size-minus" ${label('fontSizeMinus')}>А-</button>
          <button type="button" class="bvi-link bvi-font-size-plus" ${label('fontSizePlus')}>А+</button>
        </div>
        <div class="bvi-block" role="group" aria-labelledby="bvi-title-siteColors">
          <div class="bvi-block-title" id="bvi-title-siteColors">${i18n.text('siteColors')}</div>
          <button type="button" class="bvi-link bvi-theme-white" ${toggle('themeWhite')}>Ц</button>
          <button type="button" class="bvi-link bvi-theme-black" ${toggle('themeBlack')}>Ц</button>
          <button type="button" class="bvi-link bvi-theme-blue" ${toggle('themeBlue')}>Ц</button>
          <button type="button" class="bvi-link bvi-theme-brown" ${toggle('themeBrown')}>Ц</button>
          <button type="button" class="bvi-link bvi-theme-green" ${toggle('themeGreen')}>Ц</button>
        </div>
        <div class="bvi-block" role="group" aria-labelledby="bvi-title-images">
          <div class="bvi-block-title" id="bvi-title-images">${i18n.text('images')}</div>
          <button type="button" class="bvi-link bvi-images-on" ${toggle('imagesOn')}>
            <i class="bvi-images bvi-images-image" aria-hidden="true"></i>
          </button>
          <button type="button" class="bvi-link bvi-images-off" ${toggle('imagesOff')}>
            <i class="bvi-images bvi-images-minus-circle" aria-hidden="true"></i>
          </button>
          <button type="button" class="bvi-link bvi-images-grayscale" ${toggle('imagesGrayscale')}>
            <i class="bvi-images bvi-images-adjust" aria-hidden="true"></i>
          </button>
        </div>
        <div class="bvi-block" role="group" aria-labelledby="bvi-title-speech">
          <div class="bvi-block-title" id="bvi-title-speech">${i18n.text('speech')}</div>
          <button type="button" class="bvi-link bvi-speech-off" ${toggle('speechOff')}>
            <i class="bvi-images bvi-images-volume-off" aria-hidden="true"></i>
          </button>
          <button type="button" class="bvi-link bvi-speech-on" ${toggle('speechOn')}>
            <i class="bvi-images bvi-images-volume-up" aria-hidden="true"></i>
          </button>
        </div>
        <div class="bvi-block" role="group" aria-labelledby="bvi-title-settings">
          <div class="bvi-block-title" id="bvi-title-settings">${i18n.text('settings')}</div>
          <button type="button" class="bvi-link" data-bvi="modal" ${label('openSettings')} aria-haspopup="dialog">
            <i class="bvi-images bvi-images-cog" aria-hidden="true"></i>
          </button>
          <button type="button" class="bvi-link" data-bvi="close">
            ${i18n.text('regularVersionOfTheSite')}
          </button>
          <button type="button" class="bvi-link" data-bvi="panel-hide" ${label('hidePanel')}>
            <i class="bvi-images bvi-images-minus" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      </div>
      <div class="bvi-modal">
        <div class="bvi-modal-dialog">
          <div class="bvi-modal-content" role="dialog" aria-modal="true" aria-labelledby="bvi-modal-title">
            <div class="bvi-modal-header">
              <div class="bvi-modal-title" id="bvi-modal-title">${i18n.text('settings')}</div>
              <button type="button" class="bvi-link bvi-modal-close" data-bvi="modal-close" ${label('closeSettings')}>×</button>
            </div>
            <div class="bvi-modal-body">
              <div class="bvi-blocks bvi-block-center">
                <div class="bvi-block" role="group" aria-labelledby="bvi-title-letterSpacing">
                  <div class="bvi-block-title" id="bvi-title-letterSpacing">${i18n.text('letterSpacing')}</div>
                  <button type="button" class="bvi-link bvi-letter-spacing-normal" aria-pressed="false">${i18n.text('normal')}</button>
                  <button type="button" class="bvi-link bvi-letter-spacing-average" aria-pressed="false">${i18n.text('average')}</button>
                  <button type="button" class="bvi-link bvi-letter-spacing-big" aria-pressed="false">${i18n.text('big')}</button>
                </div>
                <div class="bvi-block" role="group" aria-labelledby="bvi-title-lineHeight">
                  <div class="bvi-block-title" id="bvi-title-lineHeight">${i18n.text('lineHeight')}</div>
                  <button type="button" class="bvi-link bvi-line-height-normal" aria-pressed="false">${i18n.text('normal')}</button>
                  <button type="button" class="bvi-link bvi-line-height-average" aria-pressed="false">${i18n.text('average')}</button>
                  <button type="button" class="bvi-link bvi-line-height-big" aria-pressed="false">${i18n.text('big')}</button>
                </div>
                <div class="bvi-block" role="group" aria-labelledby="bvi-title-font">
                  <div class="bvi-block-title" id="bvi-title-font">${i18n.text('font')}</div>
                  <button type="button" class="bvi-link bvi-font-family-arial" aria-pressed="false">${i18n.text('arial')}</button>
                  <button type="button" class="bvi-link bvi-font-family-times" aria-pressed="false">${i18n.text('times')}</button>
                </div>
                <div class="bvi-block" role="group" aria-labelledby="bvi-title-builtElements">
                  <div class="bvi-block-title" id="bvi-title-builtElements">${i18n.text('builtElements')}</div>
                  <button type="button" class="bvi-link bvi-built-elements-on" aria-pressed="false">${i18n.text('on')}</button>
                  <button type="button" class="bvi-link bvi-built-elements-off" aria-pressed="false">${i18n.text('off')}</button>
                </div>
                <div class="bvi-block bvi-block-wide">
                  <label class="bvi-block-title" for="bvi-speech-voice">${i18n.text('speechVoice')}</label>
                  <select class="bvi-select bvi-speech-voice" id="bvi-speech-voice">
                    <option value="">${i18n.text('speechVoiceDefault')}</option>
                  </select>
                </div>
              </div>
              ${copyright ? `<div class="bvi-blocks bvi-block-center">
                <a href="https://bvi.isvek.ru" class="bvi-copyright" target="_blank" rel="noopener noreferrer" aria-label="bvi.isvek.ru, ${i18n.text('openInNewTab')}">bvi.isvek.ru</a>
              </div>` : ''}
            </div>
            <div class="bvi-modal-footer">
              <button type="button" class="bvi-link bvi-reset">${i18n.text('reset')}</button>
              <button type="button" class="bvi-link bvi-modal-dismiss" data-bvi="modal-close">${i18n.text('close')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
};

/**
 * Создаёт кнопку показа скрытой панели.
 * @param {I18n} i18n - Локализатор подписи кнопки.
 * @param {boolean} [panelHidden=false] - Признак скрытого состояния панели.
 * @returns {string} HTML-разметка кнопки.
 */
const getPanelShowLinkTemplate = (i18n, panelHidden = false) => {
  const linkHide = panelHidden ? 'bvi-show' : 'bvi-hide';
  const label = i18n.text('showPanel');
  return `
    <button type="button" class="bvi-link bvi-link-fixed-top bvi-no-styles ${linkHide}" data-bvi="panel-show" aria-label="${label}" title="${label}">
      <i class="bvi-images bvi-images-eye bvi-images-size-32 bvi-no-styles" aria-hidden="true"></i>
    </button>`;
};

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
const ARROW_STEPS = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1
};

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
  constructor(options) {
    this._config = this._getConfig(options);
    this._elements = SelectorEngine.all(this._config.target);
    this._i18n = new I18n({
      lang: this._config.lang
    });
    this._speech = new Speech({
      lang: this._config.lang
    });
    this._onPanelScroll = this._handlePanelScroll.bind(this);
    this._onPanelResize = this._handlePanelResize.bind(this);
    this._onVoicesChanged = this._renderSpeechVoices.bind(this);
    this._onModalKeydown = this._handleModalKeydown.bind(this);
    this._onArrowKeys = this._handleArrowKeys.bind(this);
    /** @type {HTMLElement|null} */
    this._modalOpener = null;
    this._offModalKeydown = null;
    this._listeners = EventHandler.scope();
    this._panelListeners = EventHandler.scope();
    this._addOpenListeners();
    this._init();
    console.log(`Bvi console: ready Button visually impaired v${version}`);
  }

  /**
   * Включает или отключает режим согласно сохранённому состоянию.
   * @private
   * @returns {void}
   */
  _init() {
    this._disablePanelIfSettingsAreMissing();
    if (!stringToBoolean(getCookie('panelActive'))) {
      this._remove();
      return;
    }
    this._set();
    this._renderPanel();
    this._addPanelListeners();
    this._images();
    this._speech.mount();
    this._speech.startStatusTimer();
  }

  /**
   * Регистрирует обработчики открытия режима.
   * @private
   * @returns {void}
   */
  _addOpenListeners() {
    if (!this._elements) {
      return;
    }
    this._elements.forEach(element => {
      /**
       * Включает режим для слабовидящих по клику на кнопку-триггер.
       * @param {Event} event - Клик по элементу из опции `target`.
       * @returns {void}
       */
      const listener = event => {
        event.preventDefault();
        this._saveDefaultSettings();
        setCookie('panelActive', true);
        this._init();
        this._speech.speak(this._i18n.voice('panelOn'));
      };
      this._listeners.on(element, 'click', listener);
    });
  }

  /**
   * Регистрирует обработчики панели и обновляет её элементы управления.
   * @private
   * @returns {void}
   */
  _addPanelListeners() {
    this._panelListeners.clear();
    this._panelListeners.on(window, 'scroll', this._onPanelScroll);
    this._panelListeners.on(window, 'resize', this._onPanelResize);
    this._panelListeners.on(document, 'keydown', this._onArrowKeys);
    this._setActiveControls();
    this._bindFontSizeControls();
    this._bindDataControls();
    this._bindResetControl();
    this._bindSpeechVoiceControl();
    this._bindPanelActions();
    this._bindModalOverlay();
    this._renderSpeechVoices();
    this._observePanelSize();
  }

  /**
   * Пересчитывает закрепление и его заполнитель при изменении viewport.
   * @private
   * @returns {void}
   */
  _handlePanelResize() {
    this._handlePanelScroll();
  }

  /**
   * Синхронизирует заполнитель, когда перенос кнопок меняет высоту панели.
   * @private
   * @returns {void}
   */
  _observePanelSize() {
    const panel = SelectorEngine.one('.bvi-panel');
    if (!panel || typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(() => this._syncPanelPlaceholder(panel));
    observer.observe(panel);
    this._panelListeners.add(() => observer.disconnect());
  }

  /**
   * Связывает кнопки изменения размера шрифта с настройкой.
   * @private
   * @returns {void}
   */
  _bindFontSizeControls() {
    this._onClick('.bvi-font-size-minus', element => {
      this._changeFontSize(-1, element, 'fontSizeMinus');
    });
    this._onClick('.bvi-font-size-plus', element => {
      this._changeFontSize(1, element, 'fontSizePlus');
    });
  }

  /**
   * Связывает декларативные контролы с настройками и голосовыми сообщениями.
   * @private
   * @returns {void}
   */
  _bindDataControls() {
    getObject(DATA_CONTROLS, settingName => {
      getObject(DATA_CONTROLS[settingName], settingValue => {
        const [selector, speechKey] = DATA_CONTROLS[settingName][settingValue];
        this._onClick(selector, element => {
          if (settingName === 'speech' && settingValue === 'false') {
            this._speech.speak(this._i18n.voice(speechKey));
          }
          this._setSetting(settingName, settingValue);
          if (settingName !== 'speech' || settingValue !== 'false') {
            this._speech.speak(this._i18n.voice(speechKey));
          }
          this._activateSiblingLink(element);
          if (settingName === 'speech') {
            this._speech.mount();
            this._speech.startStatusTimer();
          }
        });
      });
    });
  }

  /**
   * Связывает кнопку сброса с исходными настройками.
   * @private
   * @returns {void}
   */
  _bindResetControl() {
    this._onClick('.bvi-reset', () => {
      this._speech.speak(this._i18n.voice('resetSettings'));
      const config = /** @type {Record<string, string|number|boolean>} */this._config;
      getObject(config, key => {
        this._setSetting(key, config[key]);
      });
      this._setActiveControls();
    });
  }

  /**
   * Связывает селектор голоса с настройкой `speechVoice`.
   * @private
   * @returns {void}
   */
  _bindSpeechVoiceControl() {
    const select = /** @type {HTMLSelectElement|null} */SelectorEngine.one('.bvi-speech-voice');
    if (!select) {
      return;
    }
    this._bindVoicesChanged();
    this._panelListeners.on(select, 'change', () => {
      this._setSetting('speechVoice', select.value);
      this._speech.speak(this._i18n.voice('speechVoiceChanged'));
    });
  }

  /**
   * Подписывается на появление списка голосов синтезатора.
   * @private
   * @returns {void}
   */
  _bindVoicesChanged() {
    if (!this._speech.isSupported()) {
      return;
    }
    const synth = window.speechSynthesis;
    if (typeof synth.addEventListener === 'function') {
      this._panelListeners.on(synth, 'voiceschanged', this._onVoicesChanged);
    } else {
      synth.onvoiceschanged = this._onVoicesChanged;
      this._panelListeners.add(() => {
        synth.onvoiceschanged = null;
      });
    }
  }

  /**
   * Заполняет селектор голосами для текущего языка.
   * @private
   * @returns {void}
   */
  _renderSpeechVoices() {
    const select = /** @type {HTMLSelectElement|null} */SelectorEngine.one('.bvi-speech-voice');
    if (!select || !this._speech.isSupported()) {
      return;
    }
    const selectedValue = getCookie('speechVoice') || '';
    const voices = this._getSpeechVoices(window.speechSynthesis.getVoices(), selectedValue);
    const currentOptions = JSON.stringify(Array.from(select.options).map(option => option.value));
    const nextOptions = JSON.stringify(['', ...voices.map(voice => this._getSpeechVoiceValue(voice))]);
    if (currentOptions === nextOptions) {
      this._setSpeechVoiceSelectValue(select, selectedValue);
      return;
    }
    select.innerHTML = `<option value="">${this._i18n.text('speechVoiceDefault')}</option>`;
    voices.forEach(voice => {
      const option = /** @type {HTMLOptionElement} */createElement('option');
      option.value = this._getSpeechVoiceValue(voice);
      option.textContent = voice.lang ? `${voice.name} (${voice.lang})` : voice.name;
      select.appendChild(option);
    });
    this._setSpeechVoiceSelectValue(select, selectedValue);
  }

  /**
   * Возвращает стабильный идентификатор голоса.
   * @private
   * @param {SpeechSynthesisVoice} voice - Голос синтезатора.
   * @returns {string} Идентификатор голоса.
   */
  _getSpeechVoiceValue(voice) {
    return voice.voiceURI || voice.name;
  }

  /**
   * Выбирает уникальные голоса текущего языка и ранее выбранный голос.
   * @private
   * @param {SpeechSynthesisVoice[]} voices - Все доступные голоса.
   * @param {string} [selectedValue=''] - Идентификатор выбранного голоса.
   * @returns {SpeechSynthesisVoice[]} Подходящие голоса.
   */
  _getSpeechVoices(voices, selectedValue = '') {
    const langPrefix = this._config.lang.toLowerCase().split('-')[0];
    /** @type {string[]} */
    const values = [];
    return voices.filter(voice => {
      if (!voice || !(voice.voiceURI || voice.name)) {
        return false;
      }
      const value = this._getSpeechVoiceValue(voice);
      const voiceLang = String(voice.lang || '').toLowerCase();
      const isSelected = selectedValue && value === selectedValue;
      const isCurrentLang = voiceLang === this._config.lang.toLowerCase() || voiceLang.startsWith(langPrefix);
      if (!isSelected && !isCurrentLang) {
        return false;
      }
      if (values.indexOf(value) !== -1) {
        return false;
      }
      values.push(value);
      return true;
    });
  }

  /**
   * Устанавливает значение селектора, если соответствующий вариант существует.
   * @private
   * @param {HTMLSelectElement} select - Селектор голосов.
   * @param {string} value - Идентификатор голоса.
   * @returns {void}
   */
  _setSpeechVoiceSelectValue(select, value) {
    const hasValue = Array.from(select.options).some(option => option.value === value);
    select.value = hasValue ? value : '';
  }

  /**
   * Связывает действия панели с обработчиками. Меню раскрывается плавно, поэтому высота места под
   * закреплённую панель обновляется по окончании анимации.
   * @private
   * @returns {void}
   */
  _bindPanelActions() {
    const menu = SelectorEngine.one('.bvi-menu');
    if (menu) {
      this._panelListeners.on(menu, 'transitionend', event => {
        const panel = SelectorEngine.one('.bvi-panel');
        if (event.target === menu && panel) {
          this._syncPanelPlaceholder(panel);
        }
      });
    }
    SelectorEngine.all('.bvi-link[data-bvi]').forEach(element => {
      this._onClick(element, element => {
        const action = Manipulator.getData(element);
        if (action === 'close') {
          this._setSetting('panelActive', 'false');
          this._init();
        }
        if (action === 'menu') {
          this._toggleMenu(element);
        }
        if (action === 'modal') {
          this._showModal();
        }
        if (action === 'modal-close') {
          this._hideModal();
        }
        if (action === 'panel-hide') {
          this._hidePanel();
        }
        if (action === 'panel-show') {
          this._showPanel();
        }
      });
    });
  }

  /**
   * Раскрывает или сворачивает группы настроек на узких экранах.
   * @private
   * @param {HTMLElement} toggle - Кнопка меню.
   * @returns {void}
   */
  _toggleMenu(toggle) {
    const panel = SelectorEngine.one('.bvi-panel');
    if (!panel) {
      return;
    }
    const open = !Manipulator.hasClass(panel, 'bvi-menu-open');
    Manipulator.toggleClass(panel, 'bvi-menu-open', open);
    Manipulator.setAttr(toggle, 'aria-expanded', String(open));
  }

  /**
   * Закрывает модальное окно при клике по подложке.
   * @private
   * @returns {void}
   */
  _bindModalOverlay() {
    const modal = SelectorEngine.one('.bvi-modal');
    this._onClick(modal, (element, event) => {
      if (event.target === modal) {
        this._hideModal();
      }
    });
  }

  /**
   * Изменяет размер шрифта в допустимом диапазоне.
   * @private
   * @param {number} delta - Шаг изменения.
   * @param {HTMLElement} activeElement - Нажатая кнопка.
   * @param {string} speechKey - Ключ голосовой подсказки.
   * @returns {void}
   */
  _changeFontSize(delta, activeElement, speechKey) {
    const size = parseFloat(getCookie('fontSize') || '') + delta;
    if (size <= 0 || size >= 40) {
      return;
    }
    this._setSetting('fontSize', size);
    this._speech.speak(this._i18n.voice(speechKey));
    this._activateSiblingLink(activeElement);
  }

  /**
   * Сохраняет настройку в cookie и атрибуте контейнера.
   * @private
   * @param {string} name - Имя настройки.
   * @param {string|number|boolean} value - Новое значение.
   * @returns {void}
   */
  _setSetting(name, value) {
    this._setAttrDataBviBody(name, value);
    setCookie(name, value);
  }

  /**
   * Обновляет визуальное и ARIA-состояние контролов.
   * @private
   * @returns {void}
   */
  _setActiveControls() {
    SelectorEngine.all('.bvi-link').forEach(link => {
      Manipulator.removeClass(link, 'active');
      this._setPressed(link, false);
    });
    getObject(DATA_CONTROLS, settingName => {
      const value = String(getCookie(settingName));
      const control = DATA_CONTROLS[settingName][value];
      if (!control) {
        return;
      }
      const element = SelectorEngine.one(control[0]);
      if (element) {
        Manipulator.addClass(element, 'active');
        this._setPressed(element, true);
      }
    });
  }

  /**
   * Устанавливает `aria-pressed` на элементе управления.
   * @private
   * @param {HTMLElement} element - Элемент управления.
   * @param {boolean} pressed - Состояние кнопки.
   * @returns {void}
   */
  _setPressed(element, pressed) {
    if (Manipulator.hasAttr(element, 'aria-pressed')) {
      Manipulator.setAttr(element, 'aria-pressed', pressed);
    }
  }

  /**
   * Активирует элемент и деактивирует соседние кнопки.
   * @private
   * @param {HTMLElement|null} element - Активируемая кнопка.
   * @returns {void}
   */
  _activateSiblingLink(element) {
    if (!element || !element.parentElement) {
      return;
    }
    getArray(SelectorEngine.children(element.parentElement, '.bvi-link'), sibling => {
      Manipulator.removeClass(sibling, 'active');
      this._setPressed(sibling, false);
    });
    Manipulator.addClass(element, 'active');
    this._setPressed(element, true);
  }

  /**
   * Добавляет панель и кнопку её показа в DOM.
   * @private
   * @returns {void}
   */
  _renderPanel() {
    const bviBody = SelectorEngine.one('.bvi-body');
    if (!bviBody || SelectorEngine.one('.bvi-panel')) {
      return;
    }
    const panelHidden = stringToBoolean(getCookie('panelHide'));
    insert(bviBody, 'beforebegin', getPanelTemplate(this._i18n, panelHidden, this._config.copyright));
    insert(bviBody, 'afterbegin', getPanelShowLinkTemplate(this._i18n, panelHidden));
    this._handlePanelScroll();
  }

  /**
   * Закрепляет панель при прокрутке.
   * @private
   * @returns {void}
   */
  _handlePanelScroll() {
    const panel = SelectorEngine.one('.bvi-panel');
    if (!panel || !stringToBoolean(getCookie('panelFixed'))) {
      return;
    }
    const scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    const fixed = scrollTop > 200;
    if (fixed !== Manipulator.hasClass(panel, 'bvi-fixed-top')) {
      if (fixed) {
        insert(panel, 'beforebegin', '<div class="bvi-panel-placeholder" aria-hidden="true"></div>');
      } else {
        this._removePanelPlaceholder();
      }
      Manipulator.toggleClass(panel, 'bvi-fixed-top', fixed);
    }
    this._syncPanelPlaceholder(panel);
  }

  /**
   * Синхронизирует высоту заполнителя закреплённой панели и отступ прокрутки страницы (`--bvi-panel-offset`),
   * чтобы элемент в фокусе и якорь не оказывались под закреплённой панелью.
   * @private
   * @param {HTMLElement} panel - Панель для измерения.
   * @returns {void}
   */
  _syncPanelPlaceholder(panel) {
    const fixed = Manipulator.hasClass(panel, 'bvi-fixed-top') && panel.offsetHeight > 0;
    Manipulator.setStyle(document.documentElement, '--bvi-panel-offset', fixed ? `${panel.offsetHeight}px` : '');
    const placeholder = SelectorEngine.one('.bvi-panel-placeholder');
    if (!placeholder) {
      return;
    }
    const margin = parseFloat(getComputedStyle(panel).marginBottom) || 0;
    Manipulator.setStyle(placeholder, 'height', panel.offsetHeight ? `${panel.offsetHeight + margin}px` : '0');
  }

  /**
   * Удаляет заполнитель места панели.
   * @private
   * @returns {void}
   */
  _removePanelPlaceholder() {
    const placeholder = SelectorEngine.one('.bvi-panel-placeholder');
    if (placeholder) {
      removeElement(placeholder);
    }
  }

  /**
   * Создаёт контейнер режима и применяет сохранённые настройки.
   * @private
   * @returns {void}
   */
  _set() {
    if (!SelectorEngine.one('.bvi-body')) {
      Manipulator.addClass(document.documentElement, 'bvi-active');
      Manipulator.addClass(document.body, 'bvi-active');
      wrapInner(document.body, 'div', 'bvi-body');
    }
    getObject(this._config, key => this._setAttrDataBviBody(key, getCookie(key)));
    getArray(this._elements, element => {
      Manipulator.setStyle(element, 'display', 'none');
    });
    this._clearImageClasses();
  }

  /**
   * Полностью убирает плагин со страницы и снимает обработчики; сохранённые настройки не трогает.
   * Нужен при размонтировании компонента (React, Vue и т. п.). Публичный API: внутри пакета не вызывается.
   * @public
   * @noinspection JSUnusedGlobalSymbols
   * @returns {void}
   */
  destroy() {
    this._listeners.clear();
    this._teardown();
    this._speech.destroy();
  }

  /**
   * Возвращает DOM к состоянию до включения режима.
   * @private
   * @returns {void}
   */
  _teardown() {
    const bviPanel = SelectorEngine.one('.bvi-panel');
    const bviBody = SelectorEngine.one('.bvi-body');
    const bviLinkFixedTop = SelectorEngine.one('.bvi-link-fixed-top');
    this._removePanelPlaceholder();
    Manipulator.setStyle(document.documentElement, '--bvi-panel-offset', '');
    this._speech.stopStatusTimer();
    this._panelListeners.clear();
    this._stopModalKeydown();
    if (bviPanel) {
      removeElement(bviPanel);
    }
    this._clearImageClasses();
    if (bviBody) {
      unwrap(bviBody);
    }
    if (bviLinkFixedTop) {
      removeElement(bviLinkFixedTop);
    }
    Manipulator.removeClass(document.documentElement, 'bvi-active');
    Manipulator.removeClass(document.body, 'bvi-active', 'bvi-noscroll');
    Manipulator.setStyle(document.body, 'overflow', '');
    getArray(this._elements, element => {
      Manipulator.setStyle(element, 'display', '');
    });
    this._speech.destroyControls();
  }

  /**
   * Отключает режим и очищает его cookie.
   * @private
   * @returns {void}
   */
  _remove() {
    this._teardown();
    this._speech.speak(this._i18n.voice('panelOff'));
    if (stringToBoolean(getCookie('reload'))) {
      document.location.reload();
    }
    getObject(this._config, key => removeCookie(key));
    removeCookie('panelActive');
  }

  /**
   * Маркирует изображения для применения специальных стилей.
   * @private
   * @returns {void}
   */
  _images() {
    SelectorEngine.all('img').forEach(element => {
      if (!Manipulator.hasClass(element, 'bvi-no-style')) {
        Manipulator.addClass(element, 'bvi-img');
      }
    });
    this._renderImageCaptions();
    SelectorEngine.all('.bvi-body *').forEach(element => {
      const style = getComputedStyle(element);
      const hasBackgroundImage = style.backgroundImage !== 'none' && style.background !== 'none';
      if (hasBackgroundImage && !Manipulator.hasClass(element, 'bvi-no-style')) {
        Manipulator.addClass(element, 'bvi-background-image');
      }
    });
  }

  /**
   * Добавляет подписи к содержательным изображениям. Декоративные (`alt=""`) остаются без подписи.
   * @private
   * @returns {void}
   */
  _renderImageCaptions() {
    SelectorEngine.all('.bvi-body img.bvi-img').forEach(image => {
      const alt = Manipulator.getAttr(image, 'alt');
      if (alt !== null && !alt.trim()) {
        return;
      }
      const caption = createElement('span', 'bvi-img-caption');
      Manipulator.setData(caption, 'caption', alt === null ? this._i18n.text('imageWithoutDescription') : `${this._i18n.text('imageCaption')}: ${alt.trim()}`);
      insert(image, 'afterend', caption);
    });
  }

  /**
   * Удаляет добавленные классы и подписи изображений.
   * @private
   * @returns {void}
   */
  _clearImageClasses() {
    SelectorEngine.all('.bvi-img-caption').forEach(element => {
      removeElement(element);
    });
    SelectorEngine.all('img.bvi-img').forEach(element => {
      Manipulator.removeClass(element, 'bvi-img');
    });
    SelectorEngine.all('.bvi-background-image').forEach(element => {
      Manipulator.removeClass(element, 'bvi-background-image');
    });
  }

  /**
   * Открывает окно настроек и переносит в него фокус.
   * @private
   * @returns {void}
   */
  _showModal() {
    const modal = SelectorEngine.one('.bvi-modal');
    Manipulator.setStyle(document.body, 'overflow', 'hidden');
    Manipulator.addClass(document.body, 'bvi-noscroll');
    if (modal) {
      if (!Manipulator.hasClass(modal, 'show')) {
        this._modalOpener = /** @type {HTMLElement|null} */document.activeElement;
      }
      Manipulator.addClass(modal, 'show');
      if (!this._offModalKeydown) {
        this._offModalKeydown = EventHandler.on(document, 'keydown', this._onModalKeydown);
      }
      const close = SelectorEngine.one('.bvi-modal-close', modal);
      if (close) {
        close.focus();
      }
    }
  }

  /**
   * Закрывает окно настроек и возвращает исходный фокус.
   * @private
   * @returns {void}
   */
  _hideModal() {
    const modal = SelectorEngine.one('.bvi-modal');
    Manipulator.removeClass(document.body, 'bvi-noscroll');
    Manipulator.setStyle(document.body, 'overflow', '');
    this._stopModalKeydown();
    if (modal) {
      Manipulator.removeClass(modal, 'show');
    }
    if (this._modalOpener && document.contains(this._modalOpener)) {
      this._modalOpener.focus();
    }
    this._modalOpener = null;
  }

  /**
   * Перемещает фокус между кнопками группы стрелками, `Home` и `End`: группа — верхняя панель,
   * окно настроек или блок озвучки. `Tab` работает как обычно.
   * @private
   * @param {KeyboardEvent} event - Событие клавиатуры.
   * @returns {void}
   */
  _handleArrowKeys(event) {
    const step = ARROW_STEPS[event.key];
    const edge = event.key === 'Home' || event.key === 'End';
    if (step === undefined && !edge || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }
    const current = /** @type {HTMLElement} */event.target;
    if (!SelectorEngine.is(current, '.bvi-link')) {
      return;
    }
    const group = SelectorEngine.ancestor(current, '.bvi-modal-content, .bvi-speech-link, .bvi-panel');
    if (!group) {
      return;
    }
    const buttons = SelectorEngine.focusable(group, '.bvi-link');
    const index = buttons.indexOf(current);
    if (index === -1) {
      return;
    }
    let target = event.key === 'Home' ? 0 : buttons.length - 1;
    if (step !== undefined) {
      target = (index + step + buttons.length) % buttons.length;
    }
    event.preventDefault();
    buttons[target].focus();
  }

  /**
   * Снимает обработчик клавиатуры модального окна.
   * @private
   * @returns {void}
   */
  _stopModalKeydown() {
    if (this._offModalKeydown) {
      this._offModalKeydown();
      this._offModalKeydown = null;
    }
  }

  /**
   * Обрабатывает Escape и удерживает Tab-фокус в модальном окне.
   * @private
   * @param {KeyboardEvent} event - Событие клавиатуры.
   * @returns {void}
   */
  _handleModalKeydown(event) {
    const modal = SelectorEngine.one('.bvi-modal');
    if (!modal || !Manipulator.hasClass(modal, 'show')) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this._hideModal();
      return;
    }
    if (event.key !== 'Tab') {
      return;
    }
    const focusable = SelectorEngine.focusable(modal);
    if (!focusable.length) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /**
   * Скрывает панель и показывает кнопку её возврата.
   * @private
   * @returns {void}
   */
  _hidePanel() {
    const panel = SelectorEngine.one('.bvi-panel');
    const link = SelectorEngine.one('.bvi-link-fixed-top');
    if (panel) {
      Manipulator.addClass(panel, 'bvi-panel-hide');
      this._syncPanelPlaceholder(panel);
    }
    if (link) {
      Manipulator.removeClass(link, 'bvi-hide');
      Manipulator.addClass(link, 'bvi-show');
    }
    setCookie('panelHide', 'true');
    this._speech.speak(this._i18n.voice('panelHide'));
  }

  /**
   * Показывает панель и скрывает кнопку её возврата.
   * @private
   * @returns {void}
   */
  _showPanel() {
    const panel = SelectorEngine.one('.bvi-panel');
    const link = SelectorEngine.one('.bvi-link-fixed-top');
    if (link) {
      Manipulator.removeClass(link, 'bvi-show');
      Manipulator.addClass(link, 'bvi-hide');
    }
    if (panel) {
      Manipulator.removeClass(panel, 'bvi-panel-hide');
      this._syncPanelPlaceholder(panel);
    }
    setCookie('panelHide', 'false');
    this._speech.speak(this._i18n.voice('panelShow'));
  }

  /**
   * Сохраняет исходные значения конфигурации.
   * @private
   * @returns {void}
   */
  _saveDefaultSettings() {
    const config = /** @type {Record<string, string|number|boolean>} */this._config;
    getObject(config, key => setCookie(key, config[key]));
  }

  /**
   * Отключает автозапуск при неполном наборе настроек.
   * @private
   * @returns {void}
   */
  _disablePanelIfSettingsAreMissing() {
    getObject(this._config, key => {
      if (typeof getCookie(key) === 'undefined') {
        removeCookie('panelActive');
      }
    });
  }

  /**
   * Объединяет и проверяет настройки плагина.
   * @private
   * @param {BviOptions} [config={}] - Пользовательские параметры.
   * @returns {Required<BviOptions>} Проверенная конфигурация: все параметры заполнены значениями по умолчанию.
   */
  _getConfig(config) {
    /** @type {Record<string, any>} */
    const options = {
      ...Default,
      ...config
    };
    /** @type {Record<string, any>} */
    const extended = {};
    for (const keyDefault in Default) {
      extended[keyDefault] = options[keyDefault];
    }
    checkConfig(extended, DefaultType, DefaultOptions);
    return /** @type {Required<BviOptions>} */extended;
  }

  /**
   * Устанавливает атрибут `data-bvi-*` на контейнере режима.
   * @private
   * @param {string} [name=''] - Имя настройки.
   * @param {string|number|boolean} [value=''] - Значение настройки.
   * @returns {void}
   */
  _setAttrDataBviBody(name = '', value = '') {
    const bviBody = SelectorEngine.one('.bvi-body');
    if (bviBody) {
      Manipulator.setData(bviBody, name, value);
    }
  }

  /**
   * Регистрирует обработчик клика на элементе панели.
   * @private
   * @param {string|Element|null} selectorOrElement - CSS-селектор или элемент.
   * @param {(element: HTMLElement, event: Event) => void} callback - Обработчик клика; получает элемент, на котором он зарегистрирован, и событие.
   * @returns {void}
   */
  _onClick(selectorOrElement, callback) {
    const element = getElement(selectorOrElement);
    if (!element) {
      return;
    }
    this._panelListeners.on(element, 'click', event => {
      event.preventDefault();
      callback(/** @type {HTMLElement} */element, event);
    });
  }
}

/**
 * ESM-точка входа библиотеки: экспорты предназначены пользователям пакета (`import Bvi from 'bvi'`),
 * внутри проекта их никто не импортирует.
 * @module bvi/esm
 * @noinspection JSUnusedGlobalSymbols
 */

export { Bvi, Speech, Bvi as default };
//# sourceMappingURL=bvi.esm.js.map

// Most of the colors are taken from pages of the Lindisfarne Gospels as
// seen in the British Library site,
//
//   https://www.bl.uk/collection-items/lindisfarne-gospels

// The colors were extracted manually and using Adobe's color tool,
// https://color.adobe.com.

// From Lindisfarne-gospels-Cotton_MS_Nero_D_IV_f005v.jpg
// const colors1 = ["#d9d1b8", "#d9b36c", "#a69576", "#a64e2e", "#402019"]

// const colors = {
//   text: "#554843",
//   background: "#eae5cb",
//   red: "#85292c",
//   yellow: "#cbaf70",
//   green: "#8ba387",
//   orange: "#ae5630",
// }

// From // From Lindisfarne-gospels-Cotton_MS_Nero_D_IV_f003r.jpg
// const colorsF003 = { blue: "#355176", violet: "#621031" }

// From Lindisfarne-gospels-Cotton_MS_Nero_D_IV_f027.jpg (Matthew)
const colorsF027 = {
  text: ['#260401', '#400601'],
  background: '#bfb39b',
  tan: ['#593A28', '#73553c', '#8c775d', '#a69076', '#a6927b'],
  rust: ['#732b1a', '#732e1f', '#732B1A'],
  red: ['#8c3030', '#A64141', '#a65149'],
  yellow: '#bf8f54',
  green: '#848c68',
}

/* Color Theme Swatches in Hex */
const markMuted = ['#6F91A6', '#F2EFDC', '#D9C196', '#BF702A', '#A6372D']
const markDeep = ['#F2EFDC', '#D9C196', '#D9AB82', '#400D01', '#8C1B1B']
const markDark = ['#5E7F8C', '#BFA678', '#401201', '#260401', '#8C1B1B']
const chiRhoDark = ['#2D5940', '#F2E4C9', '#8C694A', '#400D01', '#260801']

export default {
  text: colorsF027.text[0],
  background: markMuted[1],
  primary: markMuted[0],
  secondary: markDark[4],
  // This is Analogous to 'darken' using Adobe Color
  muted: '#F0DA99',
  // gray: "#dfe3e8",
  accent: markMuted[3],
  darken: markMuted[2],
  prism: {
    background: '#e5d8b9',
    accent: markMuted[3], // "#e05915",
    highlight: '#f1e4ba',
  },

  modes: {
    dark: {
      text: chiRhoDark[1],
      background: chiRhoDark[4],
      primary: chiRhoDark[3],
      secondary: markMuted[2],
      muted: '#A3824E',
      accent: colorsF027.yellow,
      darken: chiRhoDark[2],
    },
  },

  // These are only here, for now, so I can see them on the style-guide page,
  // http://localhost:8000/style-guide.
  mark: {
    muted: markMuted,
    deep: markDeep,
    dark: markDark,
  },
  chiRho: chiRhoDark,
  f027: colorsF027,
}

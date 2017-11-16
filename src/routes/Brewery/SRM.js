import numeral from 'numeral'

const SRMcolor = {
  '1': '#ffe59c',
  '2': '#ffd978',
  '3': '#ffca5a',
  '4': '#ffbf43',
  '5': '#fcb124',
  '6': '#f8a700',
  '7': '#eea000',
  '8': '#e49200',
  '9': '#e18a00',
  '10': '#d87f00',
  '11': '#d37501',
  '12': '#ca6e00',
  '13': '#c56501',
  '14': '#bf5d02',
  '15': '#b45400',
  '16': '#b45400',
  '17': '#ab4902',
  '18': '#a04100',
  '19': '#963500',
  '20': '#963500',
  '21': '#923001',
  '22': '#8b2e02',
  '23': '#832500',
  '24': '#7f2002',
  '25': '#771c00',
  '26': '#771c00',
  '27': '#6d1602',
  '28': '#670f01',
  '29': '#621100',
  '30': '#5c0c03',
  '31': '#560c03',
  '32': '#5c0c03',
  '33': '#500d07',
  '34': '#490806',
  '35': '#440706',
  '36': '#400807',
  '37': '#3c0b07',
  '38': '#39080b',
  '39': '#39080b',
  '40': '#330a08',
  '41': '#080000'
}

var val = 0.0

const setValue = (color) => {
  if (typeof color === 'number') {
    val = color * 1.3546 - 0.76
  } else {
    val = color.indexOf('SRM') > -1 ?
      numeral(color.substring(0, color.indexOf(' '))).value() :
      numeral(color.substring(0, color.indexOf(' '))).value() * 0.508
  }
}

class SRM {
  constructor(color) {
    if (color !== undefined) {
      setValue(color)
    }
  }

  value() {
    return val
  }

  color() {
    const v = Math.round(val)
    return v > 41 ? SRMcolor['41'] : v < 1 ? SRMColor['1'] : SRMcolor[String(v)]
  }

  valueOf(color) {
    setValue(color)
    return this.value()
  }

  colorOf(color) {
    setValue(color)
    return this.color()
  }
}

// SRM = (1.3546 × °L) - 0.76
// BeerXML is Lovibond for All Grain and SRM for Extract

export default SRM

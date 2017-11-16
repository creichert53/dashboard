import createMuiTheme from 'material-ui/styles/createMuiTheme'
import grey from 'material-ui/colors/grey'
import green from 'material-ui/colors/green'

export const customTheme = createMuiTheme({
  palette: {
    "type": 'light',
    "primary": grey,
    "secondary": green,
    "common": {
      "black": "#000",
      "white": "#fff",
      "transparent": "rgba(0, 0, 0, 0)",
      "fullBlack": "rgba(0, 0, 0, 1)",
      "darkBlack": "rgba(0, 0, 0, 0.87)",
      "lightBlack": "rgba(0, 0, 0, 0.54)",
      "minBlack": "rgba(0, 0, 0, 0.26)",
      "faintBlack": "rgba(0, 0, 0, 0.12)",
      "fullWhite": "rgba(255, 255, 255, 1)",
      "darkWhite": "rgba(255, 255, 255, 0.87)",
      "lightWhite": "rgba(255, 255, 255, 0.54)"
    },
    "shades": {
      "dark": {
        "text": {
          "primary": "rgba(255, 255, 255, 1)",
          "secondary": "rgba(255, 255, 255, 0.7)",
          "disabled": "rgba(255, 255, 255, 0.5)",
          "hint": "rgba(255, 255, 255, 0.5)",
          "icon": "rgba(255, 255, 255, 0.5)",
          "divider": "rgba(255, 255, 255, 0.12)",
          "lightDivider": "rgba(255, 255, 255, 0.075)"
        },
        "input": {
          "bottomLine": "rgba(255, 255, 255, 0.7)",
          "helperText": "rgba(255, 255, 255, 0.7)",
          "labelText": "rgba(255, 255, 255, 0.7)",
          "inputText": "rgba(255, 255, 255, 1)",
          "disabled": "rgba(255, 255, 255, 0.5)"
        },
        "action": {
          "active": "rgba(255, 255, 255, 1)",
          "disabled": "rgba(255, 255, 255, 0.3)"
        },
        "background": {
          "default": "#303030",
          "paper": "#424242",
          "appBar": "#212121",
          "contentFrame": "#212121",
          "status": "#000"
        }
      },
      "light": {
        "text": {
          "primary": "rgba(0, 0, 0, 0.87)",
          "secondary": "rgba(0, 0, 0, 0.54)",
          "disabled": "rgba(0, 0, 0, 0.38)",
          "hint": "rgba(0, 0, 0, 0.38)",
          "icon": "rgba(0, 0, 0, 0.38)",
          "divider": "rgba(0, 0, 0, 0.12)",
          "lightDivider": "rgba(0, 0, 0, 0.075)"
        },
        "input": {
          "bottomLine": "rgba(0, 0, 0, 0.42)",
          "helperText": "rgba(0, 0, 0, 0.54)",
          "labelText": "rgba(0, 0, 0, 0.54)",
          "inputText": "rgba(0, 0, 0, 0.87)",
          "disabled": "rgba(0, 0, 0, 0.42)"
        },
        "action": {
          "active": "rgba(0, 0, 0, 0.54)",
          "disabled": "rgba(0, 0, 0, 0.26)"
        },
        "background": {
          "default": "#fafafa",
          "paper": "#fff",
          "appBar": "#f5f5f5",
          "contentFrame": "#eeeeee"
        }
      }
    },
    "text": {
      "primary": "rgba(0, 0, 0, 0.87)",
      "secondary": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.38)",
      "hint": "rgba(0, 0, 0, 0.38)",
      "icon": "rgba(0, 0, 0, 0.38)",
      "divider": "rgba(0, 0, 0, 0.12)",
      "lightDivider": "rgba(0, 0, 0, 0.075)"
    },
    "input": {
      "bottomLine": "rgba(0, 0, 0, 0.42)",
      "helperText": "rgba(0, 0, 0, 0.54)",
      "labelText": "rgba(0, 0, 0, 0.54)",
      "inputText": "rgba(0, 0, 0, 0.87)",
      "disabled": "rgba(0, 0, 0, 0.42)"
    },
    "action": {
      "active": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.26)"
    },
    "background": {
      "default": "#fafafa",
      "paper": "#fff",
      "appBar": "#f5f5f5",
      "contentFrame": "#eeeeee"
    },
    "error": {
      "50": "#ffebee",
      "100": "#ffcdd2",
      "200": "#ef9a9a",
      "300": "#e57373",
      "400": "#ef5350",
      "500": "#f44336",
      "600": "#e53935",
      "700": "#d32f2f",
      "800": "#c62828",
      "900": "#b71c1c",
      "A100": "#ff8a80",
      "A200": "#ff5252",
      "A400": "#ff1744",
      "A700": "#d50000",
      "contrastDefaultColor": "light"
    },
    "grey": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#d5d5d5",
      "A200": "#aaaaaa",
      "A400": "#303030",
      "A700": "#616161",
      "contrastDefaultColor": "dark"
    }
  },
})

export const muiTheme = createMuiTheme({
  ...customTheme,
  overrides: {
    MuiAppBar: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        zIndex: customTheme.zIndex.appBar,
      },
      positionFixed: {
        position: 'fixed',
        top: 0,
        left: 'auto',
        right: 0,
      },
      positionAbsolute: {
        position: 'absolute',
        top: 0,
        left: 'auto',
        right: 0,
      },
      positionStatic: {
        position: 'static',
        flexShrink: 0,
      },
      colorDefault: {
        backgroundColor: customTheme.palette.background.appBar,
        color: customTheme.palette.getContrastText(customTheme.palette.background.appBar),
      },
      colorPrimary: {
        backgroundColor: customTheme.palette.primary[900],
        color: customTheme.palette.getContrastText(customTheme.palette.primary[900]),
      },
      colorAccent: {
        backgroundColor: customTheme.palette.secondary.A400,
        color: customTheme.palette.getContrastText(customTheme.palette.secondary.A400),
      },
    },
    MuiTabIndicator: {
      colorPrimary: {
        backgroundColor: customTheme.palette.primary[900],
      },
      colorAccent: {
        backgroundColor: customTheme.palette.secondary[500],
      },
    },
    MuiInput: {
      inkbar: {
        '&:after': {
          // backgroundColor: '#fe4c4a',
          backgroundColor: customTheme.palette.secondary[customTheme.palette.type === 'light' ? 'A700' : 'A200'],
          left: 0,
          bottom: 0,
          // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
          content: '""',
          height: 2,
          position: 'absolute',
          right: 0,
          transform: 'scaleX(0)',
          transition: customTheme.transitions.create('transform', {
            duration: customTheme.transitions.duration.shorter,
            easing: customTheme.transitions.easing.easeOut
          })
        },
      }
    }
  },
})

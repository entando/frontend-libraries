import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import teal from '@material-ui/core/colors/teal';

const h1toh3 = {
  fontWeight: 100,
  marginTop: 1.25,
  marginBottom: .625,
};

const h4toh6 = {
  fontWeight: 600,
  marginTop: .3125,
};

const theme = createMuiTheme({
  typography: {
    fontFamily: '"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    h1: {
      ...h1toh3,
      fontSize: 1.875,
    },
    h2: {
      ...h1toh3,
      fontSize: 1.5,
    },
    h3: {
      ...h1toh3,
      fontSize: 1,
    },
    h4: {
      ...h4toh6,
      fontSize: .875,
    },
    h5: {
      ...h4toh6,
      fontSize: .75,
    },
    h6: {
      ...h4toh6,
      fontSize: .625,
    },
  },
  palette: {
    primary: teal,
    secondary: blueGrey,
  },
  props: {
    MuiTable: {
      stickyHeader: false,
    },
    InputLabel: {
      shrink: true,
    },
  },
  overrides: {
    MuiTable: {
      root: {
        border: '1px solid #EBEBEB',
        borderCollapse: 'separate !important',
        borderSpacing: 2,
      },
    },
    MuiTableRow: {
      root: {
        '&:nth-child(odd)': {
          backgroundColor: 'rgba(0,0,0,.05)',
        },
      },
      head: {
        backgroundColor: 'transparent !important',
      },
    },
    MuiTableCell: {
      root: {
        border: '1px solid #e7e7e7',
        borderTop: 0,
        borderLeft: 0,
        borderBottom: 0,
        padding: '.5rem',
      },
      head: {
        fontWeight: 900,
      },
      paddingNone: {
        paddingLeft: '.5rem',
      },
    },
    MuiInputBase: {
      root: {
        'label + &': {
          marginTop: 6,
        },
        borderRadius: '0 !important',
      },
      input: {
        position: 'relative',
        backgroundColor: '#fff',
        border: '1px solid #e5e6e7',
        fontSize: '.9rem',
        width: 'auto',
        padding: '6px 12px !important',
      },
      adornedStart: {
        '&:before': {
          borderWidth: '1px !important',
          borderStyle: 'solid',
          borderColor: '#e5e6e7 !important',
          top: 0,
        },
        '& .MuiSvgIcon-root': {
          marginLeft: '5px',
          marginRight: '-4px',
        },
      },
      adornedEnd: {
        '&:before': {
          borderWidth: '1px !important',
          borderStyle: 'solid',
          borderColor: '#e5e6e7 !important',
          top: 0,
        },
        '& .MuiSvgIcon-root': {
          marginLeft: '-12px',
          marginRight: '-4px',
        },
      },
    },
    MuiInputLabel: {
      root: {
        marginBottom: 8,
      },
    },
    MuiButton: {
      root: {
        padding: '.28rem .5rem .25rem',
        lineHeight: '1.5',
        fontSize: '.8rem',
      },
    },
    MuiSelect: {
      select: {
        backgroundColor: 'transparent',
        paddingRight: '24px !important',
        border: 0,
        '&:focus': {
          backgroundColor: 'transparent',
        },
        '&.MuiFilledInput-input': {
          paddingBottom: '10px !important',
          paddingTop: '20px !important',
        },
      },
    },
    MuiSwitch: {
      track: {
        height: '20.5px',
        marginTop: '-3px',
        borderRadius: '40px',
      },
    },
  },
});

export default theme;

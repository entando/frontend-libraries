import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

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
    secondary: blueGrey,
  },
  props: {
    MuiTable: {
      stickyHeader: false,
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
  },
});

export default theme;

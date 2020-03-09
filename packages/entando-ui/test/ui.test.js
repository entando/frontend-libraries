import ui from 'ui';
import blueGrey from '@material-ui/core/colors/blueGrey';

describe('ui', () => {
  it('is a object', () => {
    expect(ui).toBeInstanceOf(Object);
  });

  describe('typography', () => {
    it('contains the correct font', () => {
      expect(ui.typography).toHaveProperty('fontFamily', '"open sans", "Helvetica Neue", Helvetica, Arial, sans-serif');
    });

    it('has the correct properties for h1', () => {
      expect(ui.typography.h1).toHaveProperty('fontWeight', 100);
      expect(ui.typography.h1).toHaveProperty('marginTop', '1.25rem');
      expect(ui.typography.h1).toHaveProperty('marginBottom', '.625rem');
      expect(ui.typography.h1).toHaveProperty('fontSize', '1.875rem');
    });

    it('has the correct properties for h2', () => {
      expect(ui.typography.h2).toHaveProperty('fontWeight', 100);
      expect(ui.typography.h2).toHaveProperty('marginTop', '1.25rem');
      expect(ui.typography.h2).toHaveProperty('marginBottom', '.625rem');
      expect(ui.typography.h2).toHaveProperty('fontSize', '1.5rem');
    });

    it('has the correct properties for h3', () => {
      expect(ui.typography.h3).toHaveProperty('fontWeight', 100);
      expect(ui.typography.h3).toHaveProperty('marginTop', '1.25rem');
      expect(ui.typography.h3).toHaveProperty('marginBottom', '.625rem');
      expect(ui.typography.h3).toHaveProperty('fontSize', '1rem');
    });

    it('has the correct properties for h4', () => {
      expect(ui.typography.h4).toHaveProperty('fontWeight', 600);
      expect(ui.typography.h4).toHaveProperty('marginTop', '.3125rem');
      expect(ui.typography.h4).toHaveProperty('fontSize', '.875rem');
    });

    it('has the correct properties for h5', () => {
      expect(ui.typography.h5).toHaveProperty('fontWeight', 600);
      expect(ui.typography.h5).toHaveProperty('marginTop', '.3125rem');
      expect(ui.typography.h5).toHaveProperty('fontSize', '.75rem');
    });

    it('has the correct properties for h6', () => {
      expect(ui.typography.h6).toHaveProperty('fontWeight', 600);
      expect(ui.typography.h6).toHaveProperty('marginTop', '.3125rem');
      expect(ui.typography.h6).toHaveProperty('fontSize', '.625rem');
    });
  });

  describe('palette', () => {
    it('has the secondary color set', () => {
      expect(ui.palette).toHaveProperty('secondary.100', blueGrey[100]);
    });
  });

  describe('props', () => {
    describe('MuiTable', () => {
      it('has the correct default props', () => {
        expect(ui.props.MuiTable).toHaveProperty('stickyHeader', false);
      });
    });
  });

  describe('overrides', () => {
    describe('MuiTable', () => {
      it('has a root override', () => {
        expect(ui.overrides.MuiTable).toHaveProperty('root', {
          border: '1px solid #EBEBEB',
          borderCollapse: 'separate !important',
          borderSpacing: 2,
        });
      });
    });

    describe('MuiTableRow', () => {
      it('has a root override', () => {
        expect(ui.overrides.MuiTableRow).toHaveProperty('root', {
          '&:nth-child(odd)': {
            backgroundColor: 'rgba(0,0,0,.05)',
          },
        });
      });

      it('has a head override', () => {
        expect(ui.overrides.MuiTableRow).toHaveProperty('head', {
          backgroundColor: 'transparent !important',
        });
      });
    });

    describe('MuiTableCell', () => {
      it('has a root override', () => {
        expect(ui.overrides.MuiTableCell).toHaveProperty('root', {
          border: '1px solid #e7e7e7',
          borderTop: 0,
          borderLeft: 0,
          borderBottom: 0,
          padding: '.5rem',
        });
      });

      it('has a head override', () => {
        expect(ui.overrides.MuiTableCell).toHaveProperty('head', {
          fontWeight: 900,
        });
      });

      it('has a paddingNone override', () => {
        expect(ui.overrides.MuiTableCell).toHaveProperty('paddingNone', {
          paddingLeft: '.5rem',
        });
      });
    });
  });
});

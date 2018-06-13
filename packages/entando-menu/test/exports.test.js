import * as menu from 'index';

describe('exports all menu components', () => {
  it('is an object', () => {
    expect(typeof menu).toBe('object');
  });

  it('exports ActivityStream', () => {
    expect(menu).toHaveProperty('ActivityStream', expect.any(Function));
  });

  it('exports ActivityStreamMenu', () => {
    expect(menu).toHaveProperty('ActivityStreamMenu', expect.any(Function));
  });

  it('exports AdminAppSwitch', () => {
    expect(menu).toHaveProperty('AdminAppSwitch', expect.any(Function));
  });

  it('exports BrandMenu', () => {
    expect(menu).toHaveProperty('BrandMenu', expect.any(Function));
  });

  it('exports HelpMenu', () => {
    expect(menu).toHaveProperty('HelpMenu', expect.any(Function));
  });

  it('exports ProjectLink', () => {
    expect(menu).toHaveProperty('ProjectLink', expect.any(Function));
  });

  it('exports UserDropdown', () => {
    expect(menu).toHaveProperty('UserDropdown', expect.any(Function));
  });

  it('exports Notification', () => {
    expect(menu).toHaveProperty('Notification', expect.any(Function));
  });

  it('exports DropdownMenuItem', () => {
    expect(menu).toHaveProperty('DropdownMenuItem', expect.any(Function));
  });

  it('exports DropdownToggle', () => {
    expect(menu).toHaveProperty('DropdownToggle', expect.any(Function));
  });

  it('exports FirstLevelMenuItem', () => {
    expect(menu).toHaveProperty('FirstLevelMenuItem', expect.any(Function));
  });

  it('exports LinkMenuItem', () => {
    expect(menu).toHaveProperty('LinkMenuItem', expect.any(Function));
  });
});

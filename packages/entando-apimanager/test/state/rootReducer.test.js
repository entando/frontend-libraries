import reducer from 'state/rootReducer';

describe('test plugins in rootReducer', () => {
  it('verify if reducer object plugin is structurally correct', () => {
    const state = reducer();
    expect(state).toHaveProperty('api');
    expect(state).toHaveProperty('api.useMocks', true);
    expect(state).toHaveProperty('api.domain', null);
    expect(state).toHaveProperty('currentUser');
    expect(state).toHaveProperty('currentUser.username', null);
    expect(state).toHaveProperty('currentUser.token', null);
  });
});

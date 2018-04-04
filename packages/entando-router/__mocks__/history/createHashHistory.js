export default jest.fn()
  .mockReturnValue({
    push: jest.fn(),
    pop: jest.fn(),
    replace: jest.fn(),
    listen: jest.fn(),
    location: {
      pathname: '/mock',
    },
  });

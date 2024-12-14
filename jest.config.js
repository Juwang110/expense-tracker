// jest.config.js
module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    testEnvironment: 'jsdom', // Set test environment to jsdom for React testing
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/',  // Make sure axios is processed by Babel
    ],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/imageMock.js',  
      '\\.css$': 'identity-obj-proxy', 
    },
  };
  
/* eslint-disable @typescript-eslint/no-var-requires */
/* craco.config.js */
const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        ...pathsToModuleNameMapper({
          '@/*': [ 'src/*' ],
        }, {
          prefix: '<rootDir>/',
        }),
      },
    },
  },
};

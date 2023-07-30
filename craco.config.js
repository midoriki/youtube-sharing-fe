/* eslint-disable @typescript-eslint/no-var-requires */
/* craco.config.js */
const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        ...pathsToModuleNameMapper({
          '@/*': [ 'src/*' ],
          '@pages/*': [ 'src/pages/*' ],
          '@lib/*': [ 'src/lib/*' ],
        }, {
          prefix: '<rootDir>/',
        }),
      },
    },
  },
};

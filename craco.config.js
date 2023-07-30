/* eslint-disable @typescript-eslint/no-var-requires */
/* craco.config.js */
const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        ...pathsToModuleNameMapper({
          '@/*': [ 'src/*' ],
          '@pages/*': [ 'src/pages/*' ],
          '@layout/*': [ 'src/layout/*' ],
          '@lib/*': [ 'src/lib/*' ],
          '@components/*': [ 'src/components/*' ],
          '@interfaces/*': [ 'src/interfaces/*' ],
        }, {
          prefix: '<rootDir>/',
        }),
      },
    },
  },
};

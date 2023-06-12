module.exports = {
  // testEnvironment: 'jest-environment-node',
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // modulePaths: ['/shared/vendor/modules'],
  // moduleFileExtensions: ['js', 'jsx'],
  // moduleDirectories: ['node_modules', 'bower_components', 'shared'],
  /* transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
  }, */
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  bail: 1,
  verbose: true,
  preset: 'jest-puppeteer',
  /* moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    // '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',

    // '^react(.*)$': '<rootDir>/vendor/react-master$1',
    '^config$': '<rootDir>/configs/app-config.js',
  }, */
  // transform: {
  //   '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
  //     '<rootDir>/fileTransformer.js',
  // },
};

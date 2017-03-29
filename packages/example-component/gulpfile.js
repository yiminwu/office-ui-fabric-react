let build = require('@microsoft/web-library-build');
let gulp = require('gulp');

/* Disable the gcb-webpack build, since we don't need to produce a bundle. */
build.webpack.isEnabled = () => false;

// Configure custom lint overrides.
let rules = Object.assign(
  {},
  require('./node_modules/@microsoft/gulp-core-build-typescript/lib/defaultTslint.json').rules,
  require('../../tslint.json').rules,
  require('./tslint.json').rules
);
build.tslint.setConfig({ lintConfig: { rules } });

// Custom build steps.
build.task('tslint', build.tslint);

build.initialize(gulp);

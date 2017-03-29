'use strict';

let build = require('@microsoft/web-library-build');
let gulp = require('gulp');
let buildConfig = build.getConfig();
let distFolder = buildConfig.distFolder;
let path = require('path');
let packageFolder = buildConfig.packageFolder || '';
let isProduction = process.argv.indexOf('--production') >= 0;
let isNuke = process.argv.indexOf('nuke') >= 0;

// Use css modules and use export =
build.sass.setConfig({
  useCSSModules: true,
  moduleExportName: ''
});

// Configure custom lint overrides.
let rules = Object.assign(
  {},
  require('./node_modules/@microsoft/gulp-core-build-typescript/lib/defaultTslint.json').rules,
  require('../../tslint.json').rules,
  require('./tslint.json').rules
);
build.tslint.setConfig({
  lintConfig: { rules },
  sourceMatch: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.scss.tsx']
});
// TODO: remove this! There are a number of lint errors to fix.
build.tslint.isEnabled = () => false;

/* Configure TypeScript 2.0. */
build.typescript.setConfig({ typescript: require('typescript') });

build.text.setConfig({ textMatch: ['src/**/*.txt', 'src/**/*.Example.tsx', 'src/**/*.Props.ts'] });

build.postCopy.setConfig({
  copyTo: {
    [distFolder]: [
      'src/**/*.png',
      'node_modules/office-ui-fabric-core/dist/css/**/*'
    ]
  }
});

build.karma.isEnabled = () => false;

// process *.Example.tsx as text.
build.text.setConfig({ textMatch: ['src/**/*.txt', 'src/**/*.Example.tsx', 'src/**/*.Props.ts'] });

build.task('webpack', build.webpack);
build.task('tslint', build.tslint);
build.task('ts', build.typescript);

// initialize tasks.
build.initialize(gulp);

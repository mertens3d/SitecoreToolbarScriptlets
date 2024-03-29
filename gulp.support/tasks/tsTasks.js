﻿const gulp = require('gulp');
const gulpTypescript = require('gulp-typescript');
const sort = require('gulp-sort');
const vars = require('./../vars');
const header = require('gulp-header');
const footer = require('gulp-footer');
const del = require('del');
const rename = require('gulp-rename');

module.exports = {
  CommonSettings: {
    'removeComments': true,
    'sourceMap': false,
    'alwaysStrict': false,
    'noImplicitUseStrict': true,
    'allowSyntheticDefaultImports': true,
    'target': 'es6',
    'module': 'es6',
    'moduleResolution': 'node',
    "typeRoots": ["node_modules/@types", "node_modules/web-ext-types"]
  },

  BuildTypeScriptAll: function (cb, vars) {
    console.log('\t Src: ' + vars.SharedJs.Ts.SourceFilter());
    return gulp.src([vars.SharedJs.Ts.SourceFilter()])
      .pipe(sort())
      .pipe(gulpTypescript(this.CommonSettings))
      .pipe(gulp.dest(vars.SharedJs.Ts.TranspiledFolder));
  },

  CleanBuildStamp: function (cb, vars) {
    var buildFile = './src/shared/scripts/AutoBuild/BuildNum.ts';
    var emptyFile = './src/shared/scripts/AutoBuild/emptyFile.ts';
    return del([buildFile], cb);
    //  vars.ContentTopJs.AutoBuildRoot + '/**/*'
    //], cb);
  },

  BuildBuildNumber: function (cb, vars) {
    var contents = '//Warning. Do not edit this file. It is automatically created by gulp and will get overwritten on the next build';
    contents += '\nconst BuiltDateStamp = ' + Date.now() + ';';
    contents += '\nexport { BuiltDateStamp };';

    var dir = './src/shared/scripts/AutoBuild/';
    var buildFile = 'BuildNum.ts';
    var emptyFile = './src/shared/scripts/AutoBuild/emptyFile.ts';

    return gulp.src(emptyFile)
      .pipe(header(contents))
      .pipe(rename(buildFile))
      .pipe(gulp.dest(dir));
  }
};
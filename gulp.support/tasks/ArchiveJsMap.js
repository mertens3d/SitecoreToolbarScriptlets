const gulp = require('gulp');
const vars = require('./../vars');
const uglify = require('gulp-terser'); //require('gulp-uglify-es');
const rename = require('gulp-rename');
var sort = require('gulp-sort');
const concat = require('gulp-concat');
const replace = require('gulp-replace');

function GetFolderName(prefix) {
  //https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
  const o_date = new Intl.DateTimeFormat;
  const f_date = (m_ca, m_it) => Object({ ...m_ca, [m_it.type]: m_it.value });
  const m_date = o_date.formatToParts().reduce(f_date, {});
  let suffix = m_date.year + '-' + m_date.month + '-' + m_date.day;
  return prefix + suffix;
}

var filesToMove = [
  './src/content/**/*.*',
];

module.exports = {
  CleanContent: function (cb) {
    console.log('s) CleanContent');
    console.log('source filter: ' + vars.ContentJs.SourceDirFilter());
    return gulp.src(filesToMove)

      .pipe(gulp.dest(GetFolderName('/archive')));
  },
}
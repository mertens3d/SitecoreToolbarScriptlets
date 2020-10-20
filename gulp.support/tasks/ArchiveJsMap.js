const gulp = require('gulp');
const del = require('del');

function GetFolderName(prefix) {
  //https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
  const o_date = new Intl.DateTimeFormat;
  const f_date = (m_ca, m_it) => Object({ ...m_ca, [m_it.type]: m_it.value });
  const m_date = o_date.formatToParts().reduce(f_date, {});
  let date = new Date()
  let suffix = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
  let toReturn = prefix + suffix;
  console.log('path: ' + toReturn);
  return toReturn;
}

var filesToArchive = [
  './src/ContentTop/**/*.js',
  './src/ContentTop/**/*.map',
  './src/ContentAllFrames/**/*.js',
  './src/ContentAllFrames/**/*.map',
  './src/HindSiteScUiProxy/**/*.js',
  './src/HindSiteScUiProxy/**/*.map',
  './src/PopUpUi/**/*.js',
  './src/PopUpUi/**/*.map',
  './src/PopUpController/**/*.js',
  './src/PopUpController/**/*.map',
  './src/Shared/**/*.js',
  './src/Shared/**/*.map',
  './src/DOMJacket/**/*.js',
  './src/DOMJacket/**/*.map',
];

module.exports = {
  ArchiveJsAndMaps: function (cb) {
    console.log('s) CleanOutJsAndMaps');
    console.log('source filter: ' + JSON.stringify(filesToArchive));
    return gulp.src(filesToArchive, { base: './' })
      .pipe(gulp.dest(GetFolderName('./archives/archive-')));
  },
  DeleteJsAndMap: function (cb) {
    console.log('s) Delete Js and Map files');
    console.log('source filter: ' + JSON.stringify(filesToArchive));
    return del(filesToArchive, cb);
  },
}
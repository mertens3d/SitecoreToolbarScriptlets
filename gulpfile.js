/// <binding />
const concat = require('gulp-concat');
const del = require('del');
const footer = require('gulp-footer');
const fs = require('fs');
const gulp = require('gulp');
const header = require('gulp-header');
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');
const path = require('path');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const secrets = require('./gulp.support/Secrets.js');
const uglify = require('gulp-terser'); //require('gulp-uglify-es');
const WindowOpenerClass = require('./gulp.support/HindSiteWindowOpener.js');
var InjectableClass = require('./gulp.support/OneInjectable.js');
var sort = require('gulp-sort');
var ts = require('gulp-typescript');

var local = {
  Dest: ''
};

var mySecrete = new secrets();
console.log('===================' + mySecrete);
console.log('===================' + mySecrete.localWebRootAr);
local.Dest = mySecrete.localWebRootAr;
console.log('===================' + local.Dest);

var htmlToInject = new InjectableClass('HtmlToInject', 'html', 'html');
var jsToInject = new InjectableClass('jsToInject', 'js', 'js');
jsToInject.WorkingCodeRootDir = jsToInject.dist + '/WorkingCode';

//jsToInject.SourceDirFilter = './WorkingCode/jsToInject/**/**/*.js';

var stylesToInject = new InjectableClass('StylesToInject', 'scss', 'css');
var WindowOpener = new WindowOpenerClass();

var bookmarkFinal = 'Bookmark.js';

var myResources = function (fileName, varName) {
  console.log('s) myResources: fileName: ' + fileName + ' : ' + varName);
  var fileContent = fs.readFileSync(fileName, 'utf8');
  fileContent = fileContent.replace(/\r|\n/gi, '');
  var toReturn = 'var ' + varName + ' = \"' + fileContent + '\";'; // + '\r\n';
  console.log('-----------------------');
  //console.log(toReturn);
  console.log('e) myResources');
  return (toReturn);
};

gulp.task('cleanDist', function (cb) {
  return del([
    jsToInject.dist + '/**/*'
  ], cb);
});

gulp.task('buildStylesToInject', function () {
  stylesToInject.debugInfo();

  return gulp.src(stylesToInject.SourceDirFilter())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename(stylesToInject.MinFileName))
    .pipe(gulp.dest(stylesToInject.dist));
});

gulp.task('buildHtmlToInject', () => {
  console.log('buildHtml');

  var optionFlag = false;

  return gulp.src(htmlToInject.SourceDirFilter())
    .pipe(htmlmin({
      collapseWhitespace: optionFlag,
      quoteCharacter: '\'',
      removeComments: optionFlag,
    }))
    .pipe(rename(htmlToInject.MinFileName))
    .pipe(gulp.dest(htmlToInject.dist));
});

gulp.task('combineJs', function () {
  console.log('s) combineJs');
  console.log('source filter: ' + jsToInject.SourceDirFilter());
  return gulp.src(jsToInject.SourceDirFilter())
    .pipe(sort())
    .pipe(concat(jsToInject.NameConcat))
    .pipe(gulp.dest(jsToInject.WorkingDest))
    .pipe(replace('"', '\''))
    .pipe(gulp.dest(jsToInject.WorkingDest));
});

gulp.task('buildTypeScript', function () {
  return gulp.src('./**/jsToInject/**/*.ts')
    .pipe(sort())
    .pipe(ts({
      'removeComments': true,
      'sourceMap': false,
      'alwaysStrict': false,
      'noImplicitUseStrict': true,
      'allowSyntheticDefaultImports': true,
      'target': 'es6',
      'module': 'es6'
    }))
    .pipe(gulp.dest(jsToInject.dist));
});

gulp.task('buildJsToInject', function (done) {
  console.log('s) buildJsToInject');
  var thisDist = jsToInject.dist + '/' + jsToInject.NameConcat;
  console.log('source filter: ' + thisDist);
  console.log('dest: ' + jsToInject.dist);
  console.log('rename: ' + jsToInject.MinFileName);
  console.log('e) buildJsToInject');

  return gulp.src(thisDist)
    .pipe(uglify({
      mangle: false,
      output: {
        quote_style: 1
      }
    }))
    .pipe(rename(jsToInject.MinFileName))
    .pipe(gulp.dest(jsToInject.WorkingDest));
});

gulp.task('buildWindowOpener', function (done) {
  console.log('reading back');
  console.log('Dest: ' + WindowOpener.dist);

  var cssToInjectWithVar = myResources(stylesToInject.dist + stylesToInject.MinFileName, stylesToInject.VarName);
  var htmlToInjectWithVar = myResources(htmlToInject.dist + htmlToInject.MinFileName, htmlToInject.VarName);
  var jsToInjectWithVar = myResources(jsToInject.dist + jsToInject.MinFileName, jsToInject.VarName);

  console.log('compiling');

  WindowOpener.debugInfo();

  return gulp.src(WindowOpener.SourceDirFilter())
    .pipe(concat(WindowOpener.NameConcat))
    .pipe(gulp.dest(WindowOpener.dist))
    .pipe(uglify())
    .pipe(rename(WindowOpener.NameConcatMin))
    .pipe(header(cssToInjectWithVar + '\n')) // + codeToInjectResourceText + ))
    .pipe(header(jsToInjectWithVar + '\n'))
    .pipe(header(htmlToInjectWithVar + '\n'))
    .pipe(header('(function(){'))
    .pipe(footer('}());'))
    .pipe(rename(WindowOpener.NameConcatMinWithVar))
    // .pipe(gulp.dest(dist))
    .pipe(gulp.dest(WindowOpener.dist))
    ;
});

gulp.task('BookmarkText', function (done) {
  console.log('BookmarkText');

  var source = WindowOpener.dist + WindowOpener.NameConcatMinWithVar;
  console.log(source);
  return gulp.src(source)
    .pipe(header('javascript:'))
    .pipe(rename(bookmarkFinal))
    .pipe(gulp.dest(WindowOpener.distFinal));
});

//pulp.task('putFilesToLocalB', function () {
//});

gulp.task('putWindowOpenerToLocal', function (done) {
  console.log('s) putWindowOpenerToLocal ');
  console.log('localWebRoot: ' + local.Dest);
  console.log('dest: ' + local.Dest);
  //C:/Users/GXM073/Documents/SitecoreToolbarScriptlets/dist/CodeToInject.js')}())

  var source = WindowOpener.dist + '/' + WindowOpener.NameConcatMinWithVar;
  console.log('source: ' + source);

  for (var idx = 0; idx < local.Dest.length; idx++) {
    var oneLocalDest = local.Dest[idx];
    console.log('localDest: ' + oneLocalDest);

    gulp.src(source)
      .pipe(gulp.dest(oneLocalDest));

    var sourceHtml = path.join(htmlToInject.dist, htmlToInject.MinFileName);

    gulp.src(sourceHtml, { base: 'dist' })
      .pipe(gulp.dest(oneLocalDest));

    var sourceJs = path.join(jsToInject.dist, jsToInject.MinFileName);

    gulp.src(sourceJs, { base: 'dist' })
      .pipe(gulp.dest(oneLocalDest));

    var sourceJs = path.join(stylesToInject.dist, stylesToInject.MinFileName);
        gulp.src(sourceJs, { base: 'dist' })
      .pipe(gulp.dest(oneLocalDest));


    var sourceOpener = path.join(WindowOpener.dist, WindowOpener.NameConcat);
    gulp.src(sourceOpener, { base: 'dist' })
      .pipe(gulp.dest(oneLocalDest));



  }
  done();
});


gulp.task('default', gulp.series(['cleanDist', 'buildStylesToInject', 'buildTypeScript', 'combineJs', 'buildJsToInject', 'buildHtmlToInject', 'buildWindowOpener', 'BookmarkText', 'putWindowOpenerToLocal']), function (resolve) {
  resolve();
});
/// <binding />
const concat = require('gulp-concat');
const del = require('del');
const footer = require('gulp-footer');
const fs = require('fs');
const gulp = require('gulp');
const header = require('gulp-header');
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const secrets = require('./secrets.js');
const uglify = require('gulp-terser'); //require('gulp-uglify-es');
var sort = require('gulp-sort');

var dist = './dist/';
var distFinal = dist + 'final/';

var WorkingCodeRootDir = './WorkingCode';

var local = {
  Dest: secrets.localWebRoot,
};

class Injectable {
  constructor(shortName, sourceExt, finalExt) {
    this.ShortName = shortName;
    this.SourceExt = sourceExt;
    this.FinalExt = finalExt;
    this.SourceDirFilter = WorkingCodeRootDir + '/' + this.ShortName + '/**/*.' + this.SourceExt;
    this.VarName = shortName;
    this.FileNameWithExt = this.ShortName + '.' + this.FinalExt;
    this.MinFileName = this.ShortName + '.min.' + this.FinalExt;
    this.WorkingDest = dist;
    this.FinalDest = distFinal;
    this.NameConcat = this.ShortName + '.concat.' + this.FinalExt;
    this.NameConcatMin = this.shortName + 'concat.min.' + this.FinalExt;
  }
  debugInfo() {
    console.log('----------');
    console.log('ShortName: ' + this.ShortName);
    console.log('SourceExt: ' + this.SourceExt);
    console.log('SourceDirFilter: ' + this.SourceDirFilter);
    console.log('MinFileName: ' + this.MinFileName);
    console.log('NameConcatMin: ' + this.NameConcatMin);
  }
}
class WindowOpenerClass {
  constructor() {
    this.ShortName = 'windowOpener';
    this.SourceDirFilter = WorkingCodeRootDir + '/' + this.ShortName + '/**/*.js';
    this.NameConcat = this.ShortName + '.concat.js';
    this.NameConcatMin = this.ShortName + '.concat.min.js';
    this.NameConcatMinWithVar = this.ShortName + '.concat.min.var.js';
  }
  debugInfo() {
    console.log('----------');
    console.log('ShortName: ' + this.ShortName);
    console.log('SourceDirFilter: ' + this.SourceDirFilter);
    console.log('NameConcat: ' + this.NameConcat);
    console.log('NameConcatMin: ' + this.NameConcatMin);
  }
}

var htmlToInject = new Injectable('HtmlToInject', 'html', 'html');
var jsToInject = new Injectable('jsToInject', 'js', 'js');
var stylesToInject = new Injectable('StylesToInject', 'scss', 'css');
var WindowOpener = new WindowOpenerClass();

htmlToInject.debugInfo();
jsToInject.debugInfo();
stylesToInject.debugInfo();
WindowOpener.debugInfo();

var bookmarkFinal = 'Bookmark.js';

var myResources = function (fileName, varName) {
  console.log('s) myResources: fileName: ' + fileName + ' : ' + varName);
  var fileContent = fs.readFileSync(fileName, 'utf8');
  fileContent = fileContent.replace(/\r|\n/gi, '');
  var toReturn = 'var ' + varName + ' = \"' + fileContent + '\";'; // + '\r\n';
  console.log('-----------------------');
  console.log(toReturn);
  console.log('e) myResources');
  return (toReturn);
};

gulp.task('cleanDist', function (cb) {
  return del([
    dist + '/**/*'
  ], cb);
});

gulp.task('buildStylesToInject', function () {
  stylesToInject.debugInfo();

  return gulp.src(stylesToInject.SourceDirFilter)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename(stylesToInject.MinFileName))
    .pipe(gulp.dest(dist));
});

gulp.task('buildHtmlToInject', () => {
  console.log('buildHtml');

  return gulp.src(htmlToInject.SourceDirFilter)
    .pipe(htmlmin({
      collapseWhitespace: true,
      quoteCharacter: '\'',
      removeComments: true,
    }))
    // .pipe(gulp.dest(dest))
    .pipe(rename(htmlToInject.MinFileName))
    .pipe(gulp.dest(dist));
});

gulp.task('buildJsToInject', function (done) {
  console.log('s) buildJsToInject');
  console.log('source filter: ' + jsToInject.SourceDirFilter);
  console.log('dest: ' + dist);
  console.log('rename: ' + jsToInject.MinFileName);
  console.log('e) buildJsToInject');
  return gulp.src(jsToInject.SourceDirFilter)
    .pipe(sort())
    .pipe(concat(jsToInject.FileNameWithExt))
    .pipe(gulp.dest(jsToInject.WorkingDest))
    // .pipe(minify())
    // .pipe(uglify())
    .pipe(gulp.dest(jsToInject.WorkingDest))
    .pipe(uglify({
      mangle: false,
      output: {
        quote_style: 1
      }
    }))
    .pipe(gulp.dest(jsToInject.WorkingDest))
    // .pipe(gulp.dest(jsToInject.WorkingDest))
    .pipe(rename(jsToInject.MinFileName))
    .pipe(gulp.dest(jsToInject.WorkingDest));
  // .pipe(replace('"', '\\"'))
  // .pipe(gulp.dest(jsToInject.WorkingDest));
});

gulp.task('buildWindowOpener', function (done) {
  console.log('reading back');

  var cssToInjectWithVar = myResources(dist + stylesToInject.MinFileName, stylesToInject.VarName);
  var htmlToInjectWithVar = myResources(dist + htmlToInject.MinFileName, htmlToInject.VarName);
  var jsToInjectWithVar = myResources(dist + jsToInject.MinFileName, jsToInject.VarName);

  console.log('compiling');

  WindowOpener.debugInfo();

  return gulp.src(WindowOpener.SourceDirFilter)
    .pipe(concat(WindowOpener.NameConcat))
    .pipe(gulp.dest(dist))
    .pipe(uglify())
    .pipe(rename(WindowOpener.NameConcatMin))
    .pipe(header(cssToInjectWithVar + '\n')) // + codeToInjectResourceText + ))
    .pipe(header(jsToInjectWithVar + '\n'))
    .pipe(header(htmlToInjectWithVar + '\n'))
    .pipe(header('(function(){'))
    .pipe(footer('}());'))
    .pipe(rename(WindowOpener.NameConcatMinWithVar))
    // .pipe(gulp.dest(dist))
    .pipe(gulp.dest(dist))
    ;
});

gulp.task('BookmarkText', function (done) {
  console.log('BookmarkText');

  var source = dist + WindowOpener.NameConcatMinWithVar;
  console.log(source);
  return gulp.src(source)
    .pipe(header('javascript:'))
    .pipe(rename(bookmarkFinal))
    .pipe(gulp.dest(distFinal));
});

gulp.task('putWindowOpenerToLocal', function () {
  console.log('s) putWindowOpenerToLocal ');
  //C:/Users/GXM073/Documents/SitecoreToolbarScriptlets/dist/CodeToInject.js')}())

  var source = dist + '/' + WindowOpener.NameConcatMinWithVar;
  console.log('dest: ' + secrets.localWebRoot);
  return gulp.src(source)
    .pipe(gulp.dest(secrets.localWebRoot));
});

gulp.task('default', gulp.series(['cleanDist', 'buildStylesToInject', 'buildJsToInject', 'buildHtmlToInject', 'buildWindowOpener', 'BookmarkText', 'putWindowOpenerToLocal']), function (resolve) {
  resolve();
});
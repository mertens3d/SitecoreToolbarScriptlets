const gulp = require('gulp');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify');
const header = require('gulp-header');
const footer = require('gulp-footer');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const rename = require("gulp-rename");
const del = require('del');
const fs = require('fs');
const sass = require('gulp-sass');

var dist = './dist/';
var distFinal = dist + "final/";
var codeToInjectShortName = 'CodeToInject.js';
var codeToInjectMinName = 'CodeToInject.min.js';
var codeToInjectVarName = 'CodeToInject';
var htmlToInjectVarName = 'HtmlToInject';
var concatCode = 'concat.js';
var concatCodeMin = 'concat.min.js';
var codeToInjectDir = './CodeToInject';
var codeToInjectDest = dist + codeToInjectShortName;
var openerCodeDir = "./ChildWindow";

var openerName = "ChildCreator";
var openerNameConcat = openerName + ".concat.js";

var cssName = "Style";
var cssNameMin = cssName + ".css";
var cssVarNameMin = cssName + "Inject";

var myResources = function (fileName, varName) {
    console.log("myResources: fileName: " + fileName + " : " + varName);
    var fileContent = fs.readFileSync(fileName, "utf8");
    console.log("-----------------------");
    // console.log(fileContent);
    var toReturn = "var " + varName + " = \"" + fileContent + "\";" + "\r\n";
    console.log(toReturn);
    return (toReturn);
};

gulp.task('cleanDist', function (cb) {
    return del([
        dist + '/**/*'
    ], cb);
});

gulp.task('bookletMenu', function (done) {
    console.log("reading back");
    var htmlToInjectResourceText = myResources(dist + "menu.min.html", htmlToInjectVarName);
    var codeToInjectResourceText = myResources(dist + codeToInjectMinName, codeToInjectVarName);
    var cssToInjectResourceText = myResources(dist + cssNameMin, cssVarNameMin);

    console.log(codeToInjectResourceText);
    // // allResources = allResources.replace(/(\r\n|\n|\r)/gm, "");
    // // allResources = allResources.replace(/\s\s+/g, ' ');
    var source = openerCodeDir + '/**/*.js';

    return gulp.src(source)
        .pipe(concat(openerNameConcat))
        .pipe(gulp.dest(dist))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(header('javascript:(function(){' + cssToInjectResourceText + codeToInjectResourceText + htmlToInjectResourceText))
        .pipe(footer('}());'))
        .pipe(gulp.dest(distFinal));
});

gulp.task('buildCssToInject', function () {
    var source = codeToInjectDir + '/sass/**/*.scss';
    return gulp.src( source )
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename( cssName + ".css"))
      .pipe(gulp.dest(dist));
  });

gulp.task('buildHtmlToInject', () => {
    console.log('buildHtml');

    var source = codeToInjectDir + '/html/**/*.html';

    return gulp.src(source)
        .pipe(htmlmin({
            collapseWhitespace: true,
            quoteCharacter: "'",
            removeComments: true,
        }))
        // .pipe(gulp.dest(dest))
        .pipe(rename('menu.min.html'))
        .pipe(gulp.dest(dist));
});


gulp.task('buildJsToInject', function (done) {
    var source = codeToInjectDir + '/js/**/*.js';
    console.log("source: " + source);
    console.log("dest: " + dist);
    return gulp.src(source)
        .pipe(concat(codeToInjectShortName))
        .pipe(gulp.dest(dist))
        // .pipe(uglify())
        .pipe(gulp.dest(dist))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest(dist))
        .pipe(replace('"', '\\"'))
        .pipe(gulp.dest(dist));
});



gulp.task('default', gulp.series(['cleanDist', 'buildCssToInject', 'buildJsToInject', 'buildHtmlToInject', 'bookletMenu']), function (resolve) {
    resolve();
});
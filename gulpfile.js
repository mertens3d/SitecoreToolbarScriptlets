var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var header = require('gulp-header');
var footer = require('gulp-footer');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
var rename = require("gulp-rename");

var fs = require('fs');

// gulp.task('bookletNormal', function (done) {
//     gulp.src(['Normal.js'])
//         .pipe(concat('normal.scriptlet.js'))
//         .pipe(minify({
//             ext: {
//                 min: '.min.js'
//             }
//         }))
//         .pipe(header('javascript:(function(){'))
//         .pipe(gulp.dest('./dist/'));
//     done();
// });

// gulp.task('bookletEdit', function (done) {
//     gulp.src(['menu.js', 'edit.js'])
//         .pipe(concat('edit.scriptlet.js'))
//         .pipe(minify({
//             ext: {
//                 min: '.min.js'
//             }
//         }))
//         .pipe(header('javascript:(function(){'))
//         .pipe(footer('}());'))
//         .pipe(gulp.dest('./dist/'));
//     done();
// });

var dest = './dist/';
var codeToInjectShortName = 'CodeToInject.js';
var codeToInjectMinName = 'CodeToInject.min.js';
var codeToInjectVarName = 'CodeToInject';
var htmlToInjectVarName = 'HtmlToInject';
var concatCode = 'concat.js';
var concatCodeMin = 'concat.min.js';
var codeToInjectDir = './CodeToInject';
var codeToInjectDest = dest + codeToInjectShortName;


var myResources = function (fileName, varName) {
    console.log("myResources: fileName: " + fileName + " : " + varName);
    var fileContent = fs.readFileSync(fileName, "utf8");
    console.log("-----------------------");
    // console.log(fileContent);
    var toReturn = "var " + varName + " = \"" + fileContent + "\";" + "\r\n";
    console.log(toReturn);
    return (toReturn);
};

gulp.task('bookletMenu', function (done) {
 

    // gulp.src(dest +  concatCodeMin)
    //     .pipe(gulp.dest(dest));

    // allResources = allResources.replace(/(\")/gm, "/\" ");



    console.log("reading back");
    var htmlToInjectResourceText = myResources(dest + "menu.min.html", htmlToInjectVarName);
    var codeToInjectResourceText = myResources(dest + codeToInjectMinName, codeToInjectVarName);

    console.log(codeToInjectResourceText);
    // // allResources = allResources.replace(/(\r\n|\n|\r)/gm, "");
    // // allResources = allResources.replace(/\s\s+/g, ' ');

    return gulp.src(['Constants.js','menu.js'  ])
        .pipe(concat('menuConcat.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(header('javascript:(function(){' + codeToInjectResourceText + htmlToInjectResourceText))
        .pipe(footer('}());'))
        .pipe(gulp.dest(dest));
});


gulp.task('buildHtml', () => {
    console.log('buildHtml');

    return gulp.src('./html/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, quoteCharacter: "'" }))
    // .pipe(gulp.dest(dest))
    .pipe(rename('menu.min.html'))
    .pipe(gulp.dest(dest));
});


gulp.task('buildCodeToInject', function(done){


    var source = codeToInjectDir + '/**/*.js';
    console.log("source: " + source);
    console.log("dest: " + dest);
    return gulp.src(source)
        .pipe(concat(codeToInjectShortName))
        .pipe(gulp.dest(dest))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest(dest))
        .pipe(replace('"', '\\"'))
        .pipe(gulp.dest(dest));
});



gulp.task('default', gulp.series(['buildCodeToInject','buildHtml', 'bookletMenu']), function (resolve) {
    resolve();
});

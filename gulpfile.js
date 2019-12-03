var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var header = require('gulp-header');
var footer = require('gulp-footer');
var concat = require('gulp-concat');
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

var myResources = function (fileName, varName) {
    var fileContent = fs.readFileSync(fileName, "utf8");
    console.log("-----------------------");
    console.log(fileContent);
    return ("var " + varName + " = \"" + fileContent + "\";" + "\r\n");
};

gulp.task('bookletMenu', function (done) {
    
    var allResources = myResources("SetScMode.js", "SetScMode");
    allResources += myResources("menuCode.js", "MenuText");
    
    console.log(allResources);
    allResources = allResources.replace(/(\r\n|\n|\r)/gm,"");
    allResources = allResources.replace(/\s\s+/g,' ');
            
    gulp.src(['menu.js'])
        .pipe(concat('menu.scriptlet.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(header('javascript:(function(){' + allResources))
        .pipe(footer('}());'))
        .pipe(gulp.dest('./dist/'));
    done();
});

gulp.task('default', gulp.series([ 'bookletMenu']), function (resolve) {
    resolve();
});

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var rigger = require('gulp-rigger');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


 
gulp.task('default', function () {
    gulp.src('app/*.js')
        .pipe(rigger())
        .pipe(gulp.dest('build/'));
});
var gulp = require('gulp');
var fs = require('fs.extra');

$ = require('gulp-load-plugins')();

gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'));
});

gulp.task('assets', function(){
    gulp.src('src/index.html')
        .pipe($.usemin({
            css: [$.minifyCss(), 'concat'],
            js: [$.uglify(), 'concat']
        }))
        .pipe(gulp.dest('dist'));
    gulp.src('src/vendor/font-awesome/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
    fs.copyRecursive('data', './dist/data', function (err) {
        if (err) {
            throw err;
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['lint', 'assets']);
});

gulp.task('default', ['lint', 'assets', 'watch']);

var gulp = require('gulp');
var browserSync = require('browser-sync').create();//reloading browser after saves
var sass = require('gulp-sass');//converting sass to css and placing file in desired folder
var useref = require('gulp-useref');//merging js or css files into one file (concatination)
var uglify = require('gulp-uglify');//minifying js file
var gulpIf = require('gulp-if');//gulp only does x if file is correct type
var nano = require('gulp-cssnano');//minifying css file

gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        // What does stream do?!?
        stream: true
    }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('useref', function(){
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', nano()))
    .pipe(gulp.dest('dist'))
});
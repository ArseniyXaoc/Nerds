'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    brSync = require('browser-sync').create();

gulp.task('sass', () => {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sourcemaps.init())        // активируем gulp-sourcemaps 
        .pipe(sass({
            outputStyle: 'nested',
        })
            .on('error', sass.logError))
        .pipe(sourcemaps.write())   // создание карты css.map в текущей папке 
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(brSync.reload({ stream: true }))
});

gulp.task('brSync', () => {
    brSync.init({
        server: {
            baseDir: "dist"
        },
        notify: false
    });
});

gulp.task('html', () => {
    return gulp.src('app/**/*.html', { since: gulp.lastRun('html') })
        .pipe(gulp.dest('dist'))
        .pipe(brSync.reload({ stream: true }))
});

gulp.task('watch', gulp.parallel('brSync', () => {
    gulp.watch('app/sass/**/*.scss', gulp.parallel('sass')); // следим за изменениями SASS 
    gulp.watch('app/*.html', gulp.parallel('html'))     // следим за изменениями HTML 
}));

gulp.task('default', gulp.parallel('sass', 'html', 'watch'));
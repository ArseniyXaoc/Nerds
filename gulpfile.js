'use strict';

const gulp = require('gulp'),
      brSync = require('browser-sync').create(); // подключаем плагин browser sync 

gulp.task('brSync', () => {
    brSync.init({
        server: {           // локальный сервер 
            baseDir: "app" // корневая папка 
        },
        notify: false       // отклчение уведомлений 
    });
});

gulp.task('html', () => {   
    return gulp.src('app/**/*.html', { since: gulp.lastRun('html') })
        //.pipe(gulp.dest('dist'))                // перенос HTML в папку деплоя 
        .pipe(brSync.reload({ stream: true }))  // перезагрузка страницы 
});

gulp.task('watch', gulp.parallel('brSync', () => {
    gulp.watch('app/*.html', gulp.parallel('html')) // следим за изменениями HTML 
}));

gulp.task('default', gulp.parallel('html', 'watch')); // задача по умолчанию (gulp)
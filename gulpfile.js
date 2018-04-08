const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init({
        proxy: {
            target: 'localhost:3000',
            ws: true
        },
        serveStatic: [{
            route: '/public',
            dir: 'public'
        }],
        port: 5000,
        notify: true
    });
});

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
      script: 'app.js',
      ignore: [
        'gulpfile.js',
        'node_modules/'
      ]
    })
    .on('start', function () {
      if (!called) {
        called = true;
        cb();
      }
    })
    .on('restart', function () {
      setTimeout(function () {
        reload({ stream: false });
      }, 1000);
    });
  });

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(['/*.html', '/public/**/*.css', '/public/**/*.js']).on('change', browserSync.reload);
});
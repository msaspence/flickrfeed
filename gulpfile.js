var gulp = require('gulp'),
    del = require('del'),
    package = require('./package.json'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;


/**
 * Clean out dist
 */
gulp.task('clean', function(cb) {
  return del(['dist/**'], cb);
})

/**
 * Running browser sync server
 */
.task('server', function(cb) {
  return browserSync.init({
    server: {
      baseDir: './'
    },
    ghostMode: true,
    reloadOnRestart: true,
    open: false,
    browser: "google chrome"
  }, cb);
})

.task('serve', ['clean', 'server'], function() {
  gulp.watch([
    package.paths.html
  ], [
    'browser_reload'
  ])
})

.task('browser_reload', function() {
  browserSync.reload()
})

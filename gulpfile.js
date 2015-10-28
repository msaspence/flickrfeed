var gulp = require('gulp'),
    del = require('del'),
    reactify = require("reactify"),
    browserify = require('browserify'),
    less = require('gulp-less'),
    source = require('vinyl-source-stream'),
    path = require('path'),
    package = require('./package.json'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;


/**
 * Clean out dist
 */
gulp.task('clean', function(cb) {
  return del([package.dest.dist+'/**', package.dest.dist], cb);
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
/**
 * Less compilation
 */
.task('less', function() {
  return gulp.src(package.paths.less)
    .pipe(less({
      paths: [path.join(__dirname, package.paths.bootstrap)]
    }))
    .pipe(gulp.dest(package.dest.css))
    .pipe(browserSync.stream());
})
/**
 * JavaScript compilation
 */
.task('js', function() {
  return browserify(package.paths.app, { debug: true})
  .transform(reactify)
  .bundle()
  .pipe(source(package.dest.app))
  .pipe(gulp.dest(package.dest.dist));
})
  gulp.watch([
    package.paths.js,
    package.paths.jsx,
    package.paths.html,
  ], [
    'js',
    'browser_reload'
  ])

  gulp.watch([package.paths.less], ['less'])
})

.task('browser_reload', function() {
  browserSync.reload()
})

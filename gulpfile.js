var argv = require('yargs').argv,
    gulp = require('gulp'),
    del = require('del'),
    reactify = require("reactify"),
    browserify = require('browserify'),
    browserSync = require('browser-sync').create(),
    less = require('gulp-less'),
    package = require('./package.json'),
    path = require('path'),
    source = require('vinyl-source-stream');

require('./test/compiler');

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
    package.paths.html
  ], [
    'js',
    'browser_reload'
  ])

  gulp.watch([package.paths.less], ['less'])
})

.task('browser_reload', function() {
  browserSync.reload()
})

.task('test', function () {
  if (tests = (argv.tests || argv.t)) {
    paths = tests
    if (!paths.match(/\.js$/)) {
      paths = paths+'/**/*-test.js'
    }
  } else {
    paths = package.paths.tests;
  }
  return gulp.src(paths, { read: false })
    .pipe(mocha({
      reporter: 'nyan',
      // require: [path.join(__dirname, 'test' , 'helper.js')]
    }));
});

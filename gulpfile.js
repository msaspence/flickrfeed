var argv = require('yargs').argv,
    browserify = require('browserify'),
    browserSync = require('browser-sync').create(),
    buffer = require('vinyl-buffer'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    del = require('del'),
    fs = require('fs'),
    gulp = require('gulp'),
    historyApiFallback = require('connect-history-api-fallback'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    mocha = require('gulp-mocha')
    package = require('./package.json'),
    path = require('path'),
    s3 = require("gulp-s3"),
    source = require('vinyl-source-stream')
    reactify = require("reactify"),
    uglify = require('gulp-uglify');

require('./test/setup');
require('./test/compiler');

/**
 * Clean out dist
 */
gulp.task('clean', function(cb) {
  return del([package.dest.dist+'/**', package.dest.dist], cb);
})

.task('deploy',['clean', 'index', 'less:min', 'js:min'], function() {
  aws = JSON.parse(fs.readFileSync('./aws.json'));
  return gulp.src('./dist/**')
    .pipe(s3(aws));
})

.task('index', function() {
  setTimeout(function() {
    return gulp.src('./index.html')
      .pipe(gulp.dest(package.dest.dist));
  },100);
})

/**
 * Running browser sync server
 */
.task('server', ['index', 'less', 'js'], function(cb) {
  return browserSync.init({
    server: {
      baseDir: './dist',
      middleware: [ historyApiFallback({
        logger: console.log.bind(console)
      }) ]
    },
    ghostMode: true,
    reloadOnRestart: true,
    open: false,
    browser: "google chrome"
  }, cb);
})
.task('server:min', ['index', 'less:min', 'js:min'], function(cb) {
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

/**
 * Less compilation
 */
.task('less', function() {
  return gulp.src(package.paths.less)
    .pipe(less({
      paths: [path.join(__dirname, package.paths.bootstrap)]
    }))
    .pipe(concat(package.dest.style))
    .pipe(gulp.dest(package.dest.dist))
    .pipe(browserSync.stream());
})
.task('less:min', function() {
  return gulp.src(package.paths.less)
    .pipe(less({
      paths: [path.join(__dirname, package.paths.bootstrap)]
    }))
    .pipe(cssmin())
    .pipe(concat(package.dest.style))
    .pipe(gulp.dest(package.dest.dist))
    .pipe(browserSync.stream());
})

/**
 * JSLint/JSHint validation
 */
.task('lint', function() {
  return gulp.src([package.paths.js, package.paths.jsx])
    .pipe(jshint({
      linter: require('jshint-jsx').JSXHINT,
      lookup: false
    }))
    .pipe(jshint.reporter('default'));
})

/**
 * JavaScript compilation
 */
.task('js', function(cb) {
  return browserify(package.paths.app, { debug: true})
    .transform(reactify)
    .bundle()
    .pipe(source(package.dest.app))
    .pipe(gulp.dest(package.dest.dist));
    cb();
})
.task('js:min', function(cb) {
  return browserify(package.paths.app, { debug: true})
    .transform(reactify)
    .bundle()
    .pipe(source(package.dest.app))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(package.dest.dist));
    cb();
})

.task('serve', ['clean', 'lint', 'less', 'js', 'server'], function() {
  gulp.watch([
    package.paths.js,
    package.paths.jsx,
    package.paths.html
  ], [
    'lint',
    'browser_reload'
  ])

  gulp.watch([package.paths.less], ['less'])
})
.task('serve:min', ['clean', 'lint', 'less:min', 'js:min', 'server:min'], function() {
  gulp.watch([
    package.paths.js,
    package.paths.jsx,
    package.paths.html
  ], [
    'lint',
    'browser_reload:min'
  ])

  gulp.watch([package.paths.less], ['less:min'])
})

.task('browser_reload', ['js'], function() {
  browserSync.reload()
})

.task('browser_reload:min', ['js:min'], function() {
  browserSync.reload()
})

.task('test', function () {
  if (tests = (argv.tests || argv.t)) {
    paths = tests
    if (!paths.match(/\.jsx?$/)) {
      paths = [paths+'/**/*-test.js', paths+'/**/*-test.jsx']
    }
  } else {
    paths = package.paths.tests;
  }
  return gulp.src(paths, { read: false })
    .pipe(mocha({
      reporter: 'nyan',
    }));
});
